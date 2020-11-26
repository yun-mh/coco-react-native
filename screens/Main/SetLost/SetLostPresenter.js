import React from "react";
import { Image, Switch } from "react-native";
import styled from "styled-components/native";
import QRCode from "react-native-qrcode-svg";
import moment from "moment";
import Button from "../../../components/Button";
import colors from "../../../colors";

const Container = styled.View`
  flex: 1;
  padding-horizontal: 35px;
`;

const DogContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 16px;
  border-bottom-color: ${colors.gray};
  border-bottom-width: .5px;
`;

const DogInfo = styled.View`
  flex: 1;
  padding-left: 16px;
`;

const DogRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DogHighlight = styled.Text`
  font-size: 18px;
`;

const DogStandard = styled.Text`
  font-size: 14px;
`;

const SwitchContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 16px;
  border-bottom-color: ${colors.gray};
  border-bottom-width: .5px;
`;

const SwitchLabel = styled.Text`
  font-size: 16px;
`;

const QRContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.View`
  margin-top: 32px;
`;

export default ({
  dogId,
  dogName,
  image,
  breed,
  gender,
  birthdate,
  isMissed,
  setSvg,
  openPage,
  saveCode,
  toggleMissingStatus
}) => {
  return (
    <Container>
      <DogContainer>
        <Image
          source={{ uri: image }}
          style={{ width: 80, height: 80, borderRadius: 40 }}
        />
        <DogInfo>
          <DogRow>
            <DogHighlight>{dogName}</DogHighlight>
            <DogStandard>（{gender === "male" ? "男" : "女"}）</DogStandard>
          </DogRow>
          <DogRow>
            <DogStandard>{breed}</DogStandard>
          </DogRow>
          <DogRow>
            <DogStandard>{moment().diff(birthdate, "years")}歳 ({moment(birthdate).format("yyyy-MM-DD")})</DogStandard>
          </DogRow>
        </DogInfo>
      </DogContainer>
      <SwitchContainer>
        <SwitchLabel>迷子状態に設定する</SwitchLabel>
        <Switch
          trackColor={{ false: "#767577", true: colors.red }}
          thumbColor="#f4f3f4"
          ios_backgroundColor="#3e3e3e"
          onChange={toggleMissingStatus}
          value={isMissed}
        />
      </SwitchContainer>
      <QRContentContainer>
        <QRCode
          color={colors.black}
          size={200}
          value={`https://support.cocofordogs.com/${dogId}`}
          logoSize={30}
          logo={require("../../../assets/logo_qr.png")}
          logoMargin={7}
          logoBorderRadius={5}
          logoBackgroundColor={"white"}
          getRef={(c) => setSvg(c)}
          quietZone={25}
        />
        <ButtonContainer>
          <Button text="コードをダウンロード" onPress={saveCode} />
          <Button text="犬の迷子状況ページへ" accent={true} onPress={openPage} />
        </ButtonContainer>
      </QRContentContainer>
    </Container>
  );
};
