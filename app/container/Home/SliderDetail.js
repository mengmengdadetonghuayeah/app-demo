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
  TextInput
} from "react-native";

import { Styles, Colors } from "../../themes";
import Ionicons from "react-native-vector-icons/Ionicons";

class SliderDetail extends Component {
  constructor(props) {
    super(props);
  }

  // componentWillMount() {
  // 	console.log('轮播图详情传值过来:%o', this.props)
  // 	this.props.navigation.state.params.callback()
  // 	// this.props.navigation.setParams({
  // 	// 	title: '测试哈哈哈',
  // 	// });
  // 	this.props.navigation.setParams({
  // 		submit: () => {
  // 			this.submit()
  // 		}
  // 	});
  // }
  // 配置页面导航选项
  // static navigationOptions = ({navigation}) => ({
  //     title: 'HOME',
  //     titleStyle: {color: '#ff00ff'},
  //     headerStyle:{backgroundColor:'#000000'}
  // });
  async componentDidMount() {
    this.props.navigation.setParams({
      submit: () => {
        this.submit();
      }
    });
  }
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    headerTintColor: Colors.theme,
    headerTitleStyle: Styles.tb,
    headerLeft: (
      <TouchableOpacity
        style={[{ flex: 1, width: 42, paddingLeft: 18 }, Styles.startcenter]}
        onPress={() => {
          navigation.pop();
        }}
      >
        <Ionicons name="md-arrow-back" size={28} color={Colors.theme} />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.state.params.submit()}
        style={[{ flex: 1, paddingRight: 18 }, Styles.endcenter]}
      >
        <Text style={Styles.n1theme} allowFontScaling={false}>
          提交
        </Text>
      </TouchableOpacity>
    )
  });

  submit = () => {
    console.log("提交呀");
  };

  render() {
    return (
      <View style={{ flex: 1, padding: 18, backgroundColor: "#fff" }}>
        <ScrollView>
          <Text>{this.props.navigation.state.params.title}</Text>
        </ScrollView>
      </View>
    );
  }
}

export default SliderDetail;
