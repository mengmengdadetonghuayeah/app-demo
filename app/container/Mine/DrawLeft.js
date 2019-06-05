import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { Yuan } from "../../components/All";
import { Images, Colors, Styles } from "../../themes";

export default class DrawerLeft extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Yuan
          image={Images.logo}
          mgl={18}
          onPress={() => this.props.navigation.navigate("DrawerClose")}
        />
      </View>
    );
  }
}

// 定义样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  list: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ddd",
    borderBottomWidth: 1
  },
  text: {
    fontSize: 20,
    color: "#333"
  },
  icon: {
    width: 24,
    height: 24
  }
});
