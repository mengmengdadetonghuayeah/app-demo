//react react-native
import React, { Component } from 'react';
import { View, Text, Image, Platform, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, ListView, ScrollView } from 'react-native';
//npm install components
import Icon from 'react-native-vector-icons/Ionicons'
import _ from 'lodash'
//data  themes
import { Styles, Metrics, Colors, Images } from '../themes'
import { dayList, messageDetailList } from '../data'
//components
import { Button, Line, NoDate, Yuan, Yuans } from './All'
//containers
import MessageDetail from '../containers/message/MessageDetail'
import CompanyNews from '../containers/message/CompanyNews'
import jobDetail from '../containers/all/jobDetail'

import { filterType, cert } from '../common/filterCategoty.js'
import { transform, showTime, minute, transformTime } from '../common/transformTime.js'
import dpi from '../themes/dpi.js'


class Approvel extends Component {
	render() {
		const { text, color } = this.props
		return (
			<View>
				<View style={{
					width: 30,
					height: 9,
					backgroundColor: color,
					marginLeft: 9
				}}>
				</View>
				<View
					style={{
						width: 77,
						height: 19,
						marginTop: -9,
						borderColor: color,
						// borderColor: '#7ED321',
						// borderWidth: Metrics.one,
						borderRadius: 15,
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'row',
						// backgroundColor: '#7ED321',
						// borderTopColor: '#7ED321',
						// borderTopWidth: 10,
						position: 'relative'
					}}>
					<Yuan
						w={19}
						bgc={color}
						icon={'ios-beer'}
						ic={'white'}
						size={13}
					/>
					<View
						style={{
							width: 63,
							height: 19,
							borderColor: '#7ED321',
							borderWidth: Metrics.one,
							borderRadius: 15,
							backgroundColor: 'white',
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center'
						}}>
						<Image source={Images.refresh}
							style={{ width: 10, height: 10 }} />
						<Text style={{ fontSize: dpi.font(10), color: color }} allowFontScaling={false}> {text}</Text>
					</View>
				</View>
			</View>
		)
	}
}

class Improve extends Component {
	render() {
		const { text, color, source } = this.props
		return (
			<View
				style={{
					width: 68,
					height: 18,
					borderColor: color,
					borderWidth: Metrics.one,
					borderRadius: 10,
					backgroundColor: 'white',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<Image source={source}
					style={{ width: 10, height: 10 }} />
				<Text style={{ fontSize: dpi.font(10), color: color }} allowFontScaling={false}> {text}</Text>
			</View>
		)
	}
}

class JobList extends Component {
	constructor(props) {
		super(props)
		const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
		this.state = { dataSource: ds.cloneWithRows([]) }
	}
	componentWillMount() {
		console.log('随即推荐数组渲染页面了吗')
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(this.props.source)
		})
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(this.props.source)
		})
	}

	renderRow = (rowData, sectionID, rowID) => {
		let filter = filterType(rowData)
		// let enrollNumber = rowData.enters.filter(item => {
		// 	return item.status === true
		// })
		return (
			this.props.source.length ?
				<TouchableWithoutFeedback onPress={() => this.props.navigator.push({ component: jobDetail })}>
					<View style={{ width: Metrics.CW, padding: 18 }}>
						<View style={[{ flexDirection: 'row', justifyContent: 'flex-start' },]}>
							{/*店家logo*/}
							<View style={{ width: 75, marginRight: 15, justifyContent: 'space-between', }}>
								<Image source={{ uri: rowData.owner.avatar }} style={{ width: 75, height: 75, borderRadius: 8 }} />
								{/*认证*/}
								<Approvel />
							</View>
							{/*职位名、地点、时期、工资、单位*/}
							<View style={{ width: Metrics.CW - (18 + 18 + 75 + 15) }}>
								<Text numberOfLines={1} style={Styles.t1b} allowFontScaling={false}>[{filter.categoryTitle}] {rowData.title}</Text>
								{/*地点、时期、发布时间*/}
								<View style={[{ marginTop: 10 }, Styles.between]}>
									<Text style={Styles.n2grey9} allowFontScaling={false}><Icon name={'ios-pin-outline'} color={Colors.greyc} /> 城区/2km   <Icon name={'md-time'} color={Colors.greyc} /> {rowData.is_long ? '长期' : '短期'}</Text>
									<Text style={Styles.n2grey9} allowFontScaling={false}>{showTime(rowData.publish_time)}</Text>
								</View>
								{/*工资、报名人数*/}
								<View style={[{ marginTop: 10, }, Styles.between]}>
									<Text style={Styles.inputtheme} allowFontScaling={false}>{rowData.pay}<Text style={Styles.n2} allowFontScaling={false}>{filter.salaryType}|{filter.pay}</Text></Text>
									<Text style={{ fontSize: 12, color: '#01B38B' }} allowFontScaling={false}>{rowData.enter}<Text style={Styles.n2grey9} allowFontScaling={false}>人已报名</Text></Text>
								</View>
								{/*单位、职位数*/}
								<View style={[{ marginTop: 10, }, Styles.between]}>
									<Text style={Styles.t1grey9} allowFontScaling={false}></Text>
									<Text style={Styles.n2grey9} allowFontScaling={false}>职位：<Text style={Styles.n2theme} allowFontScaling={false}>{rowData.count}</Text></Text>
								</View>
							</View>
						</View>
					</View>
				</TouchableWithoutFeedback>
				: <NoDate />
		)
	}
	render() {
		return (
			<View>
				{
					//是否显示数据量（number=true 用于搜索结果页）
					this.props.number ?
						<View>
							<Text style={[{ padding: 18 }, Styles.n1]} allowFontScaling={false}>共<Text style={Styles.n1theme} allowFontScaling={false}>{this.props.source.length}</Text>条数据</Text>
							<Line />
						</View>
						: null
				}
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderRow}
					initialListSize={100000}
				/>
			</View>
		);
	}
}

//消息列表
//显示的消息是最后一条消息 头像是反正不是自己的

class MessageList extends Component {
	constructor(props) {
		super(props)
		const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
		this.state = { dataSource: ds.cloneWithRows(this.props.source) }
	}
	renderRow = (rowData, sectionID, rowID) => {
		const { avatar, title, time, content } = rowData
		return (
			this.props.source.length ?
				<TouchableOpacity
					style={[{ padding: 18, borderBottomWidth: 1, borderBottomColor: Colors.line, flexDirection: 'row' }]}
					onPress={() => {
						title === '通讯消息' ?
							this.props.navigator.push({
								component: CompanyNews,
								params: {
									type: rowData.type,
									list: rowData.detali
								}
							})
							:
							this.props.navigator.push({
								component: MessageDetail,
								params: {
									type: rowData.type,
									list: rowData.detail
								}
							})
					}}>
					<Yuan image={avatar} w={54} />
					<Yuan t={'1'} fontStyle={Styles.n2white} bgc={'#FF0D00'} w={16} mgl={-11} />
					<View style={[{ marginLeft: 15, width: Metrics.CW - 18 - 18 - 15 - 54, height: 45, justifyContent: 'space-between', },]}>
						<View style={Styles.between}>
							<Text style={Styles.t1b}>{title}</Text>
							<Text style={Styles.n2grey9}>{time}</Text>
						</View>
						<Text style={Styles.n1grey9} numberOfLines={1}>{content}</Text>
					</View>
				</TouchableOpacity>
				: <NoDate />
		)
	}
	render() {
		return (
			<ListView
				dataSource={this.state.dataSource}
				renderRow={this.renderRow}
				initialListSize={100000}
			/>
		)
	}
}




const fontWidth = (Metrics.CW - 43) / 8


class Signup extends Component {

	constructor(props) {
		super(props)
	}
	render() {
		const { cover, jobType, title, children, signcount, publishtime, signtime, zone, viewcount, time, price, people, long, salaryType, onPress } = this.props
		console.log('时间', onPress)
		return (
			<TouchableWithoutFeedback onPress={onPress}>
				<View>
					<View style={[{ padding: 18, flexDirection: 'row', justifyContent: 'flex-start', },]}>
						{/*店家logo和认证*/}
						<View style={{ width: 75, marginRight: 15, justifyContent: 'space-between', }}>
							<Image source={{ uri: cover }} style={{ width: 75, height: 75, borderRadius: 8 }} />
						</View>
						<View style={{ width: Metrics.CW - (18 + 18 + 75 + 15) }}>
							{/*职位名*/}
							<Text numberOfLines={1} style={Styles.t1b} allowFontScaling={false}>[{jobType}] {title}</Text>
							{/*地点、时期、发布时间*/}
							{
								this.props.hire ?
									<Text style={[{ paddingTop: 10, }, Styles.n2grey9]} allowFontScaling={false} numberOfLines={1}>{zone}   {publishtime}</Text>
									:
									this.props.duty ?
										<Text style={[{ paddingTop: 10 }, Styles.n2grey9]} allowFontScaling={false}>{zone}   {publishtime}</Text>
										:
										<View style={[{ marginTop: 10 }, Styles.between]}>
											<View style={{ flexDirection: 'row' }}>
												<View style={{ flexDirection: 'row', alignItems: 'center' }}>
													<Icon name={'ios-pin-outline'} color={Colors.greyc} style={{ marginRight: 2 }} />
													<Text style={Styles.n2grey9} allowFontScaling={false}>
														{zone}
													</Text>
												</View>
												<View style={{ flexDirection: 'row', marginLeft: 5, alignItems: 'center' }}>
													<Icon name={'md-time'} color={Colors.greyc} style={{ marginRight: 2 }} />
													<Text style={Styles.n2grey9} allowFontScaling={false}>
														{long ? '长期' : '短期'}
													</Text>
												</View>
											</View>
											<Text style={Styles.n2grey9} allowFontScaling={false}>{time}</Text>
										</View>
							}
							{/*浏览数、报名人数*/}
							{
								this.props.duty ?
									<View style={[{ marginTop: 10, }, Styles.between]}>
										<Text style={Styles.n2grey9} allowFontScaling={false}>最近签到： {signtime}</Text>
										<View style={{ flexDirection: 'row', alignItems: 'center' }}>
											<Text style={Styles.n2grey9} allowFontScaling={false}>签到</Text>
											<Text style={{ fontSize: dpi.font(12), color: '#01B38B' }} allowFontScaling={false}>{signcount}</Text>
											<Text style={Styles.n2grey9} allowFontScaling={false}>次</Text>
										</View>
									</View>
									:
									this.props.hire ?
										<View style={[{ marginTop: 10, }, Styles.between]}>
											<Text style={Styles.n2grey9} allowFontScaling={false}>录用日期： {signtime}</Text>
										</View>
										:
										<View style={[{ marginTop: 10, }, Styles.between]}>
											<Text style={Styles.n2grey9} allowFontScaling={false}>{viewcount}人浏览</Text>
											<View style={{ flexDirection: 'row', alignItems: 'center' }}>
												<Text style={{ fontSize: dpi.font(12), color: '#01B38B', marginRight: 3 }} allowFontScaling={false}>{people}</Text>
												<Text style={Styles.n2grey9} allowFontScaling={false}>人已报名</Text>
											</View>
										</View>
							}
						</View>
					</View>
					<View style={{ padding: 18, paddingTop: 0 }}>
						<View style={[{ flexDirection: 'row', alignItems: 'center', },]}>
							<View style={{ flexDirection: 'row', alignItems: 'center', width: 75, marginRight: 15, flexWrap: 'wrap' }}>
								<Text style={Styles.inputtheme} allowFontScaling={false}>{price}</Text>
								<Text style={Styles.n2} allowFontScaling={false} >元/{salaryType}</Text>
							</View>
							<View style={{ width: Metrics.CW - (18 + 18 + 75 + 15) }}>
								{
									children
								}
							</View>
						</View>
					</View>
					<Line h={3} />
					{
						this.props.consult ?
							<ScrollView >
								{
									this.props.consult.reverse().map((rowData, index) => {
										return (
											<View style={[{ paddingTop: 18, paddingBottom: index === this.props.consult.length - 1 ? 18 : 0, paddingLeft: 18, paddingRight: 18, flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: '#fff' }]}>
												<Yuan image={{ uri: rowData.user.avatar }} w={24} />
												<View style={{ flex: 1, marginLeft: 10, marginTop: 6, }}>
													<View style={[Styles.between, {}]}>
														<Text style={Styles.n2grey9} allowFontScaling={false}>{rowData.user.nickname}</Text>
														<Text style={Styles.n2grey9} allowFontScaling={false}>{showTime(rowData.time)}</Text>
													</View>
													<Text style={{ paddingTop: 15, paddingBottom: 15, lineHeight: 17 }} allowFontScaling={false}>{rowData.question}</Text>
													<View style={Styles.between}>
														{
															rowData.answer ?
																<View style={{ flexDirection: 'row', alignItems: 'center' }}>
																	<Text style={Styles.n1grey3}>回复：</Text>
																	<View style={{ backgroundColor: '#f8f8f8', padding: 11, borderRadius: 4 }}>
																		<Text style={Styles.n1green}>{rowData.answer}</Text>
																	</View>
																</View>
																:
																null
														}
													</View>
												</View>
											</View>
										)
									})
								}
								<Line h={3} />
							</ScrollView>
							:
							null
					}
				</View>
			</TouchableWithoutFeedback>
		);
	}
}


class Settle extends Component {
	constructor(props) {
		super(props)
		this.state = {
			active: -1
		}
	}
	render() {
		console.log('奖金', this.props.salaryRecords)

		const { cover, lable, jobType, active, children, title, zone, long, time, price, type, people, company, jobs, collapse, settleCount, salaryRecords, onPress } = this.props
		return (
			<TouchableWithoutFeedback onPress={onPress}>
				<View>
					<View style={[{ padding: 18, flexDirection: 'row', justifyContent: 'flex-start' },]}>
						{/*店家logo和认证*/}
						<View style={{ width: 75, marginRight: 15, justifyContent: 'space-between', }}>
							<Image source={{ uri: cover }} style={{ width: 75, height: 75, borderRadius: 8 }} />
						</View>

						<View style={{ width: Metrics.CW - (18 + 18 + 75 + 15) }}>
							{/*职位名*/}
							<Text numberOfLines={1} style={Styles.t1b} allowFontScaling={false}>[{jobType}] {title}</Text>
							{/*地点、时期、发布时间*/}

							<Text style={[{ paddingTop: 10 }, Styles.n2grey9]} allowFontScaling={false}>{zone} | {long ? ' 长期' : ' 短期'}</Text>

							{/*浏览数、报名人数*/}

							<View style={[{ marginTop: 10 }, Styles.between]}>
								<Text style={Styles.n2grey9} allowFontScaling={false}>结算次数： {settleCount}</Text>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<Text style={Styles.n2} allowFontScaling={false}>共结算</Text>
									<Text style={Styles.inputthemeb} allowFontScaling={false}> ¥{price}</Text>
								</View>
							</View>

						</View>
					</View>
					<View style={{ padding: 18, paddingTop: 0 }}>
						<View style={[{ flexDirection: 'row', alignItems: 'center', },]}>
							<View style={{ flexDirection: 'row', alignItems: 'center', width: 75, marginRight: 15, flexWrap: 'wrap' }}>
								{
									active ?
										<TouchableOpacity onPress={collapse}>
											<Text style={{ fontSize: dpi.font(12), color: Colors.green }} allowFontScaling={false}>收起记录</Text>
										</TouchableOpacity>
										:
										<TouchableOpacity onPress={collapse}>
											<Text style={{ fontSize: dpi.font(12), color: Colors.green }} allowFontScaling={false}>查看记录</Text>
										</TouchableOpacity>
								}
							</View>
							<View style={{ width: Metrics.CW - (18 + 18 + 75 + 15) }}>
								{
									children
								}
							</View>
						</View>
					</View>
					<Line h={3} />
					{
						active ? /*判断是否点击了结算记录*/
							<View>
								{
									salaryRecords.map(item => {
										console.log('element:%o', item)
										return (
											<View>
												<View style={[{ padding: 18, position: 'relative', zIndex: 1 }, Styles.between]}>
													<View>
														<Text allowFontScaling={false} style={[{ paddingBottom: 5 }, Styles.n2grey9]}>
															{item.type === 1 ? '现金结算' : '线上支付'}
														</Text>
														<Text allowFontScaling={false} style={Styles.n2grey9}>
															{`${transformTime(item.time, 'salary')}`}      {`${minute(item.time)}`}
														</Text>
													</View>
													<View style={{ flexDirection: 'row', alignItems: 'center' }}>
														<Text allowFontScaling={false} style={Styles.t1themeb}>+{item.salary.toFixed(2)}</Text>
														{
															item.description ?
																<TouchableWithoutFeedback
																	onPress={() => {
																		if (this.state.active === item.id) {
																			this.setState({ active: -1 })
																			return
																		}
																		this.setState({ active: item.id, })
																	}}>
																	<View>
																		<Text style={Styles.n2theme} allowFontScaling={false}>  结算说明</Text>
																	</View>
																</TouchableWithoutFeedback>
																:
																null
														}
													</View>
												</View>

												{/*结算说明*/}
												{
													this.state.active == item.id ?
														<View style={{ width: Metrics.CW, backgroundColor: Colors.line, padding: 16, position: 'relative' }}>
															<View style={styles.uptriAngle}></View>
															<Text style={Styles.n2theme} allowFontScaling={false}>{item.description}</Text>
														</View>
														:
														null
												}
												<Line />
											</View>
										)
									})
								}
							</View>
							:
							null
					}
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

class Job extends Component {
	constructor(props) {
		super(props)

	}
	static defaultProps = {
		isOutDate: false
	}
	render() {
		const { cover, jobType, isOutDate, certCategory, long, title, publishtime, onPress, location, pay, people, type, salary, salaryType, company, count, navigator } = this.props
		return (
			<TouchableWithoutFeedback onPress={onPress}>
				<View style={{ width: Metrics.CW, padding: 18 }}>
					<View style={[{ flexDirection: 'row', justifyContent: 'flex-start' },]}>
						{/*店家logo和认证*/}
						<View style={{ width: 75, marginRight: 15, justifyContent: 'space-between', }}>
							<Image source={{ uri: cover }} style={{ width: 75, height: 75, borderRadius: 8 }} />
							<Approvel
								text={certCategory === 1 ? 'VIP企业' : certCategory === 2 ? '认证企业' : '认证个人'}
								color={certCategory === 1 ? '#A263F9' : certCategory === 2 ? '#7ED321' : '#01B38B'}
							/>
							{/*<Image source={{ uri:label  }} style={{ width: 75, height: 18, borderRadius: 8, borderWidth: 1, borderColor: '#01B38B' }} />*/}
						</View>
						{/*职位名、地点、时期、工资、单位*/}
						<View style={{ width: Metrics.CW - (18 + 18 + 75 + 15) }}>
							<Text numberOfLines={1} allowFontScaling={false} style={isOutDate ? Styles.t1grey9b : Styles.t1b}>[{jobType}] {title}</Text>
							{/*地点、时期、发布时间*/}
							<View style={[{ marginTop: 10 }, Styles.between]}>
								<Text style={Styles.n2grey9} allowFontScaling={false}><Icon name={'ios-pin-outline'} color={Colors.greyc} /> {location}  <Icon name={'md-time'} color={Colors.greyc} /> {long ? '长期' : '短期'}</Text>
								<Text style={Styles.n2grey9} allowFontScaling={false}>{showTime(publishtime)}</Text>
							</View>
							{/*工资、报名人数*/}
							<View style={[{ marginTop: 10, }, Styles.between]}>
								<Text style={isOutDate ? Styles.inputgrey9 : Styles.inputtheme} allowFontScaling={false}>{salary}<Text style={isOutDate ? Styles.n2grey9 : Styles.n2} allowFontScaling={false}>元/{salaryType} | {type}</Text></Text>
								<Text style={{ fontSize: dpi.font(12), color: isOutDate ? Colors.grey9 : '#01B38B' }} allowFontScaling={false}>{people}<Text style={Styles.n2grey9} allowFontScaling={false}>人已报名</Text></Text>
							</View>
							{/*单位、职位数*/}
							<View style={[{ marginTop: 10, }, Styles.between]}>

								<Text numberOfLines={1} style={[Styles.t1grey9, { maxWidth: Metrics.CW - 180, }]}>{company}</Text>
								<Text style={Styles.n2grey9} allowFontScaling={false}>职位：<Text style={isOutDate ? Styles.n2grey9 : Styles.n2theme} allowFontScaling={false}>{count}</Text></Text>
							</View>
						</View>
					</View>
					{
						isOutDate ?
							<View style={[{ position: 'absolute', width: Metrics.CW, height: '100%' }, Styles.center]}>
								<Image source={Images.outdate} />
							</View>
							:
							null
					}
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

class JobRow extends Component {
	constructor(props) {
		super(props)

	}
	static defaultProps = {
		isOutDate: false
	}
	render() {
		const { cover, jobType, isOutDate, certCategory, long, title, publishtime, onPress, location, pay, people, see, type, salary, salaryType, company, count, navigator, tags, backgroundColor } = this.props
		return (
			<TouchableWithoutFeedback onPress={onPress}>
				<View style={{ width: Metrics.CW, paddingHorizontal: 18, paddingTop: 18, paddingBottom: 10 }}>
					<View style={[{ flexDirection: 'row' },]}>
						{/*店家logo和认证*/}
						<View style={{ marginRight: 15, }}>
							<View style={[{
								width: 68,
								height: (Platform.OS === 'ios') ? 48 : 50,
								backgroundColor: backgroundColor,
								borderRadius: 6,
								marginBottom: 6
							},
							Styles.rowcenter]} >
								<Text style={Styles.t2whiteb} allowFontScaling={false}>{tags}</Text>
							</View>
							<Improve
								source={certCategory === 1 ? Images.improve1 : certCategory === 2 ? Images.improve2 : certCategory === 3 ? Images.improve3 : Images.improve4}
								text={certCategory === 1 ? 'VIP企业' : certCategory === 2 ? '认证企业' : certCategory === 3 ? '认证个人' : '一般雇主'}
								color={certCategory === 1 ? '#A263F9' : certCategory === 2 ? '#33CFC9' : certCategory === 3 ? '#0099FF' : '#999'}
							/>
						</View>
						{/*职位名、地点、时期、工资、单位*/}
						<View style={{ flex: 1, justifyContent: 'space-between' }}>
							<Text numberOfLines={1} style={[{ marginLeft: -8 }, isOutDate ? Styles.t2grey9b : Styles.t2b]} allowFontScaling={false}>【{jobType}】{title}</Text>
							{/*地点、时期、发布时间*/}
							<View style={[Styles.between]}>
								<Text numberOfLines={1} style={[Styles.n2grey9, { width: '70%' }]} allowFontScaling={false}>
									{/* <Icon name={'ios-pin'} color={Colors.greyc} size={14} />  */}
									{location}    {long}
									{/* <Icon name={'md-time'} color={Colors.greyc} size={14}  /> */}
								</Text>
								<Text numberOfLines={1} style={[Styles.n2grey9, { width: '30%', textAlign: 'right' }]} allowFontScaling={false}>{publishtime}</Text>
							</View>
							{/*工资、报名人数*/}
							<View style={[Styles.between,]}>
								<View style={{ flex: 1, height: '100%', flexDirection: 'row', alignItems: 'center', maxWidth: '50%' }}  >
									<Text style={[isOutDate ? Styles.inputgrey9 : Styles.t1theme, { textAlignVertical: 'center' }]} allowFontScaling={false}>{salary}</Text>
									<Text style={[isOutDate ? Styles.n2grey9 : Styles.n2, { textAlignVertical: 'center' }]} allowFontScaling={false}>元/{salaryType} | {type}</Text>
								</View>
								<View style={[{ flex: 1, height: '100%', flexDirection: 'row', alignItems: 'center', }, Styles.between]}  >
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<Text style={Styles.n2grey9} allowFontScaling={false}>报名</Text>
										<Text style={{ fontSize: dpi.font(12), marginLeft: 3, color: isOutDate ? Colors.grey9 : Colors.green }} allowFontScaling={false}>
											{people}
										</Text>
									</View>
									<View style={{ flexDirection: 'row', height: '100%', alignItems: 'center' }}>
										<Text style={Styles.n2grey9} allowFontScaling={false}>浏览</Text>
										<Text style={{ fontSize: dpi.font(12), marginLeft: 3, color: isOutDate ? Colors.grey9 : Colors.green }} allowFontScaling={false}>
											{see}
										</Text>
									</View>
								</View>
							</View>
						</View>
					</View>
					{
						isOutDate ?
							<View style={[{ position: 'absolute', width: Metrics.CW, height: '100%' }, Styles.center]}>
								<Image source={Images.outdate} />
							</View>
							:
							null
					}
				</View>
			</TouchableWithoutFeedback>
		);
	}
}



class MessageStyle extends Component {
	static defaultProps = {
		number: 0,
		bc: Colors.white,
		onlineImg: false
	}
	render() {
		const { onPress, avatar, onlineImg, title, time, content, number, isImg, bgc, imageStyle, onLongPress } = this.props
		return (
			<TouchableOpacity
				style={[{ padding: 18, position: 'relative', borderBottomWidth: Metrics.one, borderBottomColor: Colors.line, flexDirection: 'row' }]}
				onPress={onPress}
				delayLongPress={Platform.OS === 'ios' ? 500 : 1500}
				onLongPress={onLongPress}
			>
				{
					onlineImg ?
						<Yuan
							images={avatar}
							w={54}
							bgc={bgc}
							imageStyle={imageStyle}
						/>
						:
						<Yuans
							image={avatar}
							w={54}
							bgc={bgc}
							imageStyle={imageStyle}
						/>
				}
				{
					number === 0 ?
						null :
						<View style={[{ position: 'absolute', left: 58, top: 18, minWidth: 22, minHeight: 22, backgroundColor: '#FF0D00', borderRadius: 11 }, Styles.rowcenter]}>
							<Text style={Styles.n2white} allowFontScaling={false}>{number}</Text>
						</View>
				}
				<View style={[{ marginLeft: 14, flex: 1, justifyContent: 'space-around', },]}>
					<View style={Styles.between}>
						<Text style={Styles.t1b} allowFontScaling={false}>{title}</Text>
						<Text style={Styles.n2grey9} allowFontScaling={false}>{time}</Text>
					</View>
					{
						isImg ?
							<Text style={Styles.n1grey9} numberOfLines={1} allowFontScaling={false}>[ 图片 ]</Text>
							:
							<Text style={Styles.n1grey9} numberOfLines={1} allowFontScaling={false}>{content}</Text>
					}
				</View>
			</TouchableOpacity>
		);
	}
}



// <View>
// <Line />
// <View style={{ paddingHorizontal: 18 }}>
// 	<View style={{ height: 47, width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
// 		<View>
// 			<Text style={Styles.n2} allowFontScaling={false}>
// 				{`${transformTime(element.time, 'salary')}`}      {`${minute(element.time)}`}
// 			</Text>
// 		</View>
// 		<View style={{ flexDirection: 'row', alignItems: 'center' }}>

// 			<Text style={Styles.n2} allowFontScaling={false}>{element.type === 1 ? '现金结算' : '线上支付'} </Text>
// 			<Text style={Styles.inputthemeb} allowFontScaling={false}>+{element.salary.toFixed(2)}
// 			</Text>
// 		</View>
// 	</View>
// </View>
// {/*结算说明*/}
// {
// 	// this.state.active == item.id ?
// 	<View style={{ width: Metrics.CW, backgroundColor: Colors.line, padding: 16, position: 'relative' }}>
// 		<View style={styles.uptriAngle}></View>
// 		<Text style={Styles.n2theme} allowFontScaling={false}>因在工作中存在迟到早退现象，故工资减扣20元，望在往后工作中调整自己！</Text>
// 	</View>
// 	// :
// 	// null
// }

// </View>
let styles = StyleSheet.create({
	grid: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	uptriAngle: {
		position: 'absolute',
		right: 18,
		top: -10,

		width: 0,
		height: 0,
		borderLeftWidth: 10,
		borderLeftColor: 'transparent',

		borderRightWidth: 10,
		borderRightColor: 'transparent',
		borderTopWidth: 20,
		borderTopColor: 'white',
		// borderBottomWidth: 20,
		// borderBottomColor: 'white',
	},

	img: {
		width: 30,
		height: 22
	}
})

export { JobList, MessageList, Signup, Settle, Job, MessageStyle, Approvel, JobRow, Improve }

//选择标签 单选／多选
// class FilterList extends Component {
// 	constructor(props) {
// 		super(props)
// 		const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
// 		this.state = { dataSource: ds.cloneWithRows(this.props.source) }
// 		this.selected = []
// 	}

// 	renderRow = (rowData, sectionID, rowID) => {
// 		console.log('r render row')
// 		let hasSelected = false

// 		for (let i = 0; i < this.selected.length; i++) {
// 			if (this.selected[i].id === rowData.id) {
// 				hasSelected = true
// 				console.log('has selected')
// 				break
// 			}
// 		}
// 		return (
// 			<View style={{ width: (Metrics.CW - 36) / 4 }}>
// 				{
// 					hasSelected ?
// 						// rowData.hasSelected ?
// 						<Button t={rowData.name} w={70} h={30} mgb={18}
// 							bgc={'#ffefef'}
// 							bc={'#ffefef'}
// 							fontStyle={Styles.n1theme}
// 							onPress={() => {
// 								for (let i = 0; i < this.selected.length; i++) {
// 									if (this.selected[i].id === rowData.id) {
// 										this.selected.splice(i, 1)
// 										break
// 									}
// 								}
// 								let dsClone = _.cloneDeep(this.props.source)
// 								this.setState({
// 									dataSource: this.state.dataSource.cloneWithRows(dsClone)
// 								})
// 							}}
// 						/> :
// 						<Button t={rowData.name} w={70} h={30} mgb={18}
// 							bgc={Colors.line}
// 							bc={Colors.line}
// 							fontStyle={Styles.n1}
// 							onPress={() => {
// 								this.selected.push(rowData)
// 								let dsClone = _.cloneDeep(this.props.source)
// 								this.setState({
// 									dataSource: this.state.dataSource.cloneWithRows(dsClone)
// 								})
// 							}}
// 						/>
// 				}
// 			</View>
// 		)
// 	}
// 	render() {
// 		return (
// 			<View style={{ padding: 18, paddingBottom: 0 }}>
// 				<Text style={Styles.n2grey9}>{this.props.title}{'\n'}</Text>
// 				<ListView
// 					dataSource={this.state.dataSource}
// 					renderRow={this.renderRow.bind(this)}
// 					automaticallyAdjustContentInsets={false}
// 					contentContainerStyle={styles.grid}
// 					initialListSize={100000}
// 				/>
// 			</View>
// 		)
// 	}
// }





// class DataList extends Component {
// 	constructor(props) {
// 		super(props)
// 		const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
// 		this.state = { dataSource: ds.cloneWithRows(dayList), a: 12 }
// 	}

// 	renderRow = (rowData, sectionID, rowID) => {
// 		return (
// 			<TouchableOpacity
// 				style={[{ width: fontWidth, height: 54, backgroundColor: rowData.active === true ? Colors.theme : Colors.greyf8, marginTop: 1 }, Styles.center]}
// 				onPress={() => {
// 					// let tempory = _.cloneDeep(dayList)
// 					let tempory = dayList
// 					// tempory[rowID].active = true
// 					if (tempory[rowID].active = true) {
// 						tempory[rowID].active = ''
// 					} else {
// 						tempory[rowID].active = true
// 					}
// 					const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
// 					this.setState({ dataSource: ds.cloneWithRows(tempory) })
// 				}}
// 			>
// 				{
// 					rowData.active === true ?
// 						<Text style={{ width: 15, textAlign: 'center' }}>点我了</Text>
// 						:
// 						<Text style={{ width: 15, textAlign: 'center' }}>{rowData.active}</Text>
// 				}
// 			</TouchableOpacity>
// 		)
// 	}
// 	render() {
// 		return (
// 			<ListView
// 				dataSource={this.state.dataSource}
// 				renderRow={this.renderRow.bind(this)}
// 				automaticallyAdjustContentInsets={false}
// 				contentContainerStyle={styles.grid}
// 				initialListSize={100000}
// 			/>
// 		)
// 	}
// }





//已报名 已录用 hire 已到岗
// class SignUpList extends Component {
// 	constructor(props) {
// 		super(props)
// 		const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
// 		this.state = { dataSource: ds.cloneWithRows(this.props.source) }
// 	}
// 	renderRow = (rowData, sectionID, rowID) => {
// 		const { cover, lable, jobType, title, zone, distance, long, time, price, type, people, company, jobs } = rowData
// 		return (
// 			this.props.source.length ?
// 				<View>
// 					<View style={[{ padding: 18, flexDirection: 'row', justifyContent: 'flex-start' },]}>
// 						{/*店家logo和认证*/}
// 						<View style={{ width: 75, marginRight: 15, justifyContent: 'space-between', }}>
// 							<Image source={{ uri: cover }} style={{ width: 75, height: 75, borderRadius: 8 }} />
// 						</View>

// 						<View style={{ width: Metrics.CW - (18 + 18 + 75 + 15) }}>
// 							{/*职位名*/}
// 							<Text numberOfLines={1} style={Styles.t1b}>[{jobType}] {title}</Text>
// 							{/*地点、时期、发布时间*/}
// 							{
// 								this.props.hire ?
// 									<Text style={[{ paddingTop: 10 }, Styles.n2grey9]}>{zone}/2km   1月3日-1月9日</Text>
// 									:
// 									<View style={[{ marginTop: 10 }, Styles.between]}>
// 										<Text style={Styles.n2grey9}><Icon name={'ios-pin-outline'} color={Colors.greyc} /> {zone}   <Icon name={'md-time'} color={Colors.greyc} />{long}</Text>
// 										<Text style={Styles.n2grey9}>{time}</Text>
// 									</View>
// 							}
// 							{/*浏览数、报名人数*/}
// 							{
// 								this.props.hire ?
// 									<View style={[{ marginTop: 10, }, Styles.between]}>
// 										<Text style={Styles.n2grey9}>录用日期： 2017-07-09</Text>
// 										<Text style={Styles.n2grey9}>签到<Text style={{ fontSize: 12, color: '#01B38B' }}>2</Text>次</Text>
// 									</View>
// 									:
// 									<View style={[{ marginTop: 10, }, Styles.between]}>
// 										<Text style={Styles.n2grey9}>5人浏览</Text>
// 										<Text style={{ fontSize: 12, color: '#01B38B' }}>{people}<Text style={Styles.n2grey9}>人已报名</Text></Text>
// 									</View>
// 							}
// 						</View>
// 					</View>
// 					<View style={[{ padding: 18, paddingTop: 0 }, Styles.between]}>
// 						<Text style={Styles.inputtheme}>{price}<Text style={Styles.n2}>元/天</Text></Text>
// 						{
// 							this.props.hire ?
// 								<View style={Styles.startcenter}>
// 									<Button t='发消息' fontStyle={Styles.n2theme} mgr={5} />
// 									<Button t='放弃' fontStyle={Styles.n2theme} mgr={5} />
// 									<Button t='签到' fontStyle={Styles.n2theme} />
// 								</View>
// 								:
// 								<View style={Styles.startcenter}>
// 									<Button t='咨询' fontStyle={Styles.n2theme} mgr={5} />
// 									<Button t='取消报名' fontStyle={Styles.n2theme} />
// 								</View>
// 						}
// 					</View>
// 					<Line h={3} />
// 				</View>
// 				: <NoDate />
// 		)
// 	}
// 	render() {
// 		return (
// 			<View>
// 				<Line />
// 				<ListView
// 					dataSource={this.state.dataSource}
// 					renderRow={this.renderRow}
// 					initialListSize={100000}
// 				/>
// 			</View>
// 		);
// 	}
// }

//已结算


// class SettlementList extends Component {
// 	constructor(props) {
// 		super(props)
// 		const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
// 		this.state = { dataSource: ds.cloneWithRows(this.props.source) }
// 	}
// 	renderRow = (rowData, sectionID, rowID) => {
// 		const { cover, lable, jobType, title, zone, distance, long, time, price, type, people, company, jobs } = rowData
// 		return (
// 			this.props.source.length ?
// 				<View>
// 					<View style={[{ padding: 18, flexDirection: 'row', justifyContent: 'flex-start' },]}>
// 						{/*店家logo和认证*/}
// 						<View style={{ width: 75, marginRight: 15, justifyContent: 'space-between', }}>
// 							<Image source={{ uri: cover }} style={{ width: 75, height: 75, borderRadius: 8 }} />
// 						</View>

// 						<View style={{ width: Metrics.CW - (18 + 18 + 75 + 15) }}>
// 							{/*职位名*/}
// 							<Text numberOfLines={1} style={Styles.t1b}>[{jobType}] {title}</Text>
// 							{/*地点、时期、发布时间*/}

// 							<Text style={[{ paddingTop: 10 }, Styles.n2grey9]}>{zone}/2km | 1月3日-1月9日</Text>

// 							{/*浏览数、报名人数*/}

// 							<View style={[{ marginTop: 10, }, Styles.between]}>
// 								<Text style={Styles.n2grey9}>结算时间： 2017-07-09</Text>
// 								<Text style={{ fontSize: 12, color: Colors.green }}>现金结算</Text>
// 							</View>

// 						</View>
// 					</View>
// 					<View style={[{ padding: 18, paddingTop: 0 }, Styles.between]}>
// 						<Text style={Styles.inputtheme}>+¥{price}</Text>
// 						<View style={Styles.startcenter}>
// 							<Button t='评价雇主' fontStyle={Styles.n2theme} mgr={5} />
// 							<Button t='举报投诉' fontStyle={Styles.n2theme} mgr={5} />
// 						</View>
// 					</View>
// 					<Line h={3} />
// 				</View>
// 				: <NoDate />
// 		)
// 	}
// 	render() {
// 		return (
// 			<View>
// 				<Line />
// 				<ListView
// 					dataSource={this.state.dataSource}
// 					renderRow={this.renderRow}
// 					initialListSize={100000}
// 				/>
// 			</View>
// 		);
// 	}
// }