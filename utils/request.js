// 用promise方法来封装request请求方法
//原始的用法
// function request(params){

// }

// ES6写法
// 定义request函数，转门用于化简request
const request = params => {

  // 抽离项目的基本路径
  const baseURL = 'https://api.zbztb.cn/api/public/v1/'

  // 1.1 在发送求前，先显示加载框
  wx.showLoading({
    title: '加载中...',
    //是否显示透明蒙层，防止触摸穿透
    mask: false
  })

  // 通过promise对象，把请求成功和失败的回调函数进行封装
  return new Promise((resolve, reject) => {
    // 1.2 发送请求
    wx.request({
      // 解构所有传递过来的参数
      ...params,
      //1.2.1 url 请求地址 = 基本路径 + 传入的url
      url: baseURL + params.url,
      // 1.2.2 请求成功后的回调函数
      success: res => {
        // console.log(res.data);
        const {
          message
        } = res.data;
        // 1.2.3 设置页面数据，更新视图
        // this.setData({
        //   classifyData: message,
        //   subClassify: message[this.data.activeIndex].children
        // })

        //resolve:成功后的回调函数，把message传过去
        resolve(message)
      },
      // 请求失败执行的回调函数
      fail: err =>{
        reject(err)
      },
      //1.3 请求完成时，隐藏加载框
      complete: res => {
        wx.hideLoading();
      }
    })
  })

}

// 把封装的函数导出
module.exports={
  request
}