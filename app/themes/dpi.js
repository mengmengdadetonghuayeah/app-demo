import { PixelRatio } from 'react-native';
import font from './font';

const dpi = function transPxToDp(px) {
	return px / PixelRatio.get()
}

dpi.font = font
export default dpi