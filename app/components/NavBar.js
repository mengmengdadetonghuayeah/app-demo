import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, Alert, View, PixelRatio, TouchableOpacity, Platform, Image } from 'react-native'
//npm
import Icon from 'react-native-vector-icons/Ionicons'
//data theme
import { Styles, Metrics, Colors, } from '../themes'
import { Line } from '../components/All'

const one = 1 / PixelRatio.get()
const w = Metrics.CW

class NavBar extends Component {
	// goBack = () => {
	// 	this.props.navigator.pop()
	// }
	static propTypes = {
		left: PropTypes.bool,
		right: PropTypes.string,
		rgihtshow: PropTypes.bool,
		righttext: PropTypes.string,
		rightAlertText: PropTypes.string,
		righticno: PropTypes.string,
		icnosize: PropTypes.number
	}
	static defaultProps = {
		left: true,
		rightAlert: false,
		righticno: 'ios-cart-outline',
		icnosize: 20,
		NavBarColor: Colors.white,
		padding: 18,
		showtext: true,
	}
	goBack = () => {
		console.log('pop')
		this.props.navigator.pop()
	}
	render() {
		const { back, left, LeftContent, center, CenterContent, showtext, right, rightAlert, rgihtshow, righticno, icnosize, righttext, source, imageSize, NavBarColor, name, onPress, padding, RightContent } = this.props

		let category = this.props.category
		return (
			<View style={{ backgroundColor: NavBarColor }}  >
				<View style={[{ height: (Platform.OS === 'ios') ? 44 : 48, width: w, marginTop: (Platform.OS === 'ios') ? 20 : 0 }, Styles.rowcenter]}>

					{/*NavBar的左边部分*/}
					<View style={{ flex: 1 }}>
						{
							left ?
								<TouchableOpacity
									style={[{ flex: 1, width: 42, paddingLeft: padding }, Styles.startcenter]}
									onPress={() => {

										this.props.navigator.pop()

									}}>
									<Icon name='md-arrow-back' size={28} color={Colors.theme} />
								</TouchableOpacity>
								: <View>{LeftContent}</View>
						}
					</View>

					{/*NavBar的中间部分*/}

					<View style={[{ flex: 1 }, Styles.center]}>
						{
							showtext ?
								<Text style={[{ letterSpacing: 2 }, Styles.tb]} allowFontScaling={false} numberOfLines={1}> {center} </Text> : <View >{CenterContent}</View>
						}
					</View>
					{/*NavBar的右边部分*/}
					<View style={{ flex: 1, }}>
						<TouchableOpacity style={[{ flex: 1, paddingRight: padding }, Styles.endcenter]} onPress={onPress}>
							{right === 'icno' ?
								<Icon name={righticno} size={icnosize} /> :
								right === 'image' ?
									<Image style={{ width: imageSize, height: imageSize }} source={source} /> :
									<Text style={Styles.n1navb} allowFontScaling={false}>{righttext}</Text> ? <View >{RightContent}</View> : null}
						</TouchableOpacity>
					</View>
				</View>

				{this.props.line ? <Line /> : null}
			</View>
		)
	}
}


export default NavBar;