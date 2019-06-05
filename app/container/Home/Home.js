import React, { Component } from "react";

import {
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  ListView,
  TextInput,
  PixelRatio,
  NetInfo,
  RefreshControl,
  KeyboardAvoidingView
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Swiper from "react-native-swiper";
import SVGImage from "react-native-svg-image";
import { Spinner } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import KeyboardSpacer from "react-native-keyboard-spacer";
//视图文件
// import { connect } from "mobx-react";
// import { observer, inject, connect } from "mobx-react/native";

import DeviceInfo from "react-native-device-info";

//data  themes
import { Styles, Metrics, Colors, Images } from "../../themes";
import { I18n, getLanguages } from "../../locales/I18n";

//接数据
// import { get, address } from "../../service";
// const one = 1 / PixelRatio.get();

// @inject(["homeStore"]) // 注入对应的store
// @observer // 监听当前组件
class Home extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const uniqueId = DeviceInfo.getUniqueID();
    let res = await I18n.localeLanguage();
    // const params = {
    //   parent: "carousel",
    //   language: res || "zh-CN",
    //   orderBy: "orderBy"
    // };

    // this.props.homeStore.getCarsouel(params);
  }
  render() {
    console.log('为什么不进入到home页面')
    return (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <Text>1</Text>
      </View>
    );
  }
}


{
  //   <ScrollView style={{ flex: 1 }}>
  //   <View
  //     style={{
  //       height: (Metrics.CW * 180) / 375,
  //       width: Metrics.CW,
  //       justifyContent: "center",
  //       alignItems: "center"
  //     }}
  //   >
  //     {this.props.homeStore.isLoading ? (
  //       <Spinner color={Colors.theme} />
  //     ) : (
  //         <Swiper
  //           showsButtons={false}
  //           // autoplayTimeout={1}
  //           autoplay={true}
  //           removeClippedSubviews={false}
  //           activeDotColor={Colors.theme}
  //           dotColor={Colors.white}
  //           height={(Metrics.CW * 180) / 375}
  //         >
  //           {this.props.homeStore.carouselList.map(item => {
  //             let ViewClass =
  //               item["url"].indexOf("svg") == -1 ? Image : SVGImage;
  //             return (
  //               <TouchableOpacity
  //                 key={item.id}
  //                 style={{ height: (Metrics.CW * 180) / 375 }}
  //                 onPress={() => {
  //                   this.props.navigation.navigate("SliderDetail", {
  //                     title: item["description"],
  //                     id: item["id"],
  //                     callback: () => {
  //                       console.log("回调函数");
  //                     }
  //                   });
  //                 }}
  //               >
  //                 <ViewClass
  //                   style={styles.slide}
  //                   resizeMode="stretch"
  //                   source={{ uri: `http:${item["url"]}` }}
  //                 />
  //               </TouchableOpacity>
  //             );
  //           })}
  //         </Swiper>
  //       )}
  //   </View>
  // </ScrollView>
  // {/*居于底部输入框*/}
  // <TextInput
  //   style={{
  //     padding: 0,
  //     left: 0,
  //     right: 0,
  //     height: 45
  //   }}
  //   multiline={true}
  //   placeholder={"Enter your text!"}
  //   underlineColorAndroid="transparent"
  // />
  // {Platform.OS === "ios" ? <KeyboardSpacer topSpacing={-48} /> : null}
}
let styles = StyleSheet.create({
  searchbox: {
    height: 30,
    flexDirection: "row",
    width: Metrics.CW,
    top: Platform.OS === "ios" ? 24 : 16,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 20000
  },
  search: {
    flex: 3.6,
    height: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.3)",
    //backgroundColor: 'red',
    borderRadius: 4
  },
  head: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 18,
    paddingRight: 8
  },
  image: {
    width: 18,
    height: 18
  },
  slide: {
    // resizeMode: Image.resizeMode.contain,
    height: (Metrics.CW * 180) / 375,
    width: Metrics.CW,
    backgroundColor: "pink"
  },
  container: {
    marginTop: 35,
    padding: 20
  },
  border: {
    borderWidth: 1,
    borderColor: "#48BBEC",
    borderRadius: 8
  },
  centering: {
    alignItems: "center",
    justifyContent: "center"
  },

  //搜索框
  searchContainer: {
    flexDirection: "row"
  }
});

export default Home;
