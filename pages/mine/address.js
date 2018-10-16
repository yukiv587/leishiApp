// pages/mine/address.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],
    refresh: false,
    selectdId : -1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options.id){
      this.setData({
        selectdId: options.id,
      })
    }

    if (options.add) {
      this.setData({
        selectAdd: options.add,
        selectdId: 0,
      })
    }

    //获取地址列表
    app.loginPromise.then(() => {
      this.getAddress();
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
    if (this.data.refresh) {
      this.getAddress();
    }

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
   * 增加地址
  */
  addAddress(e) {
    wx.navigateTo({
      url: '/pages/mine/address-add'
    })
  },

  /**
   * 编辑地址
  */
  editAddress(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/mine/address-edit?id=' + id
    })
  },

  /**
   * 获取地址列表
  */
  getAddress(message = '加载中...') {
    app.http({
      url: app.globalData.api.address,
      data: {
        sessionid: app.globalData.sessionId,
      },
      message,
      success: res => {
        console.log(res);
        //本地存储地址列表
        wx.setStorageSync('address', res.data);
        this.setData({
          addressList: res.data,
          refresh: false,
        })
      }
    });
  },

  /**
   * 设置默认地址
  */
  setDefault(e) {
    let id = e.currentTarget.dataset.id;
    app.http({
      url: app.globalData.api.address,
      method: 'POST',
      data: {
        sessionid: app.globalData.sessionId,
        id,
        isdefault: 1,
      },
      success: res => {
        if (res.status) {
          wx.showToast({
            title: '默认地址设置成功',
            icon: 'none',
            duration: 2000,
          });
          this.getAddress(false);
        }
      }
    });
  },


  /**
   * 选择地址
  */
  addressChange(e) {
    console.log('选择地址', e.detail.value);
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面

    let address = this.data.addressList.find(n => n.id ==e.detail.value);

    prevPage.setData({
      address,
    })

    wx.navigateBack({
      delta: 1
    })

  }


})