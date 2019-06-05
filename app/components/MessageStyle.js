//react react-native
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  ListView,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import _ from "lodash";

import { Styles, Metrics, Colors, Images } from "../themes";
import { Button, Line, NoDate, Yuan, Yuans } from "./All";

class MessageStyle extends Component {
  static defaultProps = {
    number: 0,
    bc: Colors.white,
    onlineImg: false
  };
  render() {
    const {
      onPress,
      avatar,
      onlineImg,
      title,
      time,
      content,
      number,
      isImg,
      bgc,
      imageStyle,
      onLongPress
    } = this.props;
    return (
      <TouchableOpacity
        style={[
          {
            padding: 18,
            position: "relative",
            borderBottomWidth: Metrics.one,
            borderBottomColor: Colors.line,
            flexDirection: "row"
          }
        ]}
        onPress={onPress}
        delayLongPress={Platform.OS === "ios" ? 500 : 1500}
        onLongPress={onLongPress}
      >
        <Yuan
          images={onlineImg ? avatar : null}
          image={onlineImg ? null : avatar}
          w={54}
          bgc={bgc}
          imageStyle={imageStyle}
        />
        {number === 0 ? null : (
          <View
            style={[
              {
                position: "absolute",
                left: 58,
                top: 18,
                minWidth: 22,
                minHeight: 22,
                backgroundColor: "#FF0D00",
                borderRadius: 11
              },
              Styles.rowcenter
            ]}
          >
            <Text style={Styles.n2white} allowFontScaling={false}>
              {number}
            </Text>
          </View>
        )}
        <View
          style={[{ marginLeft: 14, flex: 1, justifyContent: "space-around" }]}
        >
          <View style={Styles.between}>
            <Text
              style={[Styles.t1b, { maxWidth: 0.6 * Metrics.CW }]}
              allowFontScaling={false}
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text style={Styles.n2grey9} allowFontScaling={false}>
              {time}
            </Text>
          </View>
          {isImg ? (
            <Text
              style={Styles.n1grey9}
              numberOfLines={1}
              allowFontScaling={false}
            >
              [ 图片 ]
            </Text>
          ) : (
            <Text
              style={Styles.n1grey9}
              numberOfLines={1}
              allowFontScaling={false}
            >
              {content}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

export default MessageStyle;
