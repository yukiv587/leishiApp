// pages/index/cases/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cases : [],
    mediaPrefix: getApp().globalData.mediaPrefix
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().loginPromise.then(() => {
      this.getList();
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

  //获取列表
  getList() {
    getApp().http({
      url: getApp().globalData.api.articles,
      data: {
        sid: 58,
      },
      success: res => {
        this.setData({
          cases: res.data,
        });
      }
    });
  },

  //技能培训详情
  toTrain(e) {
    getApp().globalData.projectDetail = e.currentTarget.dataset.detail;
    wx.navigateTo({
      url: '/pages/index/project/detail',
    })
  },


})