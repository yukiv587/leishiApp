// pages/login/register.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navs: ['我要服务', '我要加盟', '找好工作'],
    navIndex: 0,

    videos: [],
    videoSrc: '',
    showVideo: false,

    services: [
      {
        title: '月嫂',
        icon: 'service-icon1.png'
      },
      {
        title: '催乳服务',
        icon: 'service-icon2.png'
      },
      {
        title: '产后调养',
        icon: 'service-icon3.png'
      },
      {
        title: '小儿推拿',
        icon: 'service-icon4.png'
      }
    ],

    quality: [
      {
        title: '绿色健康',
        icon: 'quality-icon1.png',
        desc: '产品优质健康可靠'
      },
      {
        title: '贴心客服',
        icon: 'quality-icon2.png',
        desc: '7*24小时服务',
      },
      {
        title: '信用认证',
        icon: 'quality-icon3.png',
        desc: '实名信用更放心',
      },
      {
        title: '安全无忧',
        icon: 'quality-icon4.png',
        desc: '技师1对1贴心服务'
      }
    ],

    hot_products: [],
    hot_services: [],
    skill: [],
    project: [],
    join: [],
    job :[],

    couponContent: '',
    mediaPrefix: app.globalData.mediaPrefix,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    app.loginPromise.then(() => {
      this.getMaindatas();
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    //获得coupon组件
    this.coupon = this.selectComponent("#coupon");
    console.log(app.globalData.couponStatus);

    if (app.globalData.couponStatus) {
      console.log(app.login);
      app.loginPromise.then(() => {
        this.getCoupon();
      });
    } else {
      this.playVideo();
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // let isRegistered = wx.getStorageSync('isRegistered') || false;
    // console.log(isRegistered);
    // if (!isRegistered) {
    //   wx.redirectTo({
    //     url: '/pages/login/identity'
    //   });
    // }

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

  //导航切换
  navChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);

    this.setData({
      navIndex: e.detail.value,
      videoSrc: this.data.videos[e.detail.value],
    })


  },

  //跳转链接
  linkTo(e) {
    console.log('携带值为', e.currentTarget.dataset.link);
    let link = e.currentTarget.dataset.link;

    wx.navigateTo({
      url: '/pages/' + link
    })
  },

  //产品详情
  toProductDetail(e) {
    app.globalData.productDatail = e.currentTarget.dataset.content;
    wx.navigateTo({
      url: '/pages/index/product/detail',
    })
  },

  //项目列表
  toService(e) {
    let scid = e.currentTarget.dataset.scid;
    wx.navigateTo({
      url: '/pages/index/service/index?scid=' + scid,
    })
  },

  //招聘详情
  toJob(e) {
    app.globalData.jobDatail = e.currentTarget.dataset.content;
    wx.navigateTo({
      url: '/pages/index/job/index',
    })
  },

  //我要找项目详情
  toProjectDetail(e){
    app.globalData.projectDetail = e.currentTarget.dataset.content;
    wx.navigateTo({
      url: '/pages/index/project/detail',
    })
  },
  
  //技能培训详情
  toTrain(e) {
    app.globalData.trainDatail = e.currentTarget.dataset.datail;
    let option = '';
    if (e.currentTarget.dataset.index) {
      option = '?index=' + e.currentTarget.dataset.index;
      console.log(option);
    }
    wx.navigateTo({
      url: '/pages/index/train/index' + option,
    })
  },

  //获取优惠券
  getCoupon() {
    app.http({
      url: app.globalData.api.coupon,
      method: 'POST',
      data: {
        sessionid: app.globalData.sessionId,
      },
      success: res => {
        this.coupon.showCoupon();
        this.setData({
          couponContent: res.data.name
        })
      }
    });
  },

  //显示优惠弹框
  hideCoupon() {
    console.log('hideCoupon');
    this.coupon.hideCoupon();
    app.msgModal('领取成功！');
  },

  //获取页面信息
  getMaindatas() {
    app.http({
      url: app.globalData.api.maindatas,
      data: {},
      success: res => {
        console.log(res);

        this.setData({
          hot_products: res.data.hot_products,
          hot_services: res.data.hot_services,
          videos: [res.data.video1, res.data.video2, res.data.video3],
          videoSrc: res.data.video1,
        })

        this.formatData(res.data.cates);

      }
    });
  },

  //处理分类数据
  formatData(data) {

    let skill, project, join, joinData, job;
    skill = project = join = joinData = job = [];

    data.map((item) => {
      if (item.pid == '37') {
        skill = [...skill, item]
      }
      if (item.id == '36') {
        project = item;
      }
      if (item.pid == '38') {
        joinData = [...joinData, item];
        if (item.id == '40' || item.id == '41' || item.id == '50') {
          join = [...join, item];
        }
      }

      if (item.id == '39') {
        job = item;
        console.log(job);
      }
    });

    wx.setStorageSync('joinData', joinData);

    join.unshift(join.pop());

    this.setData({
      skill,
      project,
      join,
      job,
    })
  },

  //播放视频
  playVideo() {
    this.setData({
      //showVideo: true
    })
  }

})