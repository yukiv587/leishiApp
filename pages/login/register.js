// pages/login/register.js

var util = require('../../utils/util.js');  
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    birthday: '1988-01-01',
    babyBirthday: '2018-01-01',
    region: ['江苏省', '徐州市', '泉山区'],
    sex: ['男', '女'],
    role: ['宝妈宝爸', '我要加盟', '我想求职'],
    roleIndex: 0,
    userSexIndex: 1,
    babySexIndex: 0,
    joinstate: ['有意向', '已加盟'],
    joinstateIndex: 0,
    invest: ['5万以下', '5—10万', '10万以上'],
    investIndex: 0,
    btnLoading: false,
    nowDate: '2018-04-01'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    this.setData({
      roleIndex: options.roleIndex
    })

    let nowDate = util.formatTime(new Date());  
    this.setData({
      nowDate: nowDate
    })

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
    this.setData({
      btnLoading: false,
    });
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


  //picker变化
  pickerChange(e) {
    console.log('picker-e发送选择改变，携带值为', e.target.dataset.index);
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      [e.target.dataset.index]: e.detail.value
    })
  },

  //表单提交验证
  formCheck(e) {
    console.log('formSubmit携带值为', e.detail.value);
    console.log('roleIndex', this.data.roleIndex);
    let formdata = e.detail.value;
    formdata.role = this.data.roleIndex;
    // formdata.realname = '麻辣小龙虾';
    // formdata.mobile = '18018038483';
    if (!formdata.realname) {
      app.msgModal('姓名不能为空！');
      return false;
    }
    if (formdata.realname.length > 6 || formdata.realname.length < 2) {
      app.msgModal('姓名在2-6字符之间！');
      return false;
    }
    if (!formdata.mobile) {
      app.msgModal('联系电话不能为空！');
      return false;
    }

    let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/;
    if (!reg.test(formdata.mobile)) {
      app.msgModal('请输入正确格式的手机号码！');
      return false;
    }

    formdata.nickname = app.globalData.userInfo.nickName;
    formdata.avatarurl = app.globalData.userInfo.avatarUrl;
    formdata.province = formdata.region[0];
    formdata.city = formdata.region[1];
    formdata.district = formdata.region[2]; 

    this.formSubmit(formdata);
  },


  //提交表单
  formSubmit(data) {
    this.setData({
      btnLoading: true,
    });
    app.http({
      url: app.globalData.api.save_userinfo,
      method: 'POST',
      data: {
        sessionid: app.globalData.sessionId,
        userinfo: data,
      },
      success: res => {
        console.log(res);
        app.globalData.couponStatus = true;
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    });
  }
})