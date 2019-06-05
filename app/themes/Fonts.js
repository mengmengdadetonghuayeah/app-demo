
import {  Platform } from 'react-native'
const type = {
	base: 'HelveticaNeue',
	bold: 'HelveticaNeue-Bold',
	emphasis: 'HelveticaNeue-Italic'
}

const size = {
	h1: (Platform.OS==='ios')?36: 38,
	h2:(Platform.OS==='ios')?32:  34,
	h3:(Platform.OS==='ios')?28:  30,
	h4: (Platform.OS==='ios')?24: 26,
	h5: (Platform.OS==='ios')?20: 22,
	h6:(Platform.OS==='ios')?17:  19,
	h7:(Platform.OS==='ios')?22:  24,
	input:(Platform.OS==='ios')?16:  18,
	title:(Platform.OS==='ios')?15:  17,
	title1:(Platform.OS==='ios')?14:  16,
	title2:(Platform.OS==='ios')?13:  15,
	normal1:(Platform.OS==='ios')?12:  14,
	normal2:(Platform.OS==='ios')?10:  12,
	tiny:(Platform.OS==='ios')?6.5:  8.5,
	badge:(Platform.OS==='ios')?8:  10
}

export default {
	type,
	size,
}

