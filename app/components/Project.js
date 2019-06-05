//react react-native
import React, { Component, PropTypes } from 'react';
import { View, Text, Alert, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, ListView } from 'react-native'
//npm
import Icon from 'react-native-vector-icons/Ionicons'
import _ from 'lodash'
//data themes
import { Styles, Metrics, Colors, Images } from '../themes'
//components
import { Line, Yuan, Yuans, Button, Button1 } from './All'
import dpi from '../themes/dpi.js'
class TextBox extends Component {
	static defaultProps = {
		placeholderTextColor: Colors.grey3,
		text: true,
		chooseTip: '请选择',
		// placeholder: '请输入',
		h: 53
	}
	render() {
		const { t, content, text, placeholder, must,
			placeholderTextColor, choose, chooseTip,
			chooseRight, chooseUnder, h, onPress, onChangeText, defaultValue, value } = this.props
		return (
			<View style={[{ height: h }, styles.TextInputBox1]}>
				<View style={Styles.startcenter}>
					<Text style={Styles.n1grey9} allowFontScaling={false}>{must ? <Text style={Styles.n1theme} allowFontScaling={false}>* </Text> : null}{t}</Text>
					{
						text ?
							<TextInput
								style={{ flex: 1, fontSize: dpi.font(14) }}
								placeholder={placeholder}
								selectTextOnFocus={true}
								underlineColorAndroid="transparent"
								placeholderTextColor={placeholderTextColor}
								defaultValue={defaultValue}
								value={value}
								onChangeText={onChangeText}
							/> :
							choose ?
								<View style={[{ flex: 1 }]}>
									<TouchableOpacity style={[{ flex: 1 }, Styles.between]} onPress={onPress}>
										<Text style={Styles.n1grey3} allowFontScaling={false}>{chooseTip}</Text>
										<View style={Styles.startcenter}>
											{chooseRight}
											<Text>  </Text>
											<Icon name={'ios-arrow-forward-outline'} color={Colors.greyc} size={20} />
										</View>
									</TouchableOpacity>

								</View>
								:
								<View style={{ flex: 1 }}>{content}</View>
					}
				</View>
				{chooseUnder}
			</View>

		)
	}
}

class Choose extends Component {
	static defaultProps = {
		choose: true
	}
	constructor(props) {
		super(props)
		this.state = { choose: this.props.choose }
	}
	choose = () => {
		if (this.state.choose) {
			this.setState({ choose: false })
		} else {
			this.setState({ choose: true })
		}
	}
	render() {
		return (
			<View>
				{
					this.state.choose ?
						<Yuan
							icon={'md-checkmark'}
							size={15}
							ic={Colors.white}
							w={22}
							bw={Metrics.one}
							bgc={Colors.theme}
							bc={Colors.white}
							onPress={() => this.choose()}
						/> :
						<Yuan
							icon={'md-checkmark'}
							size={15}
							ic={Colors.white}
							w={22}
							bw={Metrics.one}
							onPress={() => this.choose()}
							bgc={Colors.white}
							bc={Colors.greyc} />
				}
			</View>
		)
	}
}

class Select extends Component {
	static defaultProps = {
		choose: true
	}
	constructor(props) {
		super(props)
		this.state = { choose: this.props.choose }
	}
	choose = () => {
		if (this.state.choose) {
			this.setState({ choose: false })
		} else {
			this.setState({ choose: true })
		}
	}
	render() {
		return (
			<TouchableOpacity onPress={() => this.choose()} >
				<Image source={this.state.choose ? Images.switchOn : Images.switchOff} />
			</TouchableOpacity>
		)
	}
}

class GreenTip extends Component {
	render() {
		return (
			<Text style={{
				backgroundColor: '#01B38B',
				textAlign: 'center',
				color: 'white',
				padding: 5,
				fontSize: dpi.font(12)
			}}
				allowFontScaling={false}
			>
				{this.props.t}
			</Text>
		)
	}
}

