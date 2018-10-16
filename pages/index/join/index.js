// pages/index/join/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navs: ['综合服务', '产后恢复', '小儿推拿'],
    navIndex: 0,
    shops: [],
    navsContent: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let joinData = wx.getStorageSync('joinData') || [];
    let navIndex = options.navIndex;
    this.setData({
      navIndex,
    })

    this.formaData(joinData);

    if (navIndex == 1) {
      this.getArticles(40);
    }

    if (navIndex == 2) {
      this.getArticles(41);
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

  //切换导航
  navChange(data) {
    console.log('navIndex值为', data.detail)
    let navIndex = data.detail;
    if (navIndex == 1) {
      this.getArticles(40);
    }

    if (navIndex == 2) {
      this.getArticles(41);
    }

    this.setData({
      navIndex,
    })
  },

  //拨打电话
  makePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: '4006866399',
    })
  },

  //处理数据
  formaData(data) {
    console.log(data);
    let navsContent = [];
    data.map((item) => {
      if (item.id == '40' || item.id == '41' || item.id == '50') {
        navsContent = [...navsContent, item];
      }
    });

    navsContent.unshift(navsContent.pop());

    // console.log(navsContent);
    this.setData({
      navsContent,
    })
  },

  //获取社区
  getArticles(sid = 41) {
    app.http({
      url: app.globalData.api.articles,
      data: {
        sid,
      },
      success: res => {
        console.log(res);
        let shops = res.data;

        let shop1 = shops.find(n => n.title == '旗舰店');
        let shop2 = shops.find(n => n.title == '标准店');
        let shop3 = shops.find(n => n.title == '社区店');

        let shop_new = [shop1, shop2, shop3];
        console.log(shop_new);
        console.log(shops);

        this.setData({
          shops: shop_new,
        })
      }
    });
  },

  //跳转详情
  toDatail(e) {
    let content = e.currentTarget.dataset.content;
    app.globalData.shopDetail = content;
    console.log(content);
    wx.navigateTo({
      url: '/pages/index/join/shop',
    })
  }

})