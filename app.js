//app.js

//全局常量
//const apiPrefix = 'http://182.61.56.223/debug/index.php/Api/V1/';
// const mediaPrefix = 'http://182.61.56.223/debug';
// const uploadUrl = 'http://182.61.56.223/debug/paycallback.php/index/upload';

const apiPrefix = 'https://xcx.leishipay.com/xcx/index.php/Api/V1/';
const mediaPrefix = 'https://xcx.leishipay.com/xcx/';
const uploadUrl = 'https://xcx.leishipay.com/xcx/paycallback.php/index/upload';


const api = {
  login: apiPrefix + 'login',
  save_userinfo: apiPrefix + 'save_userinfo',
  maindatas: apiPrefix + 'maindatas',
  coupon: apiPrefix + 'coupon',
  cates: apiPrefix + 'cates',
  products: apiPrefix + 'products',
  stores: apiPrefix + 'stores',
  address: apiPrefix + 'address',
  orders: apiPrefix + 'orders',
  coupons: apiPrefix + 'coupons',
  settings: apiPrefix + 'settings',
  delete_address: apiPrefix + 'delete_address',
  pay: apiPrefix + 'pay',
  confirm_order: apiPrefix + 'confirm_order',
  services: apiPrefix + 'services',
  projects: apiPrefix + 'projects',
  articles: apiPrefix + 'articles',
}

App({
  //全局变量
  globalData: {
    userInfo: null,
    userInfo_s: null,
    sessionId: null,
    isFirst: true,
    couponStatus: false,
    api,
    mediaPrefix,
    uploadUrl,
    productDatail: null,
    serviceDatail: null,
    jobDatail: null,
    trainDatail: null,
    projectDatail: null,
    projectList: null,
    detailCarts: null,
  },

  onLaunch: function () {
    try {
      let res = wx.getSystemInfoSync();
      console.log(res.SDKVersion);
      let version_res = this.compareVersion(res.SDKVersion, '1.5.0');
      if (version_res == '-1') {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，请升级到最新微信版本后重试。'
        });
        return false;
      }
    } catch (e) {

    }



    //登录
    this.login();


    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          this.getUserInfo();
        }
      }
    })
  },

  // 登录
  login() {
    return this.loginPromise = new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId

          console.log(res);
          if (res.code) {
            //发起网络请求
            this.http({
              url: api.login,
              method: 'POST',
              data: {
                code: res.code
              },
              success: res => {
                console.log('wx.login', res.data.sessionid);
                this.globalData.sessionId = res.data.sessionid;

                //判断是否初次登录
                console.log(res.data.mobile);
                this.globalData.isFirst = true;
                if (!res.data.mobile) {
                  console.log('mobile', res.data.mobile);
                  wx.redirectTo({
                    url: '/pages/login/identity'
                  });
                  if (this.isRegistered) {
                    this.isRegistered(res);
                  }
                } else {
                  this.globalData.userInfo_s = res.data;
                  wx.setStorageSync('isRegistered', true);
                }
                resolve();
              },
              fail: () => {
                console.log('fail');
              }
            });
          }
        }
      })
    });

  },


  /**
   * 获取用户信息
   */
  getUserInfo() {
    wx.showLoading({ title: '加载中', mask: true });
    wx.getUserInfo({
      success: res => {
        wx.hideLoading();

        console.log(res);
        this.globalData.userInfo = res.userInfo;

        console.log('保存用户信息');
        //保存用户信息
        //this.saveUserinfo(res.userInfo);

        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      },
      fail: res => {
        wx.hideLoading();
        wx.showModal({
          title: '警告',
          cancelText: '不授权',
          confirmText: '授权',
          content: '若不授权，则无法进入小程序；点击重新获取授权，则可以重新使用；若点击不授权，后期还使用小程序，需在微信【发现】—【小程序】—删除【小程序】，重新搜索授权登录，方可使用。',
          success: res => {
            if (res.confirm) {
              this.reAuthorize();
            }
          }
        })
      }
    })
  },

  /**
   * 重新授权
   */
  reAuthorize: function () {
    wx.openSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          console.log('authorize');
          this.getUserInfo();
        }
      }
    })
  },

  /**
   * 存储用户信息
   */
  saveUserinfo: function (data) {
    console.log('存储用户信息');

    this.http({
      url: api.save_userinfo,
      method: 'POST',
      data: {
        sessionid: this.globalData.sessionId,
        userinfo: data,
      },
      success: res => {
        console.log(res);
      }
    });

  },


  /**
   * http请求
   */
  http({ url, data, message = '加载中...', method = 'GET', success, fail }) {

    if (message) {
      wx.showLoading({ title: message, mask: true });
    }

    wx.request({
      url,
      data,
      header: {
        'Accept': '*/*',
      },
      method,
      success: function (res) {
        //console.log(res.data)
        if (message) wx.hideLoading();

        if (res.statusCode == 200) {
          success(res.data);
        } else {
          fail();
        }

      },
      fail: function (res) {
        if (message) wx.hideLoading();
        fail();
      },
      complete: function (res) {

      },
    })
  },

  /**
  * 提示弹框
  */
  msgModal(content, title = '提示') {
    wx.showModal({
      title: title,
      content: content,
      showCancel: false
    })
  },

  /**
   * 加载等待提示
   */
  showLoading(title) {
    wx.showLoading({
      title: title || '加载中',
      mask: true
    });
  },


  //版本库比较
  compareVersion(v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    var len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }

    for (var i = 0; i < len; i++) {
      var num1 = parseInt(v1[i])
      var num2 = parseInt(v2[i])

      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }

    return 0
  }

})