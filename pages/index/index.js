//index.js
Page({
  // 页面初始数据
  data: {
    // 1.0 首页轮播图的初始数据
    slider:[],
    // 2.0 首页入口导航的初始数据
    entry:[],
    //3.0 初始化首页楼层数据
    floor:[],
    //4.0 是否显示回到顶部的盒子
    isShowTop: false 
  },
  // 生命周期函数--监听页面加载
  onLoad: function () {
    // 1.0 页面加载的时候，请求轮播图的数据
    this.getSliderData();

    // 2.0 页面加载的时候，请求首页入口导航的数据
    this.getTentryData();

    //3.0 调用首页楼层请求
    this.getFloorData();
  },
  // 1.0 封装请求轮播图的方法
  getSliderData(){
    wx.request({
      //url请求接口的地址
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      //success 请求成功执行的回调函数
      success: res =>{
        // console.log(res)
        // 解构并赋值
        const {message} = res.data
        // 设置数据
        this.setData({
          slider:message
        })
      }
    })
  },

  // 2.0 封装请求首页入口导航的方法 
  getTentryData(){
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
      success: res =>{
        // console.log(res);
        const {message} = res.data;
        this.setData({
          entry:message
        })
      }
    })
  },

  // 3.0 封装请求首页楼层数据
  getFloorData(){
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
      success: res =>{
        // console.log(res.data);
        const {message} = res.data;
        this.setData({
          floor:message
        })
      }
    })
  },

  // 4.0 点击返回顶部的事件
  goTop(event){
    console.log("点击返回顶部的事件时间出发",event)
    // 获取后台传递过来的数据
    const { top } = event.currentTarget.dataset;
    // 调用滚动页面的效果
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },

  // 页面滚动时触发的函数
  onPageScroll(event){
    // console.log(event);
    const { scrollTop } = event;
    if (scrollTop > 400){
      this.setData({
        isShowTop: true
      })
    }else{
      this.setData({
        isShowTop: false
      })
    }
  }

})
