
import React, { Component } from 'react';

import { StyleSheet, View, TouchableOpacity, Text, PixelRatio } from 'react-native';
import { Styles, Metrics, Colors, Fonts, Images } from '../themes'

//import Icon from 'react-native-vector-icons/Ionicons';

const one = 1 / PixelRatio.get()

class TabBar extends Component {

	propTypes = {
		goToPage: React.PropTypes.func, // 跳转到对应tab的方法
		activeTab: React.PropTypes.number, // 当前被选中的tab下标
		tabs: React.PropTypes.array, // 所有tabs集合
		tabNames: React.PropTypes.array, // 保存Tab名称

	}
	static defaultProps = {
		width: Metrics.CW / 4,
		titleOn: Styles.n1, //文字颜色
		titleOff: Styles.n1grey9,
		type: 'underline',
		// tabTitleActive: {
		// 	width: Metrics.CW / 4,
		// 	height: 38,
		// 	backgroundColor: Colors.white,
		// 	justifyContent: 'center',
		// 	flexDirection: 'row',
		// 	alignItems: 'center',
		// 	position: 'relative'
		// },
	}
	setAnimationValue({ value }) {
	}

	componentDidMount() {
		// Animated.Value监听范围 [0, tab数量-1]
		this.props.scrollValue.addListener(this.setAnimationValue);
	}

	render() {
		const { titleOff, width, titleOn, type } = this.props
		console.log('this.props:%o', this.props)
		return (
			<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
				{
					this.props.tabs.map((element, index) => {
						console.log('这么慢是为何呀')
						return (
							<TouchableOpacity onPress={() => this.props.goToPage(index)}>
								<View style={{
									width: width,
									height: 38,
									backgroundColor: Colors.white,
									justifyContent: 'center',
									flexDirection: 'row',
									alignItems: 'center',
									position: 'relative'
								}}>
									<Text style={this.props.activeTab == index ? titleOn : titleOff} allowFontScaling={false}>
										{element}
									</Text>
									{
										type === 'underline' ?
											<View style={{
												position: 'absolute', bottom: 0, width: width, height: this.props.activeTab == index ? 2 : one,
												backgroundColor: this.props.activeTab == index ? Colors.theme : Colors.line
											}} />
											: null
									}
								</View>
							</TouchableOpacity>
						)
					})
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	tab: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	tabItem: {
		flexDirection: 'column',
		alignItems: 'center',
	},

});


export default TabBar;