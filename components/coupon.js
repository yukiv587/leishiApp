// components/coupon.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    content: {
      type: String,
      value: '',
    },
  },
  data: {
    // 弹窗显示控制
    isShow: false,
  },
  methods: {

    //隐藏弹框
    hideCoupon() {
      this.setData({
        isShow: !this.data.isShow
      })
    },

    //展示优惠券弹框
    showCoupon() {
      this.setData({
        isShow: !this.data.isShow
      })
    },

    //关闭优惠券弹框
    _cancelEvent() {
      //触发取消回调
      this.triggerEvent("hideCoupon")
    },

  }
})