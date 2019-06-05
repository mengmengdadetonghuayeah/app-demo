import { observable, action } from "mobx";
import { observer } from "mobx-react";
import { getCarouselList } from "../axios/home";
import SplashScreen from "react-native-splash-screen";

class HomeStore {
  @observable
  title; // 注册变量，使其成为可检测的
  @observable
  num;
  @observable
  carouselList;
  @observable
  isLoading; //是否加载

  constructor() {
    this.num = 0; // 初始化变量，可以定义默认值
    this.title = "萌萌哒";
    this.isLoading = true;
    this.carouselList = []; //轮播图
  }

  @action // 方法推荐用箭头函数的形式
  changeTitle = title => {
    this.title = title; //修改title
  };
  @action
  getCarsouel = async params => {
    const res = await getCarouselList(params);
    const { status, data } = res;
    console.log("获取到数据没有:%o", res);
    if (status == 200) {
      // SplashScreen.hide();
      this.isLoading = false;
      return (this.carouselList = data.content);
    }
  };
}

const homeStore = new HomeStore();

export { homeStore };
