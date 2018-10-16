// pages/index/train/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navs: ['催乳', '产后恢复', '小儿推拿'],
    navIndex: 0,
    content: '',
    trainDatail: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let navIndex = options.index ? options.index : 0;
    let navs = [];
    app.globalData.trainDatail.forEach((item, index) => {
      navs = [...navs, item.name];
    });
    this.setData({
      trainDatail: app.globalData.trainDatail,
      navs,
      navIndex,
      content: app.globalData.trainDatail[navIndex].articles[0].content || '',
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

  //切换导航
  navChange(data) {
    console.log('navIndex值为', data.detail)
    let navIndex = data.detail;
    this.setData({
      navIndex,
      content: this.data.trainDatail[navIndex].articles[0].content || '',
    });
  },

})