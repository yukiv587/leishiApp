// pages/index/news/list.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    news : [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    getApp().loginPromise.then(() => {
      this.getList();
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },


  //获取列表
  getList() {
    app.http({
      url: app.globalData.api.articles,
      data: {
        sid: 52
      },
      success: res => {
        console.log(res);
        res.data.map((item)=>{
          let now = new Date(item.t * 1000);
          item.time = now.getFullYear() + '-' + (parseInt(now.getMonth()) + 1 )+ '-' + now.getDate();
        });
        this.setData({
          news: res.data
        })
      }
    });
  },


  //详情
  toDetail(e){
    app.globalData.projectDetail = e.currentTarget.dataset.content;
    wx.navigateTo({
      url: '/pages/index/project/detail',
    })
  }
})