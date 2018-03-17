//index.js
//获取应用实例
const app = getApp()
const Util = require('../../utils/util.js');
var Session = require('../../lib/session');
let session = Session.get();
console.log(Session);
let page = '1';
let page1 = '1';
let selected = true;
let data_id;
Page({
  data: {
    "circleList": [
      {
        "total": 2,
        "totalPage": 2,
        "rows": [{
          "id": 24,
          "name": "戒撸打卡",
          "createrWxId": "owg205JT1aBhu2vLwJBLPXEgnxH4",
          "createTime": 1520494414000,
          "content": "里一个flag",
          "isTime": 0,
          "startDate": "",
          "endDate": "",
          "isSign": "",
          "isLimit": 0,
          "signHeads": "",
          "img": "https://xiao.qingheshe.com/upload/gQCjhYbBNPkdVSnY.jpg",
          "video": "",
          "music": "",
          "likeCount": "",
          "bgImg": "https://xiao.qingheshe.com/upload/gQCjhYbBNPkdVSnY.jpg",
          "bgColor": "1",
          "activityFlagCount": 0,
          "activityGreatCoun": 0,
          "activityDescribe": "",
          "result": "",
          "msg": ""     
        },
        {
          "id": 25,
          "name": "123",
          "createrWxId": "123",
          "createTime": 1520494411000,
          "content": "里一个flag",
          "isTime": "",
          "startDate": "",
          "endDate": "",
          "isSign": "",
          "isLimit": 1,
          "signHeads": "",
          "img": "https://xiao.qingheshe.com/upload/gQCjhYbBNPkdVSnY.jpg",
          "video": "",
          "music": "",
          "likeCount": "",
          "bgImg": "https://xiao.qingheshe.com/upload/gQCjhYbBNPkdVSnY.jpg",
          "bgColor": "1",
          "activityFlagCount": 0,
          "activityGreatCoun": 0,
          "activityDescribe": "",
          "result": "",
          "msg": ""      
        }
      ]
    }],
    "circleList1": [
      {
        "total": 1,
        "totalPage": 2,
        "rows": [{
          "id": 1,
          "name": "戒撸flag",//密圈名称
          "createrWxId": "3",
          "content": "戒撸，吃素，运动旅行",                //密圈简介   
          "isLimit": "1",  //是否仅圈内可看，0是1否
          "signHeads": [
            {
              id: "01",
              log: "../../images/image/user.jpg"
            },
            {
              id: "02",
              log: "../../images/image/user1.jpg"
            },
            {
              id: "03",
              log: "../../images/image/user.jpg"
            }
          ],//密圈参与者 
          "likeCount": "",//预留字段
          "bgImg": "",//封面图
          "bgColor": "1",//主题颜色，1-5对应前端5中颜色
          "activityFlagCount": 3,//已经立3个flag
          "activityGreatCoun": 6,//点赞总数
          "activityDescribe": "",//首页截取15字的主题        
        }]
      }],
    scrollTop: 0,
    scrollHeight: 0,
    selected: true,
    showModal:false
  },
  onLoad: function () {
    let that = this;
    let selected = that.data.selected;
    GetList(that,page, 10, selected)
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  scroll: function (event) {
    //   该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  // /** 
  //  * 页面上拉触底事件的处理函数 
  //  */  
  onReachBottom: function () {
    let that = this;
    let selected = that.data.selected;    
    if (selected){
      let totalPage = that.data.circleList[0].totalPage;
      if (page<totalPage){
        page = parseInt(page) + 1;
        GetList(that, page, 10, selected);
      }else{
        wx.showToast({
          title: '已加载全部数据...',
          duration: 1000,
        })      
      }       
    }else{
      let totalPage = that.data.circleList1[0].totalPage;
      if (page1 < totalPage) {
        page1 = parseInt(page1) + 1;
        GetList(that, page1, 10, selected);
      } else {
        wx.showToast({
          title: '已加载全部数据...',
          duration: 1000,
        })
      } 
    }
  },  
  selected: function (e) {
    let that = this;
    that.setData({
      selected: true
    })
    selected = true;
    GetList(that, page, 10, selected)
  },
  selected1: function (e) {
    let that = this;
    that.setData({
      selected: false
    })
    selected = false;
    GetList(that, page1, 10, selected)
  },
  showDialogBtn: function (event) {
    let that = this;
    data_id = event.currentTarget.id;
    let name = event.currentTarget.dataset.name;
    let like = event.currentTarget.dataset.like;
    let count = event.currentTarget.dataset.count;
    let bgColor = event.currentTarget.dataset.color;
    let data_isLimit = event.currentTarget.dataset.val;
    //判断是否有权进入
    if (data_isLimit == '0') {
      app.fetchApis(that, '/checkAuth', { activityId: data_id }, 'GET', function (res) {
        if (res.data.data.flag) {

          wx.navigateTo({
            url: '../info/info?id=' + data_id + '&name=' + name + '&like=' + like + '&count=' + count + '&color=' + bgColor
          });
        } else {
          that.setData({
            showModal: true
          })
        }
      })
    } else {
      wx.navigateTo({
        url: '../info/info?id=' + data_id + '&name=' + name + '&like=' + like + '&count=' + count + '&color=' + bgColor
      });
    }
    /*let that=this;
    data_id = event.currentTarget.id;
    let data_isLimit = event.currentTarget.dataset.val;
    let name = event.currentTarget.dataset.name;
    let like = event.currentTarget.dataset.like;
    let count = event.currentTarget.dataset.count;
    let bgColor = event.currentTarget.dataset.color;    
    if (data_isLimit=='0'){
      this.setData({
        showModal: true
      })
    }else{
      wx.navigateTo({
        url: '../info/info?id=' + data_id + '&name=' + name + '&like=' + like + '&count=' + count + '&color=' + bgColor
      });
    }*/
  },
  /**
 * 隐藏模态对话框
 */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
  * 对话框取消按钮点击事件
  */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function (event) {
    this.hideModal();
    wx.navigateTo({
      url: '../add/add?id=' + data_id
    });
  }
})


// 列表请求方法
var GetList = function (that, page, size, selected) {
  let params = {
    // sessionId:session.token,
    page: page,
    size: 10
  };
  let url;
  if (selected) {
    url = '/activitys';
    var list = [];
    app.fetchApis(that, url, params, 'GET', function (res) {
      // if (page == '0') {
      //   var list = [];
      // } else {
      //   list = that.data.circleList;
      // }
      
      if (res.data.rows){
        for (var i = 0; i < res.data.rows.length; i++) {
          
          list.push(res.data.rows[i]);
        }
        that.setData({
          circleList:list
        });
        
      }
    });
  } else {
    url = '/myActivitys';
    app.fetchApis(that, url, params, 'GET', function (res) {
      if (page == '1') {
        var list = [];
      } else {
        list = that.data.circleList;
      }
      if (res.data.rows) {
        for (var i = 0; i < res.data.rows.length; i++) {
          list.push(res.data.rows[i]);
        }
        that.setData({
          circleList1: list
        });
      }
    });
  }
}