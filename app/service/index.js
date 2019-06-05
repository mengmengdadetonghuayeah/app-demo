import { get, create, update, del } from './utils'
import { address } from './address'
var appCore = {
  verificationCode: null,
  navigator: undefined,
  error: '服务器错误',
  username: 0,
  longitude: 0,
  interest: false,
  selectTab: 'Home',
  account: undefined,
  latitude: 0,
  voice: undefined,
  isMessageDetail: false,
  isEnroll: false,
  messageType: undefined,
  defaultCity: {},//默认城市,
  city: undefined, //留作all用
  code: undefined,  //留作all用
  locationCity: undefined,
  locationCode: undefined,
  jobType: true,
  locationDetail: '暂未获取到城市',
  token: undefined,
  users: undefined,
  avatar: undefined,
  noticeRead: false,
  changeTab: false,
  userId: 0, //用户的id
  username: 0,/*用户的电话号码 */
  cityInfo: undefined, //暂定个默认
  getCode: undefined,
  category: '类型',
  area: '区域',
  sort: '排序',
  nickname: '全局昵称',
  avatar: null,/*全局头像 */
  unreadMessageList: [],
  messageList: [],
  employList: [],
  settleList: [],
  assessList: [],
  personCertList: [],/*认证消息 */
  withdrawList: undefined,/*体现消息 */
  userInfo: undefined,
  personInfo: 0,
  registrationId: '170976fa8abb47e694b',
  systemList: [],
  noticesList: [],
  sexLimit: 'none',//筛选性别 默认为不限
  duration: 'none', //兼职时段 默认为不限
  period: 'none',//工作周期 默认为不限
  isVip: false,//是否为vip企业 默认是
  worktime: undefined,//工作时间
  //city: localStorage.getItem('city') ? localStorage.getItem('city').substring(0, localStorage.getItem('city').length - 1) : undefined,
  certificate: undefined,
  certificateId: undefined,
  lat: undefined,//经度
  lon: undefined,//纬度
  username: undefined,
  cityInfo: undefined,
  countryId: undefined,
  countryName: undefined,
  version: undefined,//版本信息
  onlineVersion: undefined,/*线上版本 */
  versionContent: undefined,
  sound: true,//声音设置
  personCert: undefined,
  front: undefined,
  back: undefined,
  recommendList: [],
  enter: undefined,
  recvId: undefined,
  isNotifications: undefined,
  evaluationValue: []
}

export { appCore, get, create, update, del, address }
