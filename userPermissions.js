import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Alert } from "react-native";

export const getCameraPermission = async () => {
  if (Constants.platform.ios || Constants.platform.android) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status != "granted") {
      Alert.alert("カメラロールの権限が必要です。");
    }
  }
};
