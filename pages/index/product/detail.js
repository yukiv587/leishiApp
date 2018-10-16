// pages/product/detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    totalPrice: 0,
    productNumber: 0,
    product: {},
    carts: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let product = app.globalData.productDatail;
    console.log(product);
    this.setData({
      content: product.content,
      product,
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
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {

  },

  // 增加数量
  addCount(e) {
    console.log('增加数量');
    const id = this.data.product.id;
    let [carts, productNumber] = [this.data.carts, this.data.productNumber];

    productNumber++;

    //判断购物车是否存在该商品
    carts = this.data.product;
    carts.number = productNumber;

    this.setData({
      carts,
      productNumber,
    });

    this.getTotalPrice();
  },

  // 减少数量
  minusCount(e) {
    const id = this.data.product.id;
    let [carts, productNumber] = [this.data.carts, this.data.productNumber];

    productNumber = productNumber > 0 ? productNumber - 1 : 0;

    //判断购物车是否存在该商品

    console.log(productNumber);
    if (productNumber) {
      carts = this.data.product;
      carts.number = productNumber;
    } else {
      carts = '';
    }

    this.setData({
      carts,
      productNumber,
    });

    this.getTotalPrice();
  },


  //计算总价
  getTotalPrice() {
    let carts = this.data.carts;
    let totalPrice = 0;

    if (carts) {
      totalPrice = carts.number * (carts.price * 100);
      totalPrice = (totalPrice / 100).toFixed(2);
    }

    this.setData({
      totalPrice,
    });
  },

  //跳转支付界面
  toPay(e) {
    if (this.data.productNumber == 0 ){
      app.msgModal('请选择商品数量！');
      return false;
    }

    //购物车存储
    app.globalData.detailCarts = this.data.carts;
    wx.navigateTo({
      url: '/pages/mall/pay?detail=detail'
    })
  },

})