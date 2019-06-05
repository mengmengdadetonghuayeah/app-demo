import Toast from "react-native-root-toast";

export function toastOnShow(msg, config) {
  config = Object.assign(
    {},
    {
      duration: Toast.durations.SHORT,
      //   position: Toast.positions.TOP,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0
    },
    config
  );
  let toast = Toast.show(msg, config);
}
