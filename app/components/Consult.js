import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableWithoutFeedback, WebView, TextInput, TouchableOpacity, ListView, StyleSheet, Image, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
//npm
import { Styles, Metrics, Colors, Fonts, Images } from '../themes'
import { Button, Tabs, Bar, Line, Yuan } from './All'
import { showTime, transform, transformTime, fatalism, minute } from '../common/transformTime.js'

import dpi from '../themes/dpi.js'
//获取设备的宽度和高度
var {
	height: deviceHeight,
	width: deviceWidth
	} = Dimensions.get('window')


class Consult extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<TouchableWithoutFeedback onPress={this.props.onPress}>
				<View style={{
					position: 'absolute',
					width: Metrics.CW,
					minHeight: Metrics.CH,
					zIndex: 1000,
					backgroundColor: Colors.opacity3,
				}}
				>
					<View style={{ flex: 1 }} />
					<KeyboardAvoidingView behavior="padding">
						<Line />
						<View style={{ padding: 18, backgroundColor: Colors.white }}>
							<View style={Styles.between}>
								<Text style={Styles.t1b} allowFontScaling={false} allowFontScaling={false}>工作咨询</Text>
								<Button
									t='发送'
									w={70}
									h={30}
									bgc={Colors.theme}
									fontStyle={Styles.twhite}
									onPress={this.props.send}
								/>
							</View>
							<TextInput
								style={[{ height: 128, fontSize: dpi.font(14), marginTop: 12, backgroundColor: Colors.line, paddingLeft: 18, paddingRight: 18, paddingBottom: 18, paddingTop: 18, borderRadius: 5, textAlignVertical: 'top' }]}
								placeholder='请输入咨询内容...'
								selectTextOnFocus={true}
								autoCapitalize='none'
								value={this.props.value}
								underlineColorAndroid="transparent"
								placeholderTextColor={Colors.greyc}
								multiline={true}
								onChangeText={this.props.onChangeText}
							/>
						</View>
					</KeyboardAvoidingView>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}
export default Consult