// pages/index/about.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navs: ['雷氏普爱', '照片墙', '精彩视频'],
    navIndex: 0,
    photos: [],
    mediaPrefix: app.globalData.mediaPrefix,
    content: '',
    videos: [],
    isLoad : false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo();
    this.getPhotos();
    this.getVideos();
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
   * 获取详情
   */
  getInfo() {
    app.http({
      url: app.globalData.api.acate,
      data: {
        sid: 51,
      },
      success: res => {
        this.setData({
          content: res.data.content,
        });
      }
    });
  },

  /**
   * 获取照片
   */
  getPhotos() {
    app.http({
      url: app.globalData.api.articles,
      data: {
        sid: 51,
      },
      success: res => {
        this.setData({
          photos: res.data,
        });
      }
    });
  },

  /**
  * 获取视频
  */
  getVideos() {
    app.http({
      url: app.globalData.api.articles,
      data: {
        sid: 57,
      },
      success: res => {
        this.setData({
          videos: res.data,
          isLoad : true
        });
      }
    });
  },


  //切换导航
  navChange(data) {
    // console.log('navIndex值为', data.detail)
    let navIndex = data.detail;
    this.setData({
      navIndex,
    });
  },

  //播放回调
  bindplay(e) {
    console.log(e);
    let id = e.target.dataset.id;
    let index = e.target.dataset.index;
    console.log(index);
    let videos = [];

    for (let i = 0; i < this.data.videos.length; i++) {
      videos[i] = wx.createVideoContext('video' + i);
    }

    videos.forEach((item, index2) => {
      if (index != index2) {
        item.pause();
      }
    });


  }
})