// pages/index/contact.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: "/images/location-icon.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 40,
      height: 40
    }],

    companies: [
      {
        name: '江苏徐州总部',
        lat: 34.237400,
        lng: 117.190920,
        address: '徐州市凤鸣路凤鸣二巷凤凰山庄69号',
      },
      {
        name: '四川成都分公司',
        lat: 30.638835,
        lng: 104.067030,
        address: '成都市武侯区华西美庐A座2703室',
      },
      {
        name: '河南郑州分公司',
        lat: 34.756370,
        lng: 113.760660,
        address: '郑州市郑东新区榆林北路8号燕园雅集3楼',
      },
      {
        name: '吉林长春分公司',
        lat: 43.797721,
        lng: 125.307203,
        address: '长春市南湖中街与金宇大路交会(吉星花园门市)',
      },
      {
        name: '安徽合肥分公司',
        lat: 31.880027,
        lng: 117.320852,
        address: '合肥市瑶海区全椒路和站前路交口乐福公寓',
      },
    ]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
})