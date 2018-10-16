// pages/mine/info.js
const app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['江苏省', '徐州市', '泉山区'],
    sex: ['男', '女'],
    identity: ['宝妈宝爸', '我要加盟', '我想求职'],
    userSexIndex: 1,
    babySexIndex: 0,
    identityIndex: 0,
    userInfo: null,
    nowDate: '2018-04-01',
    joinstate: ['有意向', '已加盟'],
    joinstateIndex: 0,
    invest: ['5万以下', '5—10万', '10万以上'],
    investIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo();

    let nowDate = util.formatTime(new Date());

    console.log(nowDate)
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

  //获取用户信息
  getUserInfo() {
    let userInfo = app.globalData.userInfo_s;
    console.log('userInfo', userInfo);
    userInfo.birthday = util.formatTime(new Date(userInfo.birthday.replace("-", "/")));
    if (userInfo.role == 0) {
      userInfo.babybirthday = util.formatTime(new Date(userInfo.babybirthday.replace("-", "/")));
    }
    if (userInfo.role == 1) {
      if (userInfo.invest) {
        console.log(userInfo.invest);
        console.log(this.data.invest.indexOf(userInfo.invest));
        console.log(this.data.invest);
      }
      this.data.invest.forEach((item, index)=>{
        if (userInfo.invest == userInfo.invest) {
          userInfo.investIndex = index;
        }
      });
      this.data.joinstate.forEach((item, index) => {
        if (userInfo.joinstate == userInfo.joinstate) {
          userInfo.joinstateIndex = index;
        }
      });
    }

    userInfo.region = [userInfo.province, userInfo.city, userInfo.district];
    this.setData({
      userInfo,
    });
  },


  //picker变化
  pickerChange(e) {
    // console.log('picker-e发送选择改变，携带值为', e.target.dataset.index);
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      [e.target.dataset.index]: e.detail.value
    })
  },

  roleChange(e) {
    let role = e.detail.value;
    if (role == 0) {
      this.setData({
        'userInfo.babybirthday': '2018-01-01',
        'userInfo.babygender': 0,
      })
    }
    if (role == 1) {
      this.setData({
        'userInfo.investIndex': 0,
        'userInfo.joinstateIndex': 0,
      })
    }

    this.setData({
      'userInfo.role': e.detail.value
    })
  },


  /**
  * 图片上传
  */
  uploadImg: function (e) {
    wx.chooseImage({
      count: 1,
      sizeType: 'compressed',
      success: res => {
        console.log(res);
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        app.showLoading('上传中');
        wx.uploadFile({
          url: app.globalData.uploadUrl,
          filePath: tempFilePaths[0],
          name: 'img',
          success: res => {
            wx.hideLoading();
            var data = res.data;
            data = JSON.parse(data);
            if (data.paths) {
              console.log(data.paths);
              let avatarurl = 'userInfo.avatarurl';
              this.setData({
                [avatarurl]: app.globalData.mediaPrefix + data.paths,
              });
            }

          },
          fail: function (res) {
            wx.hideLoading();
            getApp().msgModal('网络错误图片上传失败，请重试！');
          }
        })
      }
    })
  },

  //表单提交验证
  formCheck(e) {
    console.log('formSubmit携带值为', e.detail.value);
    let formdata = e.detail.value;

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

    let reg_mobile = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/;
    if (!reg_mobile.test(formdata.mobile)) {
      app.msgModal('请输入正确格式的手机号码！');
      return false;
    }

    let reg_email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (formdata.email) {
      if (!reg_email.test(formdata.email)) {
        app.msgModal('请输入正确格式的邮箱！');
        return false;
      }
    }

    if (formdata.address) {
      if (formdata.address.length > 50 || formdata.address.length < 5) {
        app.msgModal('详细地址在5-50字符之间！');
        return false;
      }
    }


    formdata.avatarurl = this.data.userInfo.avatarurl;
    [formdata.province, formdata.city, formdata.district] = formdata.region;

    console.log(formdata);

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
        wx.showToast({
          title: '资料修改成功',
          icon: 'none',
          duration: 2000,
        });

        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          });
        }, 2000)

        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];  //上一个页面
        //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
        app.globalData.userInfo_s = data;
        prevPage.setData({
          userInfo: data,
        })
      }
    });
  }
})