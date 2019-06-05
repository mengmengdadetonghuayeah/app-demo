import { AsyncStorage } from "react-native";

//保存
async function save(key, value) {
  try {
    //console.log("Set item: %s, %o", key, value)
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.log("Set item fail %o", error);
  }
}
//获取
async function query(key) {
  try {
    // console.log("Get item: %s", key)
    let value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log("Get item fail %o", error);
  }
}

//移除
async function remove(key) {
  try {
    console.log("Remove item: %s", key);
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Remove item fail %o", error);
  }
}

export { save, query, remove };
