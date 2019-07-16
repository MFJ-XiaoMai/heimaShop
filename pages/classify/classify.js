// 在page()入口函数前， 导入request模块，注意路径一定要写对
const { request } = require("../../utils/request.js")


Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    // 1.0 分类页的初始数据
    classifyData: [],
    // 2.0 右侧的二级分类
    subClassify: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getClassifyData()
    //1.0 请求分类页的数据
  },

  //1.0 请求分类页的数据
  getClassifyData() {
    // 1.1 在发送求前，先显示加载框
    // wx.showLoading({
    //   title: '加载中...',
    // })
    // // 1.2 发送请求
    // wx.request({
    //   //1.2.1 url 请求地址
    //   url: 'https://api.zbztb.cn/api/public/v1/categories',
    //   // 1.2.2 请求成功后的回调函数
    //   success: res => {
    //     console.log(res.data);
    //     const { message } = res.data;
    //     // 1.2.3 设置页面数据，更新视图
    //     this.setData({
    //       classifyData: message,
    //       subClassify: message[this.data.activeIndex].children
    //     })
    //   },
    //   //1.3 请求完成时，隐藏加载框
    //   complete: res => {
    //     wx.hideLoading();
    //   }
    // })

    // console.log(request)
    // 调用自己封装的request方法，更简单发送请求
    request({ url:"categories" })
    // 请求成功时执行的回调函数
    .then( res=>{
      // console.log(res)
      // 设置页面数据
      this.setData({
        classifyData:res,
        subClassify: res[this.data.activeIndex].children
      })
    })

  },

  //2.0 切换左侧菜单选项卡事件
  changeTab(event){
    // console.log(event)
    const { index } = event.currentTarget.dataset
    // 设置数据，更新视图
    this.setData({
      // 左侧选中状态
      activeIndex:index,
      // 右侧二级分类数据 - 可以在总数据中,通过索引值进行重新的绑定
      subClassify:this.data.classifyData[index].children
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

  }
})