import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
//npm
import Icon from 'react-native-vector-icons/Ionicons'
import TabNavigator from 'react-native-tab-navigator'
import ImagePicker from 'react-native-image-picker'
import StarRating from 'react-native-star-rating'
//data theme
import { Styles, Metrics, Colors, Fonts, Images } from '../themes'
import { Button, Yuan, Line } from './All'
import dpi from '../themes/dpi.js'
//components
//containers
const commentList = [
	{
		logo: 'http://cdnq.duitang.com/uploads/item/201504/15/20150415H0546_YGatC.thumb.224_0.jpeg',
		company: '星巴克',
		time: '12分钟之前',
		content: '吃苦耐劳，积极向上！有责任心！吃苦耐劳，积极向上！有责任心！吃苦耐劳，积极向上！有责任心！吃苦耐劳，积极向上！有责任心！吃苦耐劳，积极向上！有责任心！',
		lable: ['工作认真', '工作认真', '工作认真'],
		star: 3.0,
	},
	{
		logo: 'http://cdnq.duitang.com/uploads/item/201504/15/20150415H0546_YGatC.thumb.224_0.jpeg',
		company: '麦当劳',
		time: '2017-09-08',
		content: '吃苦耐劳，积极向上！有责任心！吃苦耐劳，积极向上！有责任心！吃苦耐劳，积极向上！有责任心！吃苦耐劳，积极向上！有责任心！吃苦耐劳，积极向上！有责任心！',
		lable: ['工作认真', '工作认真', '工作认真'],
		star: 5.0,
	},
]

// class Comment extends Component {
// 	render() {
// 		const list = commentList
// 		// const list = this.props.list
// 		return (
// 			<View>
// 				{
// 					list.map(item => {
// 						const { logo, company, time, content, lable, star } = item
// 						return (
// 							<View style={[{ padding: 18, flexDirection: 'row' }]}>
// 								<Yuan image={logo} w={24} />
// 								<View style={{ flex: 1, marginLeft: 10, marginTop: 6 }}>
// 									<View style={Styles.between}>
// 										<Text style={Styles.n2grey9}>{company}</Text>
// 										<Text style={Styles.n2grey9}>{time}</Text>
// 									</View>
// 									{/*评价内容*/}
// 									<Text style={{ paddingTop: 15, paddingBottom: 15, lineHeight: 17 }}>{content}</Text>
// 									{/*评价标签*/}
// 									<View style={{ flexDirection: 'row' }}>
// 										{
// 											lable.map(item => {
// 												return (
// 													<Text style={styles.lable}>{item}</Text>
// 												)
// 											})
// 										}
// 									</View>
// 									{/*评价星星*/}
// 									<View style={Styles.startcenter}>
// 										<StarRating
// 											disabled={false}
// 											emptyStar={'ios-star-outline'}
// 											fullStar={'ios-star'}
// 											halfStar={'ios-star-half'}
// 											iconSet={'Ionicons'}
// 											maxStars={5}
// 											starStyle={{ marginRight: 5 }}
// 											rating={star}
// 											starColor={'#FFCC33'}
// 											starSize={20}
// 										/>
// 										<Text style={Styles.n1}> {star}.0 分</Text>
// 									</View>
// 								</View>
// 							</View>
// 						)
// 					})
// 				}
// 			</View>
// 		)
// 	}
// }

class Comment extends Component {
	render() {
		const { logo, company, time, content, lable, star } = this.props
		return (
			<View style={[{ padding: 18 }]}>
				<View style={[Styles.between, {}]}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Yuan image={{ uri: logo }} w={24} mgr={10} />
						<Text style={Styles.n2grey9} allowFontScaling={false}>{company}</Text>
					</View>
					<Text style={Styles.n2grey9} allowFontScaling={false}>{time}</Text>
				</View>
				<View>

					{/*评价内容*/}
					{
						content ?
							<Text style={[{ paddingTop: 15, lineHeight: 17, paddingLeft: 34 }, Styles.n1grey3]} allowFontScaling={false}>{content}</Text>
							:
							null
					}
					{/*评价标签*/}
					{
						lable.length ?
							<View style={{ flexDirection: 'row', paddingLeft: 34, marginTop: 15, flexWrap: 'wrap' }}>
								{
									lable.map(item => {
										return (
											<Text style={styles.lable} allowFontScaling={false}>{item.content}</Text>
										)
									})
								}
							</View>
							:
							null
					}
					{/*评价星星*/}
					<View style={[Styles.startcenter, { paddingLeft: 34, marginTop: 5 }]}>
						<StarRating
							disabled={false}
							emptyStar={'ios-star-outline'}
							fullStar={'ios-star'}
							halfStar={'ios-star-half'}
							iconSet={'Ionicons'}
							maxStars={5}
							starStyle={{ marginRight: 5 }}
							rating={star}
							starColor={'#FFCC33'}
							starSize={20}
						/>
						<Text style={Styles.n1} allowFontScaling={false}> {star}.0 分</Text>
					</View>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	lable: {
		padding: 8,
		marginRight: 8,
		marginBottom: 8,
		backgroundColor: Colors.line,
		borderRadius: 5,
		fontSize: dpi.font(12),
		color: Colors.grey9
	}
})
export default Comment;