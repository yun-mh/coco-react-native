import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

export const getCameraPermission = async () => {
  if (Constants.platform.ios || Constants.platform.android) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    return status;
  }
};
