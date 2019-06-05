
import React, { PureComponent, Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  Platform,
} from "react-native";
import TabNavigator from "react-native-tab-navigator";
import Ionicons from "react-native-vector-icons/Ionicons";
import SafeAreaView from 'react-native-safe-area-view';

//container
import Home from "./container/Home/Home";
import Message from "./container/Message/Message";
import ModalScreen from "./container/Business/Business";
import Mine from "./container/Mine/Mine";

import { Colors, Styles, Images } from "./themes/";
import { I18n, getLanguages } from "./locales/I18n";
import isIphoneX from './service/screenUtils'

const TABAR_ITEMS = [
  {
    title: I18n.t("home.tab_home"),
    name: 'home',
    icon: 'tab1',
    selectIcon: 'tab1theme',
    component: Home

  },
  {
    title: I18n.t("transition.tab_transition"),
    name: "Business",
    icon: 'tab2',
    selectIcon: 'tab2theme',
    component: Message
  },

  {
    title: I18n.t("person.tab_person"),
    name: "mine",
    icon: 'tab4',
    selectIcon: 'tab4theme',
    component: Mine
  },
];

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "home",
      isLogin: false,
    };
  }

  tabPage = name => {
    this.setState({
      selectedTab: name
    })
  };
  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>
          {TABAR_ITEMS.map((item, index) => {
            let Component = item.component;
            return (
              <TabNavigator.Item
                key={index}
                title={item.title}
                selected={this.state.selectedTab === item.name}
                selectedTitleStyle={styles.selectedTextStyle}
                titleStyle={styles.textStyle}

                renderIcon={() => (
                  <Image source={Images[item.icon]} style={styles.iconStyle} />
                )}
                renderSelectedIcon={() => (
                  <Image source={Images[item.selectIcon]} style={styles.iconStyle} />
                )}
                onPress={() => this.tabPage(item.name)}
              >
                <Component
                  {...this.props}
                  tabPage={this.tabPage}
                />
              </TabNavigator.Item>
            )
          })}
        </TabNavigator>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  iconStyle: {
    width: 26,
    height: 26
  },
  container: {
    flex: 1,
    flexDirection: "row"

  },
  textStyle: {
    color: Colors.grey9,
    fontSize: 12,
    textAlign: "center"
  },
  selectedTextStyle: {
    color: Colors.theme,
    fontSize: 12,
    textAlign: "center",
  }
});
export default TabBar
