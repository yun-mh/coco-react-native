import React from "react";
import { Image, Text, View } from "react-native";
import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import colors from "../../../colors";
import Walker from "../../../components/Walking/Walker";
import Button from "../../../components/Button";

const ExitButtonContainer = styled.TouchableOpacity`
  position: absolute;
  z-index: 50;
  left: ${wp(3)}px;
  top: ${hp(5)}px;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  background-color: ${colors.red};
  border-radius: 18px;
  box-shadow: 1px 1px rgba(0, 0, 0, 0.2);
`;

const ControlContainer = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  position: absolute;
  z-index: 50;
  width: ${wp(90)}px;
  height: ${hp(20)}px;
  margin: ${wp(5)}px;
  bottom: 0px;
  border-radius: 14px;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.1);
`;

const CloseControl = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

const OpenControl = styled.TouchableOpacity`
  position: absolute;
  z-index: 50;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  right: ${wp(2)}px;
  bottom: ${hp(5)}px;
  transform: translateX(-18px);
  background-color: ${colors.primary};
  border-radius: 30px;
  box-shadow: 1px 1px rgba(0, 0, 0, 0.2);
`;

const MapsPresenter = ({
  latitude,
  longitude,
  latitudeDelta,
  longitudeDelta,
  initialRegion,
  isStarted,
  controlOpen,
  startTracking,
  stopTracking,
  toggleControl,
  exitScreen,
}) => {
  return (
    <View>
      <ExitButtonContainer onPress={exitScreen}>
        <Feather name={"x"} size={24} color={colors.white} />
      </ExitButtonContainer>
      <MapView
        style={{ width: wp(100), height: hp(100) }}
        initialRegion={initialRegion}
        region={{
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta,
        }}
        // followsUserLocation={true}
        // showsUserLocation={true}
        rotateEnabled={false}
        // scrollEnabled={false}
        // zoomEnabled={false}
        zoomControlEnabled={false}
        toolbarEnabled={false}
        pitchEnabled={false}
      >
        <Marker
          coordinate={{
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta,
          }}
        >
          <Image
            source={require("../../../assets/marker.png")}
            style={{ width: wp(12), height: wp(12) }}
          />
        </Marker>
      </MapView>
      {controlOpen ? (
        <ControlContainer>
          <CloseControl onPress={toggleControl}>
            <Feather name={"chevron-down"} size={32} color={colors.darkGray} />
          </CloseControl>
          {!isStarted ? (
            <Button text={"開始"} accent={true} onPress={startTracking} />
          ) : (
            <Button
              text={"中止"}
              accent={true}
              danger={true}
              onPress={stopTracking}
            />
          )}
        </ControlContainer>
      ) : (
        <OpenControl onPress={toggleControl}>
          <Feather name={"menu"} size={32} color={colors.white} />
        </OpenControl>
      )}
    </View>
  );
};

export default MapsPresenter;