class ChooseTrue extends Component {
	render() {
		return (
			<View style={{
				width: 22,
				height: 22,
				borderRadius: 11,
				backgroundColor: Colors.theme,
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				<Icon name='md-checkmark' size={15} color={Colors.white} />
			</View>
		)
	}
}

class ChooseFalse extends Component {
	render() {
		return (
			<View style={{
				width: 22,
				height: 22,
				borderRadius: 11,
				backgroundColor: Colors.white,
				borderWidth: Metrics.one,
				borderColor: Colors.greyc,
				justifyContent: 'center',
				alignItems: 'center'
			}}>
			</View>
		)
	}
}

class Input extends Component {
	static defaultProps = {
		icon: 'md-help',
		size: 20,
		ic: Colors.greyc,
		placeholder: '请输入Placeholder',
		fontStyle: { color: Colors.greyc },
		placeholderTextColor: Colors.grey9,
		secure: false
	}
	render() {
		const { icon, size, ic, secure, onChangeText, placeholder, placeholderTextColor, t, onPress, fontStyle } = this.props;
		return (
			<View style={{
				borderBottomWidth: Metrics.one,
				borderBottomColor: Colors.line,
				height: 40,
				marginBottom: 20,
				flexDirection: 'row',
				// justifyContent: 'flex-start',
				alignItems: 'center',
				justifyContent: 'center'
			}}>
				<Icon name={icon} size={size} color={ic} />
				<TextInput
					style={{ flex: 1, fontSize: dpi.font(14), marginLeft: 10 }}
					placeholder={placeholder}
					selectTextOnFocus={true}
					secureTextEntry={secure}
					// autoCapitalize='none'
					underlineColorAndroid="transparent"
					placeholderTextColor={placeholderTextColor}
					onChangeText={onChangeText}
				/>
				{
					t ?
						<TouchableOpacity onPress={onPress}>
							<Text style={fontStyle} allowFontScaling={false}>{t}</Text>
						</TouchableOpacity> : null
				}
			</View>
		)
	}
}

//我的 最下面的
class Lead extends Component {
	render() {
		const { t, h, pageName, onPress, icon, bgc, image, images, imageStyle } = this.props
		// console.log('照片是%o', images)
		return (
			<View>
				<TouchableOpacity style={[{ height: 50, padding: 18 }, Styles.between]} onPress={onPress}>
					<View style={Styles.startcenter}>
						{
							icon ? <Yuans icon={icon} size={17} ic={Colors.white} bgc={bgc} w={24} />
								: <Yuans image={image} bgc={bgc} w={24} imageStyle={imageStyle} />
						}
						<Text style={Styles.t1} allowFontScaling={false}>  {t}</Text>
					</View>
					<Icon name={'ios-arrow-forward-outline'} size={17} color={Colors.greyc} />
				</TouchableOpacity>
				<Line h={h} />
			</View>
		)
	}
}

//文本域
class Textarea extends Component {
	static defaultProps = {
		placeholder: '请输入...',
		placeholderTextColor: Colors.greyc,
		h: 120,
		r: 5,
		bgc: Colors.greyf8,
	}
	render() {
		const { h, r, bgc, placeholder, value, placeholderTextColor, onChangeText, mgt, mgb } = this.props
		return (
			<TextInput
				style={{
					height: h,
					borderRadius: r,
					backgroundColor: bgc,
					padding: 18,
					fontSize: dpi.font(14),
					color: Colors.grey9,
					marginTop: mgt,
					marginBottom: mgb,
					textAlignVertical: 'top'
				}}
				placeholder={placeholder}
				selectTextOnFocus={true}
				autoCapitalize='none'
				underlineColorAndroid="transparent"
				placeholderTextColor={placeholderTextColor}
				multiline={true}
				value={value}
				onChangeText={onChangeText}
			/>
		)
	}
}

//评价标签
class Lable extends Component {
	static defaultProps = {
		mgb: 18,
		mgt: 18
	}
	constructor(props) {
		super(props)
		this.state = { dataSource: this.props.source }
		this.selected = []
	}
	render() {
		const { mgt, mgb } = this.props
		console.log('结算结果穿过啦的参数', this.props)
		return (
			<View style={{
				justifyContent: 'flex-start',
				flexDirection: 'row',
				flexWrap: 'wrap',
				marginTop: mgt,
				marginBottom: mgb
			}}>
				{
					this.props.source.map(item => {
						let hasSelected = false

						for (let i = 0; i < this.selected.length; i++) {
							if (this.selected[i].id === item.id) {
								hasSelected = true
								break
							}
						}
						return (
							<View style={{ marginRight: 10 }}>
								{
									hasSelected ?
										<TouchableOpacity style={styles.chooseOn}
											onPress={() => {
												for (let i = 0; i < this.selected.length; i++) {
													if (this.selected[i].id === item.id) {
														this.selected.splice(i, 1)
														break
													}
												}
												let dsClone = _.cloneDeep(this.props.source)
												this.setState({ dataSource: dsClone })
											}}>
											<Text style={Styles.n2white}> {item.name}</Text>
										</TouchableOpacity>
										:
										<TouchableOpacity style={styles.chooseOff}
											onPress={() => {
												this.selected.push(item)
												let dsClone = _.cloneDeep(this.props.source)
												this.setState({ dataSource: dsClone })
												// this.props.backLable(item.name)
											}}>
											<Text style={Styles.n2grey9}> {item.name}</Text>
										</TouchableOpacity>
								}
							</View>
						)
					})
				}
			</View>
		)
	}
}



class Radio extends Component {
	constructor(props) {
		super(props)
		this.state = {
			choose: 0
		}
	}
	render() {
		const { list, t } = this.props
		return (
			<View style={{ paddingTop: 20, padding: 18 }}>
				<Text style={Styles.n2grey9}>{t}</Text>
				<View style={[{ paddingTop: 20 }, Styles.startcenter]}>
					{
						list.map((item, index) => {
							return (
								<Button t={item} w={70} h={30} mgr={20}
									bgc={this.state.choose === index ? '#ffefef' : Colors.line}
									bc={this.state.choose === index ? '#ffefef' : Colors.line}
									fontStyle={this.state.choose === index ? Styles.n1theme : Styles.n1}
									onPress={() => { this.setState({ choose: index }) }}
								/>
							)
						})
					}
				</View>
			</View>
		)
	}
}

class Radio1 extends Component {
	constructor(props) {
		super(props)
		this.state = {
			choose: 0
		}
	}
	render() {
		const { list } = this.props
		return (
			<View style={[{}, Styles.startcenter]}>
				{
					list.map((item, index) => {
						return (
							<TouchableOpacity style={[{ marginRight: 20 }, Styles.startcenter]}
								onPress={() => { this.setState({ choose: index }) }}
							>
								{this.state.choose === index ? <ChooseTrue /> : <ChooseFalse />}
								<View style={[{}, Styles.startcenter]}>
									<Text>  {item.text} </Text>
									{item.image ? <Yuan image={item.image} w={15} /> : null}
								</View>
							</TouchableOpacity>
						)
					})
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	TextInputBox1: {
		borderBottomWidth: Metrics.one,
		borderBottomColor: Colors.line,
		justifyContent: 'center'
		// flexDirection: 'row',
		// justifyContent: 'flex-start',
		// paddingTop: 15,
		// paddingBottom: 15,
		// alignItems: 'center',
		// height: 53
	},
	chooseOn: {
		backgroundColor: Colors.theme,
		paddingTop: 7,
		paddingBottom: 7,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 15,
		marginBottom: 10,
	},
	chooseOff: {
		backgroundColor: Colors.greyf8,
		paddingTop: 7,
		paddingBottom: 7,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 15,
		marginBottom: 10,
	},
})

export {
	TextBox, Choose, Select, GreenTip,
	ChooseTrue, ChooseFalse, Lead, Textarea,
	Lable, Radio, Radio1, Input
}