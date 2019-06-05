//I18n.js
import I18n, { getLanguages } from "react-native-i18n";
import DeviceInfo from "react-native-device-info";

import en from "./en";
import zh from "./zh";
import { query } from "../service/storage";

//默认为英文
I18n.defaultLocale = "en";

I18n.fallbacks = true;

I18n.localeLanguage = async () => {
  let res = await query("language");
  if (res) {
    I18n.locale = res;
  } else {
    I18n.locale = DeviceInfo.getDeviceLocale();
  }
  return I18n.locale;
};
//支持转换的语言
I18n.translations = {
  en,
  zh
};
export { I18n, getLanguages };
