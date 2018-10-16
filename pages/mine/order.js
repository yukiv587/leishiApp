// pages/mine/order.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navs: ['待发货', '待收货', '已完成'],
    navIndex: 0,
    ordersList: [],
    orders: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    app.loginPromise.then(() => {
      this.getOrders();
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

  /**
   * 获取订单
   */
  getOrders(message = "加载中...") {
    app.http({
      url: app.globalData.api.orders,
      data: {
        sessionid: app.globalData.sessionId,
      },
      message,
      success: res => {
        console.log(res);
        if (res.status) {
          let orders = res.data;
          let state_0, state_1, state_2;
          state_0 = state_1 = state_2 = [];
          orders.forEach((item, index) => {
            item.total_count = 0;
            item.coupon = (item.coupon * 1).toFixed(2);

            item.products.map(n => {
              item.total_count += (n.count * 1);
            });

            if (item.state == 0) {
              state_0 = [...state_0, item];
            }
            if (item.state == 1) {
              state_1 = [...state_1, item];
            }
            if (item.state == 2) {
              state_2 = [...state_2, item];
            }
          });

          let orders_arr = [state_0, state_1, state_2];

          this.setData({
            ordersList: orders_arr[this.data.navIndex],
            orders: orders_arr,
          });
        }
      }
    });
  },


  //切换导航
  navChange(data) {
    console.log('navIndex值为', data.detail)

    this.setData({
      navIndex: data.detail,
      ordersList: this.data.orders[data.detail]
    })
  },

  //确认收货
  confirmOrder(e) {
    app.http({
      url: app.globalData.api.confirm_order,
      data: {
        sessionid: app.globalData.sessionId,
        orderid: e.currentTarget.dataset.id,
      },
      method: 'POST',
      success: res => {
        console.log(res);
        if (res.status) {
          wx.showToast({
            title: '确认成功',
            icon: 'none',
            duration: 2000,
          });

          this.getOrders('');

        }
      }
    });
  },

  //查看物流
  viewLogistics(e) {
    console.log('查看物流', e.currentTarget.dataset.express)
    let express = e.currentTarget.dataset.express;
    let postid = e.currentTarget.dataset.postid;
    wx.navigateTo({
      url: '/pages/mine/order_logistics?express=' + express + '&postid=' + postid
    })
  },


})