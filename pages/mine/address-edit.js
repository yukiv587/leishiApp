// pages/mine/address-edit.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [],
    region: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);

    //获取当前地址信息
    let [addressList, id] = [wx.getStorageSync('address'), options.id];

    if (addressList) {
      let address = addressList.find(n => n.id == id);
      console.log(address);
      this.setData({
        address,
        region: [address.province, address.city, address.district],
        id,
      })
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
   * 选择省市
   */
  bindRegionChange(e) {
    this.setData({
      region: e.detail.value
    })
  },

  /**
   * 表单验证
   */
  formChecked(e) {
    //console.log(e.detail.value);
    let formdata = e.detail.value;

    if (formdata.receiver.length > 6 || formdata.receiver.length < 2) {
      app.msgModal('收货人姓名在2-6字符之间！');
      return false;
    }
    let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/;
    if (!reg.test(formdata.mobile)) {
      app.msgModal('请输入正确格式的手机号码！');
      return false;
    }

    if (formdata.region[0] == '选择所在地区') {
      app.msgModal('请选择所在地区');
      return false;
    }

    if (formdata.address > 6 || formdata.address < 2) {
      app.msgModal('详细地址在5-50字符之间！');
      return false;
    }

    [formdata.province, formdata.city, formdata.district] = formdata.region;

    formdata.sessionid = app.globalData.sessionId;
    formdata.id = this.data.id;


    this.formSubmit(formdata);
  },

  /**
   * 提交表单
   */
  formSubmit(data) {
    app.http({
      url: app.globalData.api.address,
      method: 'POST',
      data: data,
      success: res => {
        if (res.status) {
          wx.showToast({
            title: '地址修改成功',
            icon: 'none',
            duration: 2000,
          });

          let pages = getCurrentPages();
          let prevPage = pages[pages.length - 2];  //上一个页面
          //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
          prevPage.setData({
            refresh: true,
          })

          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            });
          }, 2000)
        }
      }
    });
  },

  /**
   * 删除当前地址
   */
  deleteAddress(e) {
    let id = e.currentTarget.dataset.id;
    app.http({
      url: app.globalData.api.delete_address,
      method: 'POST',
      data: {
        sessionid: app.globalData.sessionId,
        id,
      },
      success: res => {
        if (res.status) {
          wx.showToast({
            title: '删除地址成功',
            icon: 'none',
            duration: 2000,
          });

          let pages = getCurrentPages();
          let prevPage = pages[pages.length - 2];  //上一个页面
          //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
          prevPage.setData({
            refresh: true,
          })

          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            });
          }, 2000)
        }
      }
    });
  }

})