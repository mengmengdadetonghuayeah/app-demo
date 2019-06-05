import { Dimensions, PixelRatio, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

const metrics = {
	marginHorizontal: 10,
	marginVertical: 10,
	section: 25,
	baseMargin: 15,
	doubleBaseMargin: 20,
	smallMargin: 5,
	horizontalLineHeight: 1,
	top: Platform.OS === 'ios' ? 20 : 0,
	CW: width < height ? width : height,
	CH: width < height ? height : width,

	//界面两边留缝隙的宽度
	blank: 36,
	widths: width - 36,

	navBarHeight: 64,
	buttonRadius: 4,
	one: 1 / PixelRatio.get(),


	icons: {
		tiny: 15,
		small: 20,
		medium: 30,
		large: 45,
		xl: 60
	},
	images: {
		small: 20,
		medium: 40,
		large: 60,
		logo: 300
	},
	photoOptionsCN: {
		title: '选择',
		cancelButtonTitle: '取消',
		takePhotoButtonTitle: '拍照',
		chooseFromLibraryButtonTitle: '选择相册',

		cameraType: 'back', // 'front' or 'back'
		mediaType: 'photo', // 'photo' or 'video'
		videoQuality: 'high', // 'low', 'medium', or 'high'
		durationLimit: 10, // video recording max time in seconds
		maxWidth: 200, // photos only
		maxHeight: 300, // photos only
		aspectX: 2, // android only - aspectX:aspectY, the cropping image's ratio of width to height
		aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
		quality: 0.5, // 0 to 1, photos only
		angle: 0, // android only, photos only
		allowsEditing: true, // Built in functionality to resize/reposition the image after selection
		noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
		storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
			skipBackup: true, // ios only - image will NOT be backed up to icloud
			path: 'images' // ios only - will save image at /Documents/images rather than the root
		}
	},
}

export default metrics
