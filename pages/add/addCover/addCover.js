var app = getApp()
var Session = require('../../../lib/session');
var bgImg='';

Page({
  data: {
    tempFilePaths: ''
  },
  navigateBack: function () {
    wx.navigateTo({
      url: '../des/des?tempFilePaths=' + this.data.tempFilePaths 
    });
  }, 
})  