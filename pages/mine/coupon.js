// pages/mine/coupon.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromPay: false,
    coupons: [],
    totalPrice: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options.totalPrice) {
      this.setData({
        fromPay: true,
        totalPrice: options.totalPrice,
      });
    }

    //获取优惠券列表
    app.loginPromise.then(() => {
      this.getCoupons();
    });
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
   * 获取优惠券
   */
  getCoupons() {
    app.http({
      url: app.globalData.api.coupons,
      data: {
        sessionid: app.globalData.sessionId,
      },
      success: res => {
        console.log(res);
        let coupons = res.data;
        if (this.data.fromPay) {
          // coupons.map(n => {
          //   n.canuse = false;
          // });
          coupons = this.chargeCoupons(coupons);
        }

        this.setData({
          coupons,
        });
      }
    });
  },

  /**
   * 使用优惠券
   */
  useCoupons(e) {
    console.log('使用优惠券', e.currentTarget.dataset.id);
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    let selectedCoupon = this.data.coupons.find(n => n.id == [e.currentTarget.dataset.id]);
    prevPage.setData({
      selectedCoupon,
    })

    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 跳转商城
   */
  toMall() {
    wx.switchTab({
      url: '/pages/mall/index'
    })
  },

  /**
   * 判断优惠券是否能使用
   */
  chargeCoupons(coupons) {
    coupons.forEach((item, index, array) => {
      if (Number(this.data.totalPrice) > Number(item.limit) && this.compareTime(item.validstartdate, item.validenddate) == 1) {
        item.canuse = true;
      } else {
        item.canuse = false;
      }
    });
    return coupons;
  },

  /**
   * 判断时间大小
   */
  compareTime(startTime, endTime) {
    startTime = startTime.replace("-", "/");
    endTime = endTime.replace("-", "/");

    let now = new Date();//取今天的日期  
    let start = new Date(Date.parse(startTime));
    let end = new Date(Date.parse(endTime));
    if (now > start && now < end) {
      //未过期
      return 1;
    } else if (now < start) {
      //未生效
      return 0;
    } else {
      //已过期
      return 2;
    }

  },




})