// pages/store/detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store: [],
    catesId: 1,
    services: [],
    mediaPrefix: app.globalData.mediaPrefix,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取详情
    this.getStore(options.id);
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

  //显示地图
  showMap(e) {
    wx.openLocation({
      latitude: parseFloat(e.currentTarget.dataset.lat),
      longitude: parseFloat(e.currentTarget.dataset.lng),
      scale: 28
    })
  },

  //导航切换
  navChange: function (e) {
    let catesId = e.detail.value;
    let cate = this.data.store.cates.find(item => item.id == e.detail.value);
    console.log(cate);
    this.setData({
      catesId,
      services: cate.services,
    })
  },

  //拨打电话
  makePhoneCall(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel
    })
  },

  //获取门店
  getStore(id) {
    app.http({
      url: app.globalData.api.stores,
      data: {
        id,
      },
      success: res => {
        console.log(res.data);
        let store = res.data;
        store.image = app.globalData.mediaPrefix + store.image;
        this.setData({
          store,
          services: store.cates[0].services
        })
      }
    });
  }
})