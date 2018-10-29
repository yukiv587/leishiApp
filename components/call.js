// components/call.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: { /* ... */ },
  methods: {
    call(){
      wx.makePhoneCall({
        phoneNumber: '4006866399'
      })
    }
  }
})