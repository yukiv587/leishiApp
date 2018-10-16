// pages/index/project/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projects: [],
    mediaPrefix: app.globalData.mediaPrefix,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProjects();
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

  //获取项目列表
  getProjects: function () {
    app.http({
      url: app.globalData.api.projects,
      success: res => {
        console.log(res);
        this.setData({
          projects: res.data,
        });
      }
    });
  },

  //我要找项目详情
  toProjectDetail(e) {
    app.globalData.projectDetail = e.currentTarget.dataset.content;
    wx.navigateTo({
      url: '/pages/index/project/detail',
    })
  },
})