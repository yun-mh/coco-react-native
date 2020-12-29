import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import MapView, { Marker, Polyline } from "react-native-maps";
import colors from "../../../colors";
import Walker from "../../../components/Walking/Walker";
import Button from "../../../components/Button";
import DistanceIcon from "../../../components/Walking/DistanceIcon";

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
  height: ${hp(25)}px;
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

const ControlBox = styled.View`
  height: 30%;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 0px;
`;

const MapsPresenter = ({
  latitude,
  longitude,
  latitudeDelta,
  longitudeDelta,
  routes,
  distance,
  users,
  dummyUsers,
  isStarted,
  controlOpen,
  startTracking,
  stopTracking,
  toggleControl,
  exitScreen,
}) => {
  return (
    <View style={{ width: wp(100), height: hp(100), flex: 1 }}>
      <ExitButtonContainer onPress={exitScreen}>
        <Feather name={"x"} size={24} color={colors.white} />
      </ExitButtonContainer>
      <MapView
        style={{ width: wp(100), height: hp(100), flex: 1 }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta,
        }}
        region={{
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta,
        }}
        followsUserLocation={true}
        rotateEnabled={false}
        scrollEnabled={false}
        zoomEnabled={false}
        zoomControlEnabled={false}
        toolbarEnabled={false}
        pitchEnabled={false}
      >
        <Polyline
          coordinates={routes}
          strokeColor={colors.pink}
          strokeWidth={10}
        />
        <Marker
          coordinate={{
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta,
          }}
        >
          <Walker myself={true} />
        </Marker>
        {isStarted &&
          users &&
          users.length > 0 &&
          users.map(
            (user) =>
              user.isWalking && (
                <Marker
                  key={user.id}
                  coordinate={{
                    latitude: user.latitude,
                    longitude: user.longitude,
                    latitudeDelta,
                    longitudeDelta,
                  }}
                >
                  <Walker myself={false} />
                </Marker>
              )
          )}
        {/* ダミー用 */}
        {isStarted &&
          dummyUsers &&
          dummyUsers.length > 0 &&
          dummyUsers.map(
            (user) =>
              user.isWalking && (
                <Marker
                  key={user.id}
                  coordinate={{
                    latitude: user.latitude,
                    longitude: user.longitude,
                    latitudeDelta,
                    longitudeDelta,
                  }}
                >
                  <Walker myself={false} />
                </Marker>
              )
          )}
      </MapView>
      {controlOpen ? (
        <ControlContainer>
          <CloseControl onPress={toggleControl}>
            <Feather name={"chevron-down"} size={32} color={colors.darkGray} />
          </CloseControl>
          <ControlBox>
            {!isStarted ? (
              <View>
                <Text>開始ボタンを押すとトラッキングが始まります。</Text>
              </View>
            ) : (
              <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                <DistanceIcon />
                <Text
                  style={{ marginLeft: 10, fontSize: 18, fontWeight: "bold" }}
                >
                  {distance.toFixed(2)}
                </Text>
                <Text style={{ color: colors.darkGray }}> km</Text>
              </View>
            )}
          </ControlBox>
          <ButtonContainer>
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
          </ButtonContainer>
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
