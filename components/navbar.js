Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    // 导航栏目
    list: {
      // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      type: Array,
      // 属性初始值（可选），如果未指定则会根据类型选择一个
      value: []
    },
    // 默认选中
    navIndex: {
      type: Number,
      value: 0
    },

  },

  methods: {
    //切换导航
    _navChange(e) {
      //console.log('_navChange携带值为', e.detail.value)

      this.setData({
        navIndex: e.detail.value
      })

      this.triggerEvent("navChange", this.data.navIndex);
    }
  }
})