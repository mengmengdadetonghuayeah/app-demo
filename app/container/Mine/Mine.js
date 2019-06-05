import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  Platform,
  TouchableOpacity
} from "react-native";
import {
  NavigationActions,
  StackActions,
  DrawerNavigator,
  createDrawerNavigator
} from "react-navigation";
import DeviceInfo from "react-native-device-info";

import Drawer from "react-native-drawer";
import QRCode from "react-native-qrcode";

import { Images, Colors, Styles } from "../../themes";
import { Yuan } from "../../components/All";
import { save } from "../../service/storage";
import { I18n, getLanguages } from "../../locales/I18n";
//提示框
import { toastOnShow } from "../../common/toastOnShow";

export default class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "http://facebook.github.io/react-native/",
      language: [
        { id: 1, key: "zh-CH", name: I18n.t("buttons.changeToChinese") },
        { id: 2, key: "en-US", name: I18n.t("buttons.changeToEnglish") }
        // { id: 3, key: "system", name: I18n.t("buttons.changeToSystem") }
      ]
    };
  }
  //切换语言
  refreshLanguage = async (element, index) => {
    if (I18n.locale == element.key) return;
    I18n.locale = element.key;
    let res = await save("language", element.key);
    console.log("res:%o", res);
    toastOnShow("正在设置请稍后...", { duration: 1000 });

    if (res) {
      this.timer = setTimeout(() => {
        const resetAction = StackActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({ routeName: "Tabs" })]
        });

        this.props.navigation.dispatch(resetAction);
      }, 1000);
    }

    // this.setState({
    //   language: I18n.locale
    // });
  };
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };
  render() {
    return (
      <Drawer
        ref={ref => (this._drawer = ref)}
        tapToClose={true}
        styles={{
          flex: 1
        }}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        content={
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(24, 144, 255,0.65)"
            }}
          >
            <View>
              <Text>我想设置语言</Text>
            </View>
          </View>
        }
      >
        <ScrollView
          style={{
            flex: 1,
            padding: 18,
            backgroundColor: Colors.background
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingVertical: 5,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: "#f2f2f2"
            }}
          >
            <Yuan
              image={Images.logo}
              onPress={() => this.openControlPanel()}
              // onPress={() => this.props.navigation.navigate("Tabs")}
              //onPress={() => this.props.navigation.navigate("DrawerOpen")}
            />
          </View>
          <TouchableOpacity>
            <Text>我的</Text>
          </TouchableOpacity>
          {this.state.language.map((element, index) => {
            return (
              <TouchableOpacity
                onPress={() => this.refreshLanguage(element, index)}
                key={element.key}
              >
                <Text>{element.name}</Text>
              </TouchableOpacity>
            );
          })}
          <QRCode
            value={this.state.text}
            size={200}
            bgColor="purple"
            fgColor="white"
          />
        </ScrollView>
      </Drawer>
    );
  }
}
