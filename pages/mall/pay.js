// pages/mall/pay.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderShow: false,
    carts: [],
    totalPrice: 0,
    totalNumaber: 0,
    address: {},
    settings: {},
    selectedCoupon: '',
    postage: '0.00',
    totalAmount: '0.00',
    products: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
    //获取购物车数据
    let carts = options.detail ? [app.globalData.detailCarts] : wx.getStorageSync('carts');
    if (carts) {
      this.getTotalPrice(carts);
      this.setData({
        carts,
      });
    }

    app.loginPromise.then(() => {
      this.getAddress(); //获取地址
      this.getSetting(); //获取基本设置
    });


    console.log(carts);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow');
    if (this.data.selectedCoupon) {
      let sum = (this.data.totalPrice * 100 - this.data.selectedCoupon.amount * 100) / 100;
      let postage = this.calPostage(sum);
      this.calAmount(postage, this.data.selectedCoupon.amount);
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  /**
   * 订单显示切换
   */
  orderToggle() {
    this.setData({
      orderShow: !this.data.orderShow
    });
  },

  /**
   * 计算初始总价
   */
  getTotalPrice(carts) {
    let totalPrice = 0;
    let totalNumaber = 0;
    let products = [];
    carts.forEach((item, index) => {
      totalPrice += item.number * (item.price * 100);
      totalNumaber += item.number;
      let product = {
        productid: item.id,
        count: item.number,
        price: item.price,

      }
      products = [...products, product]
    })


    this.setData({
      totalPrice: (totalPrice / 100).toFixed(2),
      totalNumaber,
      products,
    });
  },

  /**
   * 获取地址列表
  */
  getAddress(message = '加载中...') {
    app.http({
      url: app.globalData.api.address,
      data: {
        sessionid: app.globalData.sessionId,
      },
      message,
      success: res => {
        console.log(res);
        //本地存储地址列表
        //wx.setStorageSync('address', res.data);
        let addressList = res.data;
        let address;
        if (addressList.length > 0) {
          let has_default = addressList.find(n => n.isdefault == 1);
          address = has_default ? has_default : addressList[0];
        } else {
          address = [];
        }
        console.log(address);
        this.setData({
          address,
        })
      }
    });
  },


  //选择优惠券
  selectCoupon() {
    console.log('selectCoupon');
    wx.navigateTo({
      url: '/pages/mine/coupon?totalPrice=' + this.data.totalPrice
    });
  },

  //获取基本设置
  getSetting() {
    app.http({
      url: app.globalData.api.settings,
      data: {
        sessionid: app.globalData.sessionId,
      },
      message: '',
      success: res => {
        console.log(res);
        let settings = res.data;
        console.log(this.data.totalPrice);

        this.setData({
          settings,
        })

        let postage = this.calPostage(this.data.totalPrice); //计算邮费
        this.calAmount(postage); //计算最终价格

      }
    });
  },

  //计算邮费
  calPostage(totalPrice) {
    console.log(totalPrice);
    let postage = (totalPrice * 1) > (this.data.settings.express_limit * 1) ? 0 : this.data.settings.express_fee;
    console.log(postage);
    postage = (postage * 1).toFixed(2);
    this.setData({
      postage,
    });

    return postage;
  },

  //计算最终价格
  calAmount(postage, couponAmount = 0) {
    let totalPrice = this.data.totalPrice;
    let totalAmount = (totalPrice * 100) + (postage * 100) - (couponAmount * 100);
    totalAmount = (totalAmount / 100).toFixed(2);
    console.log('postage', postage);
    console.log('totalAmount', totalAmount);
    this.setData({
      totalAmount,
    })
  },


  /**
  * 微信支付
  */
  weChatPayment(e) {
    var that = this;
    //this.data.totalAmount = 0.01;
    if (!this.data.address.id){
      app.msgModal('请添加配送地址！');
      return false;
    }
    app.showLoading();
    wx.request({
      url: app.globalData.api.pay,
      method: 'POST',
      header: {
        'Accept': '*/*'
      },
      data: {
        sessionid: app.globalData.sessionId,
        amount: this.data.totalAmount,
        addressid: this.data.address.id,
        couponid: this.data.selectedCoupon.id,
        coupon: this.data.selectedCoupon.amount,
        deliveryamount: this.data.postage,
        products: this.data.products,
      },
      success: res => {
        wx.hideLoading();
        console.log(res);

        let appId = res.data.data.appid;
        let timeStamp = (Date.parse(new Date()) / 1000).toString();
        let pkg = 'prepay_id=' + res.data.data.prepay_id;
        let nonceStr = res.data.data.nonce_str;
        let MD5 = require('../../utils/md5.js');
       
        //let key = 'GiVyldT7dxKEFF9aQaQ8QIOoAvEPU2HD';
        let key = 'jiaruleishi2017leishi1219puai126';

        //console.log(nonceStr);

        var paySign = MD5.MD5('appId=' + appId + '&nonceStr=' + nonceStr + '&package=' + pkg + '&signType=MD5&timeStamp=' + timeStamp + "&key=" + key).toUpperCase();

        wx.requestPayment({
          'timeStamp': timeStamp,
          'nonceStr': nonceStr,
          'package': pkg,
          'signType': 'MD5',
          'paySign': paySign,
          'success': (res) => {
            console.log(res);
            if (res.errMsg == 'requestPayment:ok') {
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                mask: true,
                duration: 2000
              });

              setTimeout(() => {
                wx.redirectTo({
                  url: '/pages/mine/order',
                })
              }, 2000);

            }
          },
          'fail': function (res) {
            console.log(res);
          }
        });
      }
    })
  },


  //更改地址
  changeAddress() {
    wx.navigateTo({
      url: '/pages/mine/address?id=' + this.data.address.id
    })
  },

  //添加地址
  addAddress() {
    wx.navigateTo({
      url: '/pages/mine/address?add=' + true,
    })
  },

})