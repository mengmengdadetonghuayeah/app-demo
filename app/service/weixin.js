import { appService, appInfo } from '../service'
import URI from 'urijs'
import { Toast } from 'antd-mobile'
import { get, del, create, update, request } from './utils.js'
var openID = ""
var wechatNickName = ""
var wechatHeadImageURL = ""

var locationURL = ""

export function getOpenID() {
  return openID
}

export function getWechatNickName() {
  return wechatNickName
}

export function getWechatHeadImageURL() {
  return wechatHeadImageURL
}

export function getLocationURL() {
  return locationURL || window.location.href.split('#')[0]
}

//根据code获取到该微信用户的基本信息

export function messageImage() {
  window.wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      console.log('上传成功:%o', res)
      var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      console.log('localIds:%o', localIds)
    }
  })
}
// function shareSuccess() {
//   console.log("分享成功")
//   if (localStorage.getItem("token") != null) {
//     appService.request(appInfo.address.shareSuccess,
//       JSON.stringify({}), true, 'POST')
//       .then((result) => {
//         Toast.info(`分享成功,获得${result.point}积分`)
//       })
//       .catch(error => {
//       }
//       )
//   }
// }

// export function setShare(title = '艺分享', desc = '艺分享', img = '', link = '') {
//   if (!link) {
//     link = window.location.href.split('#')[0]
//   }
//   console.log('setShare', title, desc, link, img)
//   window.wx.onMenuShareAppMessage({
//     title: title, // 分享标题
//     desc: desc, // 分享描述
//     link: link, // 分享链接
//     imgUrl: img, // 分享图标
//     type: 'link', // 分享类型,music、video或link，不填默认为link
//     dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
//     success: function () {
//       // 用户确认分享后执行的回调函数
//       /*
//       console.log("分享成功")
//       if (localStorage.getItem("token") != null) {
//         appService.request(appInfo.address.shareSuccess,
//           JSON.stringify({}), true, 'POST')
//           .then((result) => {
//           })
//           .catch(error => {
//             }
//           )
//       }
//       */
//       shareSuccess()
//     },
//     cancel: function () {
//       // 用户取消分享后执行的回调函数
//       console.log("分享取消")
//     },
//     fail: function (msg) {
//       console.log("分享失败", msg)
//     }
//   })
//   window.wx.onMenuShareTimeline({
//     title: title,
//     link: link,
//     imgUrl: img,
//     success: function () {
//       shareSuccess()
//     },
//     cancel: function () {
//       // 用户取消分享后执行的回调函数
//     }
//   })
// }

function configWx(context) {
  window.wx.config({
    debug: false,
    appId: context.appid,
    timestamp: context.timestamp,
    nonceStr: context.nonce_str,
    signature: context.signature,
    jsApiList: ['chooseImage', 'getLocation', 'scanQRCode']
  })
  window.wx.ready(function () {
    console.log('配置成功')
  });
  window.wx.error(function () {
    console.log('configWx error');
  });

}
export function code() {
  window.wx.scanQRCode({
    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
    success: function (res) {
      console.log('扫码结果:%o', res.resultStr)
      var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
    }
  });
}

export function generateGetCodeUrl(redirectURL) {
  console.log('redit:%o', redirectURL)
  return new URI('https://open.weixin.qq.com/connect/oauth2/authorize')
    .addQuery('appid', 'wx9e5a70dd221d5ac8')
    .addQuery('redirect_uri', redirectURL)
    .addQuery('response_type', 'code')
    //.addQuery('scope', 'snsapi_base')
    .addQuery('scope', 'snsapi_userinfo')
    .hash('wechat_redirect')
    .toString()
}
