import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

export const getPermission = async (type) => {
  if (Constants.platform.ios || Constants.platform.android) {
    let permission;
    switch (type) {
      case "cameraRoll":
        permission = Permissions.CAMERA_ROLL;
        break;
      case "camera":
        permission = Permissions.CAMERA;
        break;
      case "location":
        permission = Permissions.LOCATION;
        break;
      default:
        permission = undefined;
    }
    if (permission !== undefined) {
      const { status } = await Permissions.askAsync(permission);
      return status;
    }
  }
};
