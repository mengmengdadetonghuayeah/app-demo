import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import {
  AppRegistry,
  Text,
  StyleSheet,
  Alert,
  StatusBar,
  Platform,
  Navigator,
  ScrollView,
  ListView,
  Image,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  PixelRatio,
  TouchableWithoutFeedback
} from "react-native";
//npm
import Icon from "react-native-vector-icons/Ionicons";
import IconF from "react-native-vector-icons/FontAwesome";
import dpi from "../themes/dpi.js";
//data theme
import { Styles, Metrics, Colors, Fonts, Images } from "../themes";

const one = 1 / PixelRatio.get();

const name = [
  { 宽: "w" },
  { 高: "h" },
  { 背景色: "bgc" },
  { 颜色: "c" },
  { 边框角度: "r" },
  { 边框宽: "bw" },
  { 边框颜色: "bc" },
  { 样式: "style" },
  { 字体样式: "fontStyle" },
  { 图片: "image" },
  { 图片样式: "imageStyle" },
  { 图标: "icno" },
  { 图标大小: "size" },
  { 图标颜色: "ic" },
  { 文字: "t" },
  { margin: "margin" },
  { marginTop: "mgt" },
  { marginBottom: "mgb" },
  { padding: "padding" },
  { paddingTop: "pdt" },
  { paddingBottom: "pdb" }
];

class Number extends Component {
  render() {
    const { t1, t2, bgc } = this.props;
    return (
      <View style={[{ width: 30 }, Styles.center]}>
        <TouchableOpacity style={[Styles.number, { backgroundColor: bgc }]}>
          <Text style={[Styles.t1white_b, {}]} allowFontScaling={false}>
            {t1}
          </Text>
        </TouchableOpacity>
        <Text
          style={[Styles.t2white_b, { marginTop: 4 }]}
          allowFontScaling={false}
        >
          {this.props.t2}
        </Text>
      </View>
    );
  }
}

class Unit extends Component {
  static propTypes = {
    w: PropTypes.number,
    r: PropTypes.number,
    bw: PropTypes.number,
    t: PropTypes.string,
    text: PropTypes.bool,
    name: PropTypes.string,
    c: PropTypes.string,
    style: PropTypes.object
  };

  static defaultProps = {
    w: Metrics.CW / 8,
    size: Metrics.CW / 8 * 2 / 3,
    r: Metrics.CW / 8 / 2,
    c: Colors.gray3,
    text: true,
    style: Styles.n2,
    marginTop: 6
  };
  render() {
    let {
      w,
      c,
      c2,
      bw,
      bc,
      t,
      r,
      name,
      localImage,
      pagename,
      style,
      choose,
      src,
      text,
      marginTop,
      size,
      onPress,
      mgt
    } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={[
            {
              width: w,
              height: w,
              borderRadius: r,
              backgroundColor: c,
              borderWidth: bw,
              borderColor: bc,
              marginTop: mgt
            },
            Styles.center
          ]}
        >
          {choose === "image" ? (
            //<Image style={[{ width: w, height: w, borderRadius: r, },]} src={source} /> :
            <Image
              style={[{ width: w, height: w, borderRadius: r }]}
              source={
                src
                  ? { uri: src }
                  : localImage
                    ? localImage
                    : Images.default_data
              }
            />
          ) : (
            <IconF name={name} color={c2} size={size} />
          )}
        </View>
        {text ? (
          <Text
            style={[
              { marginTop: marginTop, textAlign: "center" },
              this.props.style
            ]}
            allowFontScaling={false}
          >
            {t}
          </Text>
        ) : null}
      </TouchableOpacity>
    );
  }
}

class NoDate extends Component {
  static defaultProps = {
    pdt: 60,
    pdb: 120,
    title: "暂无数据",
    text: "空空如也也是一种态度！",
    isText: true
  };
  render() {
    let { pdb, pdt, title, text, isText, onPress, height } = this.props;
    return (
      <TouchableOpacity
        style={[
          {
            flex: 1,
            height: height,
            width: Metrics.CW,
            backgroundColor: Colors.greyf8,
            opacity: 0.5,
            paddingBottom: pdb,
            paddingTop: pdt,
            paddingHorizontal: 30
          },
          Styles.center
        ]}
        onPress={onPress}
      >
        <Unit
          choose="image"
          w={Metrics.CW * 1.2 / 3}
          r={0}
          t={title}
          marginTop={12}
          style={[{ opacity: 0.5 }, Styles.tb]}
          localImage={Images.nodata}
        />
        {isText ? (
          <Text
            style={[
              { marginTop: 8, textAlign: "center", lineHeight: 18 },
              Styles.n2greyc
            ]}
            allowFontScaling={false}
          >
            {text}
          </Text>
        ) : null}
      </TouchableOpacity>
    );
  }
}

class Units extends Component {
  static propTypes = {
    w: PropTypes.number,
    r: PropTypes.number,
    t: PropTypes.string,
    bw: PropTypes.number,
    bjc: PropTypes.string,
    name: PropTypes.string,
    bgc: PropTypes.string,
    fontStyle: PropTypes.object
  };

