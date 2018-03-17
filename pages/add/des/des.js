// pages/add/des/des.js
var app = getApp()
var Session = require('../../../lib/session');
let session = Session.get();
var content="";
Page({
  data: {
    name: '111',
    isTime: 0,
    startDate: '',
    endDate: '',
    isLimit: 0,
    bgColor:'1',
    bgImg:'',
    content:'输入密圈简介',
    tempFilePaths: '',
    uploudImageShow: false,
    focus: false
  },
  onLoad: function (option) {
    this.setData({
      name: option.name,
      isTime: option.isTime,
      startDate: option.startDate,
      endDate: option.endDate,
      isLimit: option.isLimit
    })   
  },  
  themeChange: function (e) {
    var index = e.currentTarget.id;
    this.setData({
      bgColor: index
    })
  },
  addImage:function(){
    this.setData({
      uploudImageShow: true
    })
  },
  navigateBack: function () {
    this.setData({
      uploudImageShow: false
    })
  }, 
  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 9, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          tempFilePaths: res.tempFilePaths
        })
        wx.uploadFile({
          url: app.globalData.API_URL + "/upload",
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            sessionId: 'session.token'
          },
          success: function (res) {
            _this.setData({
              bgImg: res.data
            })
          },
          fail: function (res) {
            console.log("上传失败");
          }
        })
      }
    })
  },
  bindButtonTap: function () {
    this.setData({
      focus: true,
      content: ''
    })
  },
  bindKeyInput: function (e) {
    content += e.detail.value;
    this.setData({
      content: e.detail.value
    })
  },
  bindTextAreaBlur: function (e) {
    var that = this; 

    // that.setData({
    //   content: e.detail.value
    // })
  },
  onShareAppMessage: function (ops) {
    let that=this;
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      // console.log(ops.target)
    }
    return {
      title: that.data.name,
      path: 'pages/index/index',
      imageUrl: that.data.bgImg,
      success: function (res) {
        withShareTicker:true       
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  formSubmit:function(){
    let that = this;
    // let sessionId = session.token
    let params = {
      // sessionId: sessionId,
      name: that.data.name,
      isTime: that.data.isTime,
      startDate: that.data.startDate,
      endDate: that.data.endDate,
      isLimit: that.data.isLimit,
      bgColor: that.data.bgColor,
      bgImg: that.data.bgImg,
      content: that.data.content
    };
    app.fetchApis(that, '/saveActivity', params, 'POST', function (res) {
      if (res.errorCode==40008){
        wx.showToast({
          title: '用户身份已过期',
          icon: 'loading',
          duration: 1000
        })
      }else{
        wx.navigateTo({
          url: '../../index/index'
        })
      }
    });
  },
    
})