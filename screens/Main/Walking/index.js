import React from "react";
import styled from "styled-components";
import colors from "../../../colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Button from "../../../components/Button";

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const Background = styled.Image`
  height: 100%;
`;

const CaptionContainer = styled.View`
  position: absolute;
  flex: 1;
  width: 100%;
  height: 100%;
  top: ${hp("15%")}px;
  align-items: center;
`;

const Caption = styled.Text`
  width: 80%;
  color: ${colors.white};
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 16px;
`;

const ButtonContainer = styled.View`
  position: absolute;
  flex: 1;
  bottom: ${hp("5%")}px;
  align-items: center;
`;

export default ({ navigation }) => {
  return (
    <Container>
      <Background
        resizeMethod={"resize"}
        resizeMode={"contain"}
        source={require("../../../assets/walking.jpg")}
      />
      <CaptionContainer>
        <Caption>他のお散歩中の犬と</Caption>
        <Caption>友だちになりませんか？</Caption>
      </CaptionContainer>
      <ButtonContainer>
        <Button
          text={"お散歩の出会いを始める"}
          accent={true}
          onPress={() => navigation.navigate("Maps")}
        />
      </ButtonContainer>
    </Container>
  );
};
