import React, { Component } from "react";
import {
  StackNavigator,
  TabNavigator,
  SafeAreaView,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
  AsyncStorage,
  InteractionManager
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";


//container
import Home from "./app/container/Home/Home";
import Bussiness from "./app/container/Message/Message";
import { SliderDetail } from "./app/container/Home";

import ModalScreen from "./app/container/Business/Business";
import { BottomTabBar } from "react-navigation-tabs";

import { Colors, Styles, Images } from "./app/themes/";
import Mine from "./app/container/Mine/Mine";

import { I18n, getLanguages } from "./app/locales/I18n";
import TabBar from './app/TabBar'

const routeConfigs = {
  Home: {
    screen: Home,
    path: "/home",
    navigationOptions: {
      tabBarLabel: ({ tintColor, focused }) => (
        <Text
          style={{ color: focused ? "#1890ff" : "#999", fontSize: 12 }}
          allowFontScaling={false}
        >
          {I18n.t("home.tab_home", { locale: I18n.locale })}
        </Text>
      ),
      tabBarIcon: ({ tintColor, focused }) => (
        <Image
          style={{
            width: 26,
            height: 26
          }}
          source={Images[focused ? "tab1theme" : "tab1"]}
        />
      )
    }
  },
  Message: {
    screen: Bussiness,
    path: "/message",
    navigationOptions: {
      tabBarLabel: ({ tintColor, focused }) => (
        <Text
          style={{ color: focused ? "#1890ff" : "#999", fontSize: 12 }}
          allowFontScaling={false}
        >
          {I18n.t("transition.tab_transition")}
        </Text>
      ),
      tabBarIcon: ({ tintColor, focused }) => (
        <Image
          style={{
            width: 26,
            height: 26
          }}
          source={Images[focused ? "tab2theme" : "tab2"]}
        />
      )
    }
  },
  Me: {
    screen: Mine,
    path: "/mine",
    navigationOptions: ({ screenProps }) => ({
      tabBarLabel: ({ tintColor, focused }) => (
        <Text
          style={{ color: focused ? "#1890ff" : "#999", fontSize: 12 }}
          allowFontScaling={false}
        >
          {I18n.t("person.tab_person")}
        </Text>
      ),
      tabBarIcon: ({ tintColor, focused }) => (
        <Image
          style={{
            width: 26,
            height: 26
          }}
          source={Images[focused ? "tab4theme" : "tab4"]}
        />
      )
    })
  }
};

const tabNavigatorConfig = {
  tabBarPosition: "bottom",
  headerMode: "none",
  animationEnabled: false,
  tabBarOptions: {
    activeTintColor: Colors.theme,
    inactiveTintColor: Colors.greyc,
    showIcon: true,
    style: {
      height: Platform.OS === "android" ? 60 : 50,
      backgroundColor: Colors.background
    }
  }
};

const Tabs = TabNavigator(routeConfigs, tabNavigatorConfig); //下面的tab选项的

// //左侧弹出

const AppNavigator = StackNavigator({
  Tabs: {
    screen: TabBar,
    path: "/",
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        height: 0,
        backgroundColor: Colors.background,
        borderBottomWidth: 0
      }
    })
  },
  SliderDetail: {
    screen: SliderDetail
  }
});

// const BottomTabBarWithModal = props => {
//   const jumpTo = index => {
//     const {
//       navigation: { navigate },
//       jumpTo
//     } = props;

//     if (index === "Business") {
//       navigate("Business");
//     } else {
//       jumpTo(index);
//     }
//   };

//   return <BottomTabBar {...props} jumpTo={jumpTo} />;
// };

// //配置为mode形式
// const rootConfig = {
//   mode: "modal",
//   headerMode: "none"
// };
// //配置
// const tabConfig = {
//   tabBarComponent: BottomTabBarWithModal
// };

// //下面的tab
// const RootScreen = createBottomTabNavigator(
//   {
//     Home: {
//       screen: Home,
//       path: "/home",
//       navigationOptions: {
//         // tabBarLabel: "众议捕鱼",
//         tabBarLabel: ({ tintColor, focused }) => (
//           <Text
//             style={{ color: focused ? "#1890ff" : "#999", fontSize: 12 }}
//             allowFontScaling={false}
//           >
//             {I18n.t("home.tab_home", { locale: I18n.locale })}
//           </Text>
//         ),
//         tabBarIcon: ({ tintColor, focused }) => (
//           <Image
//             style={{
//               width: 26,
//               height: 26
//             }}
//             source={Images[focused ? "tab1theme" : "tab1"]}
//           />
//         )
//       }
//     },
//     Message: {
//       screen: Message,
//       path: "/message",
//       navigationOptions: {
//         tabBarLabel: ({ tintColor, focused }) => (
//           <Text
//             style={{ color: focused ? "#1890ff" : "#999", fontSize: 12 }}
//             allowFontScaling={false}
//           >
//             {I18n.t("transition.tab_transition")}
//           </Text>
//         ),
//         tabBarIcon: ({ tintColor, focused }) => (
//           <Image
//             style={{
//               width: 26,
//               height: 26
//             }}
//             source={Images[focused ? "tab2theme" : "tab2"]}
//           />
//         )
//       }
//     },
//     Business: {
//       screen: ModalScreen,
//       navigationOptions: ({ screenProps }) => ({
//         tabBarLabel: ({ tintColor, focused }) => (
//           <Text
//             style={{ color: focused ? "#1890ff" : "#999", fontSize: 12 }}
//             allowFontScaling={false}
//           >
//             +
//           </Text>
//         ),
//         tabBarIcon: ({ tintColor, focused }) => (
//           <Image
//             style={{
//               width: 26,
//               height: 26
//             }}
//             source={Images[focused ? "tab4theme" : "tab4"]}
//           />
//         )
//       })
//     },
//     Me: {
//       screen: Mine,
//       // screen: Left,
//       path: "/mine",
//       navigationOptions: ({ screenProps }) => ({
//         tabBarLabel: ({ tintColor, focused }) => (
//           <Text
//             style={{ color: focused ? "#1890ff" : "#999", fontSize: 12 }}
//             allowFontScaling={false}
//           >
//             {I18n.t("person.tab_person")}
//           </Text>
//         ),
//         tabBarIcon: ({ tintColor, focused }) => (
//           <Image
//             style={{
//               width: 26,
//               height: 26
//             }}
//             source={Images[focused ? "tab4theme" : "tab4"]}
//           />
//         )
//       })
//     }
//   },
//   tabConfig
// );

// const Root1 = createStackNavigator(
//   {
//     Root: RootScreen,
//     Business: ModalScreen
//   },
//   rootConfig
// );

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  async componentDidMount() {
    let res = await I18n.localeLanguage();
    if (res) {
      this.setState({
        isLoading: false
      });
    }
    // SplashScreen.hide();
  }
  render() {
    console.disableYellowBox = true;
    return this.state.isLoading ? null : <AppNavigator />;
  }
}

export default Root;
