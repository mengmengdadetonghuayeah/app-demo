// import React, { Component } from "react";

// import {
//   View,
//   Text,
//   Image,
//   Platform,
//   TouchableOpacity,
//   ActivityIndicator,
//   TouchableHighlight,
//   StyleSheet,
//   ScrollView,
//   ListView,
//   TextInput,
//   PixelRatio,
//   NetInfo,
//   RefreshControl,
//   FlatList,
//   findNodeHandle,
//   NativeModules
// } from "react-native";

// import { GCanvasView } from "react-native-gcanvas";
// import {
//   enable,
//   ReactNativeBridge,
//   Image as GImage
// } from "gcanvas.js/src/index.js";

// import Icon from "react-native-vector-icons/Ionicons";
// import Swiper from "react-native-swiper";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import DeviceInfo from "react-native-device-info";

// // Must set up GCanvas Module before using, or a exception will thorw
// ReactNativeBridge.GCanvasModule = NativeModules.GCanvasModule;
// ReactNativeBridge.Platform = Platform;

// //引入action
// import {
//   fetchSwiper,
//   fetchBanner,
//   fetchMessage,
//   addHistory
// } from "../../redux/action";

// //data  themes
// import { Styles, Metrics, Colors, Images } from "../../themes";
// import MessageStyle from "../../components/MessageStyle";

// //接数据
// import { get, address } from "../../service";
// const one = 1 / PixelRatio.get();

// class Message extends Component {
//   constructor(props) {
//     super(props);
//   }
//   componentDidMount() {
//     var ref = this.refs.canvas_holder;
//     var canvas_tag = findNodeHandle(ref);
//     // var canvas_tag = "2";
//     var el = { ref: "" + canvas_tag, style: { width: 414, height: 376 } };
//     ref = enable(el, { bridge: ReactNativeBridge });
//     var ctx = ref.getContext("2d");
//     //rect
//     ctx.fillStyle = "green";
//     ctx.fillRect(0, 0, 100, 100);
//     //rect
//     ctx.fillStyle = "black";
//     ctx.fillRect(100, 100, 100, 100);
//     ctx.fillRect(25, 205, 414 - 50, 5);
//   }
//   render() {
//     // var ref = this.refs.canvas_holder;
//     // var canvas_tag = findNodeHandle(ref);
//     // // var canvas_tag = "2";
//     // var el = { ref: "" + canvas_tag, style: { width: 414, height: 376 } };
//     // ref = enable(el, { bridge: ReactNativeBridge });
//     // var ctx = ref.getContext("2d");
//     // //rect
//     // ctx.fillStyle = "green";
//     // ctx.fillRect(0, 0, 100, 100);
//     // //rect
//     // ctx.fillStyle = "black";
//     // ctx.fillRect(100, 100, 100, 100);
//     // ctx.fillRect(25, 205, 414 - 50, 5);
//     //<GCanvasView ref="canvas_holder" />
//     return <GCanvasView ref="canvas_holder" />;
//   }
// }

// //获取到的数据以及状态
// const mapStateToProps = (state, ownProps) => {
//   return {
//     isLoading: state.getMessageReducer.isLoading,
//     response: state.getMessageReducer.response
//   };
// };
// //获取数据的方法
// const mapDispatchToProps = (dispatch, ownProps) => {
//   return bindActionCreators(
//     {
//       getMessage: fetchMessage,
//       addHistory: addHistory
//     },
//     dispatch
//   );
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Message);

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Button,
  Dimensions,
  PixelRatio,
  requireNativeComponent,
  findNodeHandle,
  NativeModules
} from "react-native";

import io from "socket.io-client";

export default class Bussiness extends Component {
  constructor(props) {
    super(props);
    // this.socket = io.connect(
    //   "wss://exws.zhigui.com/",
    //   {
    //     path: "/v1/market",
    //     transports: ["websocket", "polling"], // you need to explicitly tell it to use websockets
    //     secure: true
    //   }
    // );
  }
  async componentDidMount() {
    // this.socket.io.on("open", function() {
    //   console.log("web socket connected.");
    // });

    // this.socket.io.on("close", function() {
    //   console.log("web socket disconnected.");
    // });

    // this.socket.on("topic_prices", message => {
    //   //该市场的最新成交价格以及涨跌幅
    //   if (message) {
    //     // console.log("价格的涨幅:%o", message);
    //     // this.setState({
    //     //   topicprices:message
    //     // })
    //   }
    // });
  }
  render() {
    return <Text>交易打定</Text>;
  }
}