  static defaultProps = {
    w: Metrics.CW / 8,
    size: Metrics.CW / 8 * 2 / 3,
    r: Metrics.CW / 8 / 2,
    bgc: Colors.background,
    fontStyle: Styles.n2,
    isBage: false
  };
  render() {
    let {
      w,
      bgc,
      bc,
      bw,
      t1,
      fontStyle1,
      image,
      source,
      r,
      t,
      ic,
      icon,
      fontStyle,
      onPress,
      size,
      isBage,
      number,
      text
    } = this.props;
    return (
      <View>
        {isBage ? (
          <View
            style={[
              {
                position: "absolute",
                right: 0,
                top: -w / 2,
                zIndex: 1000,
                paddingLeft: 6,
                paddingRight: 6,
                paddingTop: 1,
                paddingBottom: 1,
                backgroundColor: "#f00",
                borderRadius: 10
              },
              Styles.center
            ]}
          >
            <Text style={Styles.n0} allowFontScaling={false}>
              {number}
            </Text>
          </View>
        ) : null}
        <TouchableOpacity
          style={[{ position: "relative" }, Styles.center]}
          onPress={onPress}
        >
          <View
            style={[
              {
                width: w,
                height: w,
                borderRadius: r,
                backgroundColor: bgc,
                borderWidth: bw,
                borderColor: bc
              },
              Styles.center
            ]}
          >
            {icon ? <Icon name={icon} color={ic} size={size} /> : null}

            {t1 ? (
              <Text style={fontStyle1} allowFontScaling={false}>
                {text}
              </Text>
            ) : null}

            {image ? (
              <Image source={source} style={{ width: w, height: w }} />
            ) : null}
          </View>

          <Text
            style={[{ marginTop: 10, textAlign: "center" }, fontStyle]}
            allowFontScaling={false}
          >
            {t}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class NumberUnit extends Component {
  static defaultProps = {
    w: Metrics.CW / 8,
    size: Metrics.CW / 8 * 2 / 3,
    r: Metrics.CW / 8 / 2,
    bgc: Colors.background,
    fontStyle: Styles.n2,
    isBage: false
  };
  render() {
    let {
      w,
      bgc,
      bc,
      bw,
      t1,
      fontStyle1,
      image,
      source,
      r,
      t,
      ic,
      icon,
      fontStyle,
      onPress,
      size,
      isBage,
      number,
      text
    } = this.props;
    return (
      <View>
        {
          // isBage ?
          // 	<View
          // 		style={[{
          // 			position: 'absolute',
          // 			right: 0, top: -w / 2,
          // 			zIndex: 1000,
          // 			paddingLeft: 6,
          // 			paddingRight: 6,
          // 			paddingTop: 1,
          // 			paddingBottom: 1,
          // 			backgroundColor: '#f00',
          // 			borderRadius: 10
          // 		},
          // 		Styles.center
          // 		]}>
          // 		<Text style={Styles.n0} allowFontScaling={false}>{number}</Text>
          // 	</View>
          // 	:
          // 	null
        }
        <TouchableOpacity
          style={[{ width: w }, Styles.center]}
          onPress={onPress}
        >
          <Text style={fontStyle1} allowFontScaling={false}>
            {text}
          </Text>
          <Text
            style={[{ marginTop: 10, textAlign: "center" }, fontStyle]}
            allowFontScaling={false}
          >
            {t}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class Yuan extends Component {
  static defaultProps = {
    w: Metrics.CW / 10,
    bgc: Colors.white,
    size: 20,
    style: Styles.n2grey3
  };
  render() {
    let {
      w,
      bgc,
      ic,
      size,
      bc,
      bw,
      t,
      fontStyle,
      icon,
      image,
      images,
      mgt,
      mgb,
      mgl,
      mgr,
      onPress
    } = this.props;
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          style={[
            {
              width: w,
              height: w,
              borderRadius: w / 2,
              borderColor: bc,
              borderWidth: bw,
              backgroundColor: bgc,
              marginTop: mgt,
              marginBottom: mgb,
              marginLeft: mgl,
              marginRight: mgr
            },
            Styles.center
          ]}
        >
          {icon ? <Icon name={icon} color={ic} size={size} /> : null}

          {t ? (
            <Text style={fontStyle} allowFontScaling={false}>
              {t}
            </Text>
          ) : null}
          {image || images ? (
            <Image
              source={image ? image : { uri: images }}
              style={{
                width: w,
                height: w,
                borderRadius: w / 2,
                borderColor: bc,
                borderWidth: bw
              }}
            />
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
class Yuans extends Component {
  static propTypes = {
    w: PropTypes.number,
    r: PropTypes.number,
    t: PropTypes.string,
    name: PropTypes.string,
    bgc: PropTypes.string,
    size: PropTypes.number,
    style: PropTypes.object
  };

  static defaultProps = {
    w: Metrics.CW / 10,
    bgc: Colors.white,
    size: 20,
    style: Styles.n2grey3,
    icon: undefined,
    t: undefined
  };
  render() {
    let {
      w,
      bgc,
      ic,
      size,
      r,
      bc,
      bw,
      t,
      fontStyle,
      icon,
      image,
      images,
      mgt,
      mgb,
      mgl,
      mgr,
      imageStyle
    } = this.props;
    return (
      <View
        style={[
          {
            width: w,
            height: w,
            borderRadius: r ? r : w / 2,
            borderColor: bc,
            borderWidth: bw,
            backgroundColor: bgc,
            marginTop: mgt,
            marginBottom: mgb,
            marginLeft: mgl,
            marginRight: mgr
          },
          Styles.center
        ]}
      >
        {icon ? <Icon name={icon} color={ic} size={size} /> : null}

        {t ? (
          <Text style={fontStyle} allowFontScaling={false}>
            {t}
          </Text>
        ) : null}

        {image || images ? (
          <Image source={image ? image : { uri: images }} style={imageStyle} />
        ) : null}

        {/*image ? <Image source={image ? { uri: image } : Images.noData} style={{ width: w, height: w, borderRadius: w / 2, borderColor: bc, borderWidth: bw }} /> : null*/}
      </View>
    );
  }
}

class Line extends Component {
  static propTypes = {
    h: PropTypes.number,
    mgt: PropTypes.number,
    mgb: PropTypes.number,
    w: PropTypes.number,
    c: PropTypes.string
  };

  static defaultProps = {
    h: 1 / PixelRatio.get(),
    c: Colors.line
  };

  render() {
    const { w, h, mgt, mgb, c, fontStyle, t } = this.props;
    return (
      <View
        style={{
          width: w,
          height: h,
          marginTop: mgt,
          marginBottom: mgb,
          backgroundColor: c
        }}
      >
        {this.props.t ? (
          <Text style={fontStyle} allowFontScaling={false}>
            {t}
          </Text>
        ) : null}
      </View>
    );
  }
}

class Bar extends Component {
  static propTypes = {
    h: PropTypes.number,
    c: PropTypes.string,
    w: PropTypes.number
  };
  static defaultProps = {
    h: 50,
    w: one,
    c: Colors.line
  };

  render() {
    const { h, c, w } = this.props;
    return (
      <View
        style={{
          width: w,
          height: h,
          backgroundColor: c
        }}
      />
    );
  }
}

class Tittle extends Component {
  static propTypes = {
    h: PropTypes.number,
    mgt: PropTypes.number,
    mgb: PropTypes.number,
    t: PropTypes.string,
    c: PropTypes.string,
    style: PropTypes.object
  };

  static defaultProps = {
    h: 24,
    c: Colors.b2,
    t: "请用“t”属性输入标题文字",
    style: Styles.t2white_b
  };
  render() {
    const { h, mgt, mgb, c, t, fontStyle } = this.props;
    return (
      <View
        style={[
          {
            height: h,
            marginTop: mgt,
            marginBottom: mgb,
            backgroundColor: c
          },
          Styles.base
        ]}
      >
        <Text style={fontStyle} allowFontScaling={false}>
          {t}
        </Text>
      </View>
    );
  }
}
class GreenTip extends Component {
  static defaultProps = {
    bgc: Colors.green
  };
  render() {
    let { bgc, t } = this.props;
    return (
      <Text
        style={{
          backgroundColor: bgc,
          textAlign: "center",
          color: "white",
          padding: 5,
          fontSize: 12,
          lineHeight: 15
        }}
        allowFontScaling={false}
      >
        {t}
      </Text>
    );
  }
}
class Button extends Component {
  static propTypes = {
    w: PropTypes.number,
    h: PropTypes.number,
    bw: PropTypes.number,
    bc: PropTypes.string,
    r: PropTypes.number,
    bgc: PropTypes.string,
    t: PropTypes.string,
    fontStyle: PropTypes.object
  };
  static defaultProps = {
    w: 80,
    h: 30,
    r: 15,
    bw: one,
    bc: Colors.theme,
    t: "Button",
    fontStyle: Styles.n2
  };
  render() {
    const {
      w,
      h,
      bw,
      bc,
      r,
      bgc,
      fontStyle,
      t,
      onPress,
      mgt,
      mgb,
      mgl,
      mgr,
      content
    } = this.props;
    return (
      <TouchableOpacity
        style={[
          {
            height: h,
            width: w,
            borderRadius: r,
            borderWidth: bw,
            borderColor: bc,
            backgroundColor: bgc,
            marginTop: mgt,
            marginBottom: mgb,
            marginLeft: mgl,
            marginRight: mgr
          },
          Styles.center
        ]}
        onPress={onPress}
      >
        {t ? (
          <Text style={fontStyle} allowFontScaling={false}>
            {t}
          </Text>
        ) : (
          <View>{content}</View>
        )}
      </TouchableOpacity>
    );
  }
}

class Total extends Component {
  render() {
    const {
      w,
      h,
      t,
      bgc,
      r,
      fontStyle,
      top,
      left,
      bottom,
      right,
      bw,
      bc
    } = this.props;
    return (
      <View
        style={[
          {
            position: "absolute",
            top: top,
            left: left,
            bottom: bottom,
            right: right,
            backgroundColor: bgc,
            height: h,
            width: w,
            borderRadius: r,
            borderWidth: bw,
            borderColor: bc,
            overflow: "hidden"
          },
          Styles.center
        ]}
      >
        <Text style={fontStyle} allowFontScaling={false}>
          {t}
        </Text>
      </View>
    );
  }
}

//图片集轮播组件
const w = Metrics.CW;
const h = w * 4 / 5;

const renderPagination = (index, total, context) => {
  return (
    <View
      style={{
        position: "absolute",
        top: Platform.OS === "ios" ? 34 : 14,
        right: 10
      }}
    >
      <Text style={Styles.t1white} allowFontScaling={false}>
        {" "}
        <Text
          style={{ color: "#fff", fontSize: dpi.font(20) }}
          allowFontScaling={false}
        >
          {index + 1}
        </Text>/{total}
      </Text>
    </View>
  );
};

class ImageArey extends Component {
  static defaultProps = {
    showBack: true
  };
  render() {
    const { arry, showBack, source } = this.props;
    console.log("图片集数组", arry);
    return (
      <View>
        <Swiper
          height={h}
          autoplay={false}
          loop={false}
          loadMinimal={true}
          loadMinimalSize={2}
          renderPagination={renderPagination}
        >
          {arry.map((element, index) => {
            return (
              <Image style={styles.image} source={{ uri: element.image }} />
            );
          })}
          {/*
							<Image style={styles.image} source={{ uri: source }} />
						<Image style={styles.image} source={source} />				
			*/}
        </Swiper>
        {showBack === true ? (
          <View style={[styles.back]}>
            <Yuan
              icno="icno"
              name="ios-arrow-back"
              size={24}
              c={Colors.background}
              c2={Colors.nav}
              onPress={() => this.props.navigator.pop()}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: Colors.opacity
    };
    this.changColor = this.changColor.bind(this);
  }
  changColor() {
    this.state.color === Colors.opacity
      ? this.setState({
          color: Colors.theme
        })
      : this.setState({
          color: Colors.opacity
        });
  }

  render() {
    const { color, content, width } = this.props;

    const styles = StyleSheet.create({
      yuan: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 4 * one,
        borderColor: this.state.color,
        backgroundColor: Colors.white,
        marginRight: 10
      }
    });
    return (
      <TouchableOpacity
        style={[
          { width: width, flexDirection: "row", minHeight: 48 },
          Styles.startcenter
        ]}
        onPress={() => this.changColor(this.state.color)}
      >
        <TouchableOpacity
          style={styles.yuan}
          onPress={() => this.changColor(this.state.color)}
        />
        <Text style={[{ lineHeight: 24 }, Styles.t2b]} allowFontScaling={false}>
          {content}
        </Text>
      </TouchableOpacity>
    );
  }
}

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    };
    this.tabStyles = "";
  }
  static propTypes = {};

  static defaultProps = {
    unitwidth: (w - 36) / 2,
    unitheight: 48,
    radius: 3,
    lineShow: false,
    type: "iostab",
    titleOn: Styles.n1,
    titleOff: Styles.n1grey9
  };

  componentWillMount() {
    console.log("this.props:%o", this.props);
    if (this.props.name === "myJob") {
      this.setState({
        currentIndex: this.props.selectTab
      });
    }
  }

  render() {
    const {
      type,
      tabStyles,
      lineShow,
      iconname,
      unitwidth,
      unitheight,
      radius,
      tabTitleStyle,
      tabTitleActiveStyle,
      content,
      titleOn,
      titleOff
    } = this.props;

    const styles = StyleSheet.create(
      type === "underline"
        ? {
            tabTitle: {
              width: unitwidth,
              height: unitheight
            },
            tabTitleActive: {}
          }
        : type === "iostab"
          ? {
              tabTitle: {
                width: unitwidth,
                height: unitheight,
                backgroundColor: "#FFF",
                borderColor: Colors.theme,
                borderWidth: one,
                marginLeft: -one
              },
              tabTitleActive: {
                marginLeft: 0,
                backgroundColor: Colors.theme,
                borderWidth: one,
                borderColor: Colors.theme
              }
            }
          : {
              tabTitle: tabTitleStyle,
              tabTitleActive: tabTitleActiveStyle
            }
    );
    return (
      <View style={{ flex: 1 }}>
        {/*动态生成Tab导航*/}
        <View style={[tabStyles, Styles.rowcenter]}>
          {this.props.children.map((item, index) => {
            const radiu = {
              borderTopLeftRadius:
                index === 0 && type === "iostab" ? radius : 0,
              borderBottomLeftRadius:
                index === 0 && type === "iostab" ? radius : 0,
              borderTopRightRadius:
                this.props.children.length === index + 1 && type === "iostab"
                  ? radius
                  : 0,
              borderBottomRightRadius:
                this.props.children.length === index + 1 && type === "iostab"
                  ? radius
                  : 0
            };
            const ios = [radiu, styles.tabTitle, Styles.center];
            return (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ currentIndex: index });
                  if (this.props.callback) {
                    this.props.callback(index);
                  }
                }}
                style={
                  this.state.currentIndex === index
                    ? [ios, styles.tabTitleActive]
                    : [ios]
                }
              >
                {type === "iostab" ? (
                  <Text
                    style={
                      this.state.currentIndex === index
                        ? Styles.t2white
                        : Styles.t2
                    }
                    allowFontScaling={false}
                  >
                    {" "}
                    {item.props.name}
                  </Text>
                ) : (
                  <Text
                    style={
                      this.state.currentIndex === index ? titleOn : titleOff
                    }
                    allowFontScaling={false}
                  >
                    {" "}
                    {item.props.name}
                  </Text>
                )}
                {type === "underline" && this.props.showLine === true ? (
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      width: unitwidth,
                      height: this.state.currentIndex === index ? 2 : one,
                      backgroundColor:
                        this.state.currentIndex === index
                          ? Colors.theme
                          : Colors.line
                    }}
                  />
                ) : null}
              </TouchableOpacity>
            );
          })}
        </View>
        <View>{content}</View>

        {/*灰色分割线*/}
        {lineShow === true ? <Line h={2} /> : null}
        {/*Tab内容区域*/}
        {this.props.children.map((item, index) => {
          return (
            <View
              style={
                this.state.currentIndex === index
                  ? [{ flex: 1 }]
                  : [{ height: 0, overflow: "hidden" }]
              }
            >
              {this.state.currentIndex === index ? (
                <View
                  style={
                    this.state.currentIndex === index
                      ? [{ flex: 1 }]
                      : [{ height: 0, overflow: "hidden" }]
                  }
                >
                  {item}
                </View>
              ) : (
                <View style={{ height: 0 }} />
              )}
            </View>
          );
        })}
      </View>
    );
  }
}

class Input extends Component {
  static propTypes = {
    icon: PropTypes.string,
    size: PropTypes.number,
    ic: PropTypes.string,
    t: PropTypes.string,
    fontStyle: PropTypes.object,
    placeholderTextColor: PropTypes.object
  };
  static defaultProps = {
    icon: "md-help",
    size: 20,
    color: Styles.n1grey3,
    ic: Colors.greyc,
    placeholder: "请输入Placeholder",
    fontStyle: { color: Colors.greyc },
    placeholderTextColor: Colors.grey9,
    showIcon: true,
    type: false,
    ref: "input"
  };

  // componentWillReceiveProps(nextProps) {
  // 	const { data } = nextProps
  // 	if (data) {
  // 		this.refs[data].blur()
  // 	}

  // 	//this.refs[data].blur()
  // }

  render() {
    const {
      showIcon,
      icon,
      type,
      size,
      ic,
      color,
      onChangeText,
      placeholder,
      placeholderTextColor,
      t,
      onPress,
      fontStyle
    } = this.props;

    return (
      <View
        style={[
          {
            borderBottomWidth: Metrics.one,
            borderBottomColor: Colors.greyc,
            marginBottom: 20,
            height: 40,
            width: Metrics.CW * 0.7,
            flexDirection: "row",
            alignItems: "center"
          }
        ]}
      >
        <View style={{ width: 20 }}>
          {showIcon ? (
            <Icon name={icon} size={size} color={ic} />
          ) : (
            <IconF name={icon} size={size} color={ic} />
          )}
        </View>
        <TextInput
          style={[{ fontSize: dpi.font(14), flex: 1 }]}
          placeholder={placeholder}
          //selectTextOnFocus={true}
          //onFocus={onFocus}
          secureTextEntry={type}
          // ref={tag}
          // onEndEditing={onEndEditing}
          // autoCapitalize='none'
          underlineColorAndroid="transparent"
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
        />
        {t ? (
          <Button
            t={t}
            onPress={onPress}
            bgc={Colors.white}
            fontStyle={Styles.n2code}
          />
        ) : null}
      </View>
      // 	<TouchableOpacity onPress={onPress}>
      // 	<Text style={fontStyle} allowFontScaling={false}>{t}</Text>
      // </TouchableOpacity>
    );
  }
}

class Button1 extends Component {
  static propTypes = {
    w: PropTypes.number,
    h: PropTypes.number,
    bw: PropTypes.number,
    bc: PropTypes.string,
    r: PropTypes.number,
    bgc: PropTypes.string,
    t: PropTypes.string,
    fontStyle: PropTypes.object
  };
  static defaultProps = {
    w: Metrics.CW * 0.7,
    h: 40,
    r: 20,
    bw: one,
    bc: Colors.theme,
    bgc: Colors.theme,
    mgt: 24,
    t: "Button",
    fontStyle: Styles.t1white
  };
  render() {
    const {
      w,
      h,
      bw,
      bc,
      r,
      bgc,
      fontStyle,
      t,
      onPress,
      mgt,
      mgb,
      mgl,
      mgr,
      content
    } = this.props;
    return (
      <TouchableOpacity
        style={[
          {
            height: h,
            width: w,
            borderRadius: r,
            borderWidth: bw,
            borderColor: bc,
            backgroundColor: bgc,
            marginTop: mgt,
            marginBottom: mgb,
            marginLeft: mgl,
            marginRight: mgr
          },
          Styles.center
        ]}
        onPress={onPress}
      >
        {t ? (
          <Text style={fontStyle} allowFontScaling={false}>
            {t}
          </Text>
        ) : (
          <View>{content}</View>
        )}
      </TouchableOpacity>
    );
  }
}

class Lead extends Component {
  render() {
    const { t, h, pageName, onPress, icon, bgc } = this.props;
    return (
      <View>
        <TouchableOpacity
          style={[{ height: 50, padding: 18 }, Styles.between]}
          onPress={onPress}
        >
          <View style={Styles.startcenter}>
            <Yuan icon={icon} size={14} ic={Colors.white} bgc={bgc} w={22} />
            <Text style={Styles.n1} allowFontScaling={false}>
              {" "}
              {t}
            </Text>
          </View>
          <Icon
            name={"ios-arrow-forward-outline"}
            size={14}
            color={Colors.greyc}
          />
        </TouchableOpacity>
        <Line h={h} />
      </View>
    );
  }
}

class Footer extends Component {
  static defaultProps = {
    w: Metrics.CW / 3
  };
  render() {
    const { t, w } = this.props;
    return (
      <View
        style={[
          { padding: 18, backgroundColor: Colors.greyf8 },
          Styles.rowcenter
        ]}
      >
        <Line w={w} c={Colors.greyc} />
        <Text style={Styles.n2grey9} allowFontScaling={false}>
          {" "}
          {t}{" "}
        </Text>
        <Line w={w} c={Colors.greyc} />
      </View>
    );
  }
}

export {
  Number,
  ImageArey,
  Total,
  Line,
  Bar,
  Button,
  Button1,
  Unit,
  Units,
  NumberUnit,
  Yuan,
  Yuans,
  NoDate,
  CheckBox,
  Tabs,
  Input,
  Lead,
  Footer,
  GreenTip
};

const styles = StyleSheet.create({
  back: {
    flex: 1,
    position: "absolute",
    top: 0,
    backgroundColor: "rgba(0,0,0,0)",
    padding: 10,
    paddingTop: Platform.OS === "ios" ? 30 : 10
  },
  image: {
    width: w,
    height: h
  }
});
