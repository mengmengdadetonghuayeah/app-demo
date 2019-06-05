
import React, { Component } from 'react';
import { View, Text, TextInput, Image, ListView, ScrollView, StyleSheet, TouchableOpacity, Platform, TouchableWithoutFeedback, RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import _ from 'lodash'

import { jobCategory, page, hotTags, cards, filter } from '../common/job'
import { filterType, cert } from '../common/filterCategoty.js'
import { showTime, transformTime } from '../common/transformTime.js'

import Navbar from './NavBar'
import { JobRow } from './List'
import { Line, Bar, NoDate, } from './All'

import { country } from '../data/country.js'
import { appCore } from '../service'
import { toastOnShow } from '../service/utils.js'
import { LoadingPage } from '../panza/Pages'
import jobDetail from '../containers/all/jobDetail.js'
import { Styles, Metrics, Colors } from '../themes'

//containers

import Filter from '../containers/all/Filter'

const distance = Platform.OS === 'ios' ? 104 : 88

const condition = [
	{ id: 1, name: '全部', text: 'none' },
	{ id: 2, name: '离我最近', text: 'distance' },
	{ id: 3, name: '最新发布', text: 'publish_time' },
	{ id: 4, name: '工资最高', text: 'pay' }
]

class JobList extends Component {
	constructor(props) {
		super(props)
		const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
		this.state = {
			dataSource: ds.cloneWithRows([]),
			isLoading: true,
			tags: [],
			visual: false,
			categoryName: '类型', //类型的名字
			countyName: '区域',//区域的名字
			sortName: '排序',//排序的名字
			category: [],
			sexLimit: 'none',
			period: 'none',
			show: 0,
			duration: 'none',
			isVip: false,
			time: undefined,
			code: undefined,
			err: undefined,
		}
		this.nextURL = null
		this.categoryId = undefined
		this.countyId = undefined //城区的id
		this.sort = 'none'  //排序

	}
	countryList = (cityCode) => {
		console.log('citycode', cityCode)
		let list = country.filter(item => {
			return item.code === parseInt(cityCode)
		})
		let all = [{ id: 1, name: '全部' }]
		let value = all.concat(list)
		console.log('所有区域:%o', list)
		this.setState({
			countryList: value
		})
	}
	componentWillMount() {
		this.fetchResources()
	}
	server = (err) => {
		this.setState({
			isLoading: false,
			err: err
		})
	}
	fetchResources = () => {
		let code = appCore.code ? appCore.code : appCore.locationCode ? appCore.locationCode : appCore.defaultCity.code
		jobCategory(this.props.category, code, this.server)
			.then(resp => {
				this.nextURL = resp.next
				hotTags(this.server)
					.then(tags => {
						cards(this.server)
							.then(category => {
								console.log('进入:%o', resp)
								let all = [{ name: '全部' }]
								let allCategory = all.concat(category.results)
								this.countryList(code)
								this.setState({
									err: undefined,
									category: allCategory,
									tags: tags.results,
									code: code,
									dataSource: this.state.dataSource.cloneWithRows(resp.results),
									isLoading: false,
								})
							})
					})
			})
	}
	renderRow = (rowData) => {
		console.log('rowdata', rowData)
		let filter = filterType(rowData)
		let tags = '其他'
		let color = '#FF6666'
		if (rowData.category_second) {
			this.state.tags.map(element => {
				if (element.name === rowData.category_second.name) {
					tags = element.name
					color = element.color
				}
			})
		}
		return (
			<JobRow
				cover={rowData.owner.avatar}
				jobType={filter.categoryTitle}
				title={rowData.title}
				see={rowData.page_view}
				publishtime={showTime(rowData.publish_time)}
				long={rowData.is_long ? '长期' : `${transformTime(rowData.start_date)}-${transformTime(rowData.end_date)}`}
				salaryType={filter.salaryType}
				salary={rowData.pay}
				location={rowData.county ? `${rowData.county.name}${rowData.distance}` : `${rowData.distance}`}
				//location={`${rowData.county.name}${rowData.distance}`}
				backgroundColor={color}
				tags={tags}
				people={rowData.enter}
				count={rowData.count}
				type={filter.pay}
				certCategory={cert(rowData)}
				company={rowData.owner.nickname}
				onPress={() => {
					this.props.navigator.push({
						component: jobDetail,
						params: {
							jobId: rowData.id,
							callback: (count, enter) => {
								rowData.page_view = count
								rowData.enter = enter
								let tmp = _.cloneDeep(this.state.dataSource._dataBlob.s1)
								this.setState({
									dataSource: this.state.dataSource.cloneWithRows(tmp),
								})
							}
						}
					}
					)
				}}
			/>
		)
	}
	submit = () => {
		this.setState({
			isLoading: true
		})
		let value =
			{
				'category': this.categoryId,
				'county': this.countyId,
				'sort': this.sort,
				// 'lat': appCore.latitude,
				// 'lon': appCore.longitude,
				'sex_limit': this.state.sexLimit,
				'work_duration': this.state.duration,
				'work_time': this.state.time,
				'work_period': this.state.period,
				'is_vip': this.state.isVip,
				'city': this.state.code,
				type: this.props.type
			}
		console.log('筛选项:%o', value)
		filter(value)
			.then(resp => {
				console.log('我开始筛选了', resp)
				this.nextURL = resp.next
				this.setState({
					isLoading: false,
					dataSource: this.state.dataSource.cloneWithRows(resp.results),
				})
			})
	}
	modal = () => {
		const list = this.state.list
		return (
			<TouchableWithoutFeedback onPress={() => this.setState({ visual: false })}>
				<View style={{
					position: 'absolute',
					top: distance,
					width: Metrics.CW,
					height: Metrics.CH - distance,
					backgroundColor: Colors.opacity3,
				}}
				>
					<View style={{
						width: Metrics.CW,
						backgroundColor: 'white',
						height: '100%'
					}}>
						<ScrollView>
							<View style={{ paddingVertical: 10, paddingHorizontal: 18, backgroundColor: Colors.line }}>
								<Text
									style={Styles.n1greyc}
									allowFontScaling={false}
								>{this.state.title}</Text>
							</View>
							{
								list.map(item => {
									return (
										<TouchableOpacity
											onPress={() => {
												// /*筛选类型函数*/
												if (this.state.show === 0) {
													this.categoryId = item.name === '全部' ? undefined : item.id
													this.setState({
														categoryName: item.name,
													})
												}
												// /* 筛选区域函数*/
												else if (this.state.show === 1) {
													this.countyId = item.name === '全部' ? undefined : item.id
													this.setState({
														countyName: item.name,
													})
												}
												// /* 筛选排序函数*/
												else if (this.state.show === 2) {
													this.sort = item.text
													this.setState({
														sortName: item.name,
													})
												}
												this.setState({
													visual: false
												})
												this.submit()
											}}
										>
											<Text
												style={[{ padding: 18 }, Styles.n1grey9]}
												allowFontScaling={false}
											>{item.name}
											</Text>
											<Line />
										</TouchableOpacity>
									)
								})
							}
						</ScrollView>
					</View>
				</View>
			</TouchableWithoutFeedback>
		)
	}
	render() {
		return (
			this.state.isLoading ?
				<LoadingPage />
				:
				this.state.err ?
					<View style={{ flex: 1, backgroundColor: '#fff' }}>
						<Navbar center={this.props.title} navigator={this.props.navigator} />
						<Line />
						<NoDate title={appCore.error} text='点击重新加载' onPress={() => { this.fetchResources() }} />
					</View>
					:
					<View style={{ flex: 1, backgroundColor: '#fff' }}>
						<Navbar center={this.props.title} navigator={this.props.navigator} />
						<Line />
						{/*类型*/}
						<View style={Styles.between}>
							<TouchableOpacity style={styles.screen}
								onPress={() => {
									console.log('我点击了类型按钮')
									this.setState({
										list: this.state.category,
										show: 0,
										title: '请选择类型',
										visual: true,
									})
								}}>
								{
									// <Text style={Styles.n2}>{appCore.category}  </Text>
								}
								<Text style={Styles.n2} allowFontScaling={false}>{this.state.categoryName}  </Text>
								<Icon name={'md-arrow-dropdown'} size={18} color={Colors.greyc} />
							</TouchableOpacity>
							<Bar h={25} />
							{/*区域*/}
							<TouchableOpacity
								style={styles.screen}
								onPress={() => {
									console.log('我点击了区域按钮')
									this.setState({
										list: this.state.countryList,
										title: '请选择区域',
										show: 1,
										visual: true,
									})
								}}
							>
								{
									// <Text style={Styles.n2}>{appCore.area}  </Text>
								}
								<Text style={Styles.n2} allowFontScaling={false}>{this.state.countyName}  </Text>
								<Icon name={'md-arrow-dropdown'} size={18} color={Colors.greyc} />
							</TouchableOpacity>
							<Bar h={25} />
							{/*排序*/}
							<TouchableOpacity style={styles.screen}
								onPress={() => {
									this.setState({
										list: condition,
										show: 2,
										title: '请选择排序',
										visual: true,
									})
								}}
							>
								<Text style={Styles.n2} allowFontScaling={false}>{this.state.sortName}  </Text>
								<Icon name={'md-arrow-dropdown'} size={18} color={Colors.greyc} />
							</TouchableOpacity>
							<Bar h={25} />
							{/*筛选*/}
							<TouchableOpacity
								style={styles.screen}
								onPress={() => {
									this.props.navigator.push({
										component: Filter,
										params: {
											type: 'filter',
											sexLimit: this.state.sexLimit,
											period: this.state.period,
											isVip: this.state.isVip,
											duration: this.state.duration,
											time: this.state.time,
											callback: (sexLimit, duration, period, isVip, time) => {
												this.setState({
													sexLimit: sexLimit,
													duration: duration,
													isVip: isVip,
													period: period,
													time: time
												}, () => {
													this.submit()
												})
											}
										}
									})
								}}
							>
								<Text style={Styles.n2} allowFontScaling={false}>筛选  </Text>
								<Icon name={'ios-funnel-outline'} size={10} color={Colors.grey6} />
							</TouchableOpacity>
						</View>
						<Line />
						{
							this.state.dataSource._dataBlob.s1.length ?
								<ListView
									dataSource={this.state.dataSource}
									renderRow={this.renderRow}
									initialListSize={100000}
									showsVerticalScrollIndicator={false}
									refreshControl={
										<RefreshControl
											onRefresh={() => { this.fetchResources() }}
											tintColor={Colors.grey9}
											title="下拉刷新"
											titleColor={Colors.grey9}
											refreshing={false}
										/>
									}
									onEndReached={() => {
										console.log('滚动了吗')
										this.fetching = true
										page(this.nextURL)
											.then(res => {
												this.nextURL = res.next
												let newData = this.state.dataSource._dataBlob.s1
												let pageData = this.state.dataSource._dataBlob.s1.concat(res.results)
												this.setState({
													dataSource: this.state.dataSource.cloneWithRows(pageData),
													//isLoading: false
												})
												this.fetching = false
											})
									}}
								/>
								:
								<NoDate />
						}

						{this.state.visual ? <this.modal /> : null}
					</View>
		);
	}
}
const styles = StyleSheet.create({
	screen: {
		width: Metrics.CW / 4,
		height: 40,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	}
})
// <ScrollView
// onMomentumScrollEnd={() => {
// 	this.fetching = true
// 	page(this.nextURL)
// 		.then(res => {
// 			this.nextURL = res.next
// 			let newData = this.state.dataSource._dataBlob.s1
// 			let pageData = this.state.dataSource._dataBlob.s1.concat(res.results)
// 			this.setState({
// 				dataSource: this.state.dataSource.cloneWithRows(pageData),
// 				//isLoading: false
// 			})
// 			this.fetching = false
// 		})
// }}
// >


// }
// </ScrollView>
export default JobList;