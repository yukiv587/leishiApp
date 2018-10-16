// pages/store/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSort: false,
    currCity: '未知',
    stores: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocation();
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


  //拨打电话
  makePhoneCall(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel,
    })
  },

  //排序切换显示
  toggleSort() {
    this.setData({
      showSort: !this.data.showSort,
    })
  },

  //排序
  sortChange(e) {
    console.log(e.detail.value);
    this.setData({
      showSort: !this.data.showSort,
    })
  },

  //跳转详情页
  readMore(e) {
    wx.navigateTo({
      url: '/pages/store/detail?id=' + e.currentTarget.dataset.id,
    })
  },

  //获取位置权限
  getLocationAuth() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation']) {
          this.getLocation();
        } else {
          this.openLocationAuth();
        }
      }
    })

  },

  //重新开启权限
  openLocationAuth() {
    wx.openSetting({
      success: res => {
        if (res.authSetting["scope.userLocation"]) {
          this.getLocation();
        }
      }
    })
  },

  //获取经纬度
  getLocation() {
    wx.showLoading({ title: '加载中...', mask: true });
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        console.log(res);
        let [longitude, latitude] = [res.longitude, res.latitude];
        this.loadCity(longitude, latitude);
        this.getStore(longitude, latitude);
      }
    })
  },

  //获取当前城市
  loadCity(longitude, latitude) {
    let mapApi = 'https://api.map.baidu.com/geocoder/v2/?ak='
    let ak = '02b9b2e5951f3aa10db04eb0329e7ad4'
    wx.request({
      url: mapApi + ak + '&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: res => {
        //console.log(res);
        let city = res.data.result.addressComponent.city;
        this.setData({ currCity: city });
      },
      fail: () => {
        this.setData({ currCity: "获取定位失败" });
      },

    })
  },

  //获取门店
  getStore(lng, lat) {
    app.http({
      url: app.globalData.api.stores,
      data: {
        lat,
        lng,
        page: 1,
        pagesize: 999,
        order: 'asc'
      },
      success: res => {
        //console.log(res.data);
        let stores = res.data;
        if (stores.length > 0) {
          stores.map((item) => {
            item.image = app.globalData.mediaPrefix + item.image;
          });
        }

        this.setData({
          stores,
        })
      }
    });
  }


})