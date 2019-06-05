import { PixelRatio, Dimensions } from 'react-native';

const pixelRatio = PixelRatio.get();
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const font = (size) => {

	if (pixelRatio === 2) {
		if (deviceWidth < 360) {
			return size * 0.95;
		}
		if (deviceHeight < 667) {
			return size;
		} else if (deviceHeight >= 667 && deviceHeight <= 735) {
			return size * 1.15;
		}
		return size * 1.25;
	}
	if (pixelRatio === 3) {
		if (deviceWidth <= 360) {
			return size;
		}
		if (deviceHeight < 667) {
			return size * 1.15;
		}
		if (deviceHeight >= 667 && deviceHeight <= 735) {
			return size * 1.2;
		}
		return size * 1.27;
	}
	if (pixelRatio === 3.5) {
		if (deviceWidth <= 360) {
			return size;
		}
		if (deviceHeight < 667) {
			return size * 1.20;
		}
		if (deviceHeight >= 667 && deviceHeight <= 735) {
			return size * 1.25;
		}
		return size * 1.40;
	}
	return size;
};

export default font; 