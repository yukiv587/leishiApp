// pages/product/index.js
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
    catesName: '新品推荐'
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
    let catesName;
    if (catesId == 0) {
      catesName = '新品推荐';
    } else {
      catesName = this.data.cates.find(n => n.id == catesId).name;
    }
    this.setData({
      catesId,
      catesName,
    })
    this.getProducts(catesId);

  },

  //产品详情
  toDetail: function (e) {
    app.globalData.productDatail = e.currentTarget.dataset.content;
    wx.navigateTo({
      url: '/pages/index/product/detail',
    })
  },


  //获取产品分类列表
  getCates() {
    app.http({
      url: app.globalData.api.cates,
      data: {},
      success: res => {
        console.log(res.data);

        this.setData({
          cates: res.data,
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
        console.log(res.data);
        this.setData({
          products: res.data
        })
      }
    });
  },


})