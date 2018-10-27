// pages/index/train/list.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skills: [],
    mediaPrefix : app.globalData.mediaPrefix
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().loginPromise.then(() => {
      this.getSkills();
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
  getSkills() {
    getApp().http({
      url: app.globalData.api.articles,
      data: {
        sid: 37,
      },
      success: res => {
        this.setData({
          skills: res.data,
        });
      }
    });
  },

  //技能培训详情
  toTrain(e) {
    app.globalData.trainDatail = e.currentTarget.dataset.datail;
    wx.navigateTo({
      url: '/pages/index/train/detail',
    })
  },
})