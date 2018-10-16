// pages/index/scrvice/index.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navs: ['月嫂', '催乳服务', '产后调养', '小儿推拿'],
    navIndex: 0,
    services: [],
    mediaPrefix: app.globalData.mediaPrefix,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.scid) {
      this.setData({
        navIndex: options.scid,
      });
      let scid = this.scidFormat(options.scid);
      if (scid == 0) return false;
      this.getServices(scid);
    }
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
  * 用户点击右上角分享
  */
  getServices: function (id) {
    app.http({
      url: app.globalData.api.services,
      data: {
        scid: id,
      },
      success: res => {
        console.log(res);
        if (res){
          this.setData({
            services: res.data,
          });
        }
      }
    });
  },

  //切换导航
  navChange(data) {
    console.log('navIndex值为', data.detail)
    let scid = data.detail;
    this.setData({
      navIndex: data.detail
    });

    scid = this.scidFormat(scid);

    if (scid == 0) return false;

    this.getServices(scid);
  },

  //scid 处理
  scidFormat(scid) {
    return scid * 1 + 1;
  }


})