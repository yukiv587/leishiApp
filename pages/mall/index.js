// pages/mall/index.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cates: [],
    catesId: 0,
    products: [],
    mediaPrefix: app.globalData.mediaPrefix,
    catesName: '新品推荐',

    totalPrice: 0,
    totalNumaber: 0,
    carts: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCates();
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

  //导航切换
  navChange: function (e) {
    let catesId = e.detail.value;
    this.getProducts(e.detail.value);
    let catesName = this.data.cates.find(n => n.id == catesId).name
    this.setData({
      catesId,
      catesName,
    })
  },

  //获取产品分类列表
  getCates() {
    app.http({
      url: app.globalData.api.cates,
      data: {},
      success: res => {
        //console.log(res.data);
        let cates = [{ id: "0", name: "热销产品" }, ...res.data];

        cates.map(n => {
          n.number = 0;
        });

        this.setData({
          cates: cates,
        })

        this.getProducts(0);
      }
    });
  },

  //获取产品列表
  getProducts(id) {
    app.http({
      url: app.globalData.api.products,
      data: {
        pcid: id,
      },
      message: '',
      success: res => {
        let products = res.data
        //console.log(products);
        products.map(n => {
          n.image = app.globalData.mediaPrefix + n.image;
          n.number = 0;
        });

        let carts = this.data.carts;

        //产品和购物车存在相同项，即覆盖产品该项
        if (carts.length > 0) {
          products.forEach((item, index) => {
            let same = carts.find(n => n.id == item.id);
            if (same) {
              products[index] = same;
            }
          })
        }

        this.setData({
          products: products,
        })
      }
    });
  },


  // 增加数量
  addCount(e) {
    const id = e.currentTarget.dataset.id;
    let [products, carts, cates] = [this.data.products, this.data.carts, this.data.cates];

    products.map(n => {
      if (n.id == id) n.number++;
    });

    let curr_product = products.find(n => n.id == id);

    let cartsHas = carts.find(n => n.id == id);

    //判断购物车是否存在该商品
    if (cartsHas) {
      carts.forEach((item, index) => {
        if (item.id == id) carts[index] = curr_product;
      })
    } else {
      carts = [...carts, curr_product];
    }

    //更新类别数量
    this.updateCatesNumber(cates, carts);

    this.setData({
      products,
      carts,
      cates,
    });

    this.getTotalPrice();
  },

  // 减少数量
  minusCount(e) {
    const id = e.currentTarget.dataset.id;
    let [products, carts, cates] = [this.data.products, this.data.carts, this.data.cates];

    products.map(n => {
      if (n.id == id) {
        n.number = n.number > 0 ? n.number - 1 : 0
      };
    });

    let curr_product = products.find(n => n.id == id);

    //console.log(curr_product);

    carts.forEach((item, index) => {
      if (item.id == id) {
        if (item.number > 1) {
          carts[index] = curr_product;
        } else {
          carts.splice(index, 1);
        }
      };
    })

    //更新类别数量
    this.updateCatesNumber(cates, carts);

    this.setData({
      products,
      carts,
      cates,
    });

    this.getTotalPrice();
  },

  //计算总价
  getTotalPrice() {
    let carts = this.data.carts;
    let totalPrice = 0;
    let totalNumaber = 0;
    carts.forEach((item, index) => {
      totalPrice += item.number * (item.price * 100);
      totalNumaber += item.number;
    })

    this.setData({
      totalPrice: (totalPrice / 100).toFixed(2),
      totalNumaber,
    });
  },


  //更新类别数量
  updateCatesNumber(cates, carts) {
    cates.forEach((item, index) => {
      let num = 0;
      item.number = 0;
      carts.forEach((item1, index1) => {
        if (item.id == item1.pcid) {
          num += item1.number;
          item.number = num;
        }
      })
    })
  },

  //跳转支付界面
  toPay(e) {

    //购物车本地存储
    wx.setStorageSync('carts', this.data.carts);

    wx.navigateTo({
      url: '/pages/mall/pay'
    })
  },

  //产品详情
  toDetail: function (e) {
    app.globalData.productDatail = e.currentTarget.dataset.content;
    wx.navigateTo({
      url: '/pages/index/product/detail'
    })
  },




})