import React from "react";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import Button from "../../components/Button";
import TextButton from "../../components/TextButton";
import colors from "../../colors";

const Container = styled.View`
  flex: 1;
`;

const SlideContainer = styled.View`
  margin-bottom: 10px;
  overflow: hidden;
  width: 100%;
  flex: 3;
  border-radius: 4px;
  background-color: ${colors.secondaryShadow};
`;

const SlideItemContainer = styled.View`
  flex: 1;
`;

const SlideImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const CaptionContainer = styled.View`
  position: absolute;
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
`;

const Caption = styled.Text`
  font-size: 18px;
  margin-bottom: 16px;
`;

const CaptionTitle = styled.Text`
  font-weight: 600;
  font-size: 36px;
  color: ${colors.primary};
  text-shadow: 1px 1px 2px white;
`;

const AuthContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default ({ navigation }) => {
  const toSignUp = () => navigation.navigate("SignUp");
  const toSignIn = () => navigation.navigate("SignIn");

  return (
    <Container>
      <SlideContainer>
        <Swiper
          controlsProps={{
            PrevComponent: () => null,
            NextComponent: () => null,
            dotActiveStyle: {
              backgroundColor: colors.primary,
            },
          }}
        >
          <SlideItemContainer>
            <SlideImage source={require("../../assets/intro1.jpg")} />
            <CaptionContainer>
              <Caption>犬との思い出をみんなに共有しませんか?</Caption>
              <CaptionTitle>犬のためのSNS</CaptionTitle>
            </CaptionContainer>
          </SlideItemContainer>
          <SlideItemContainer>
            <SlideImage source={require("../../assets/intro2.jpg")} />
            <CaptionContainer>
              <Caption>犬に友達を作ってください</Caption>
              <CaptionTitle>お散歩出会い</CaptionTitle>
            </CaptionContainer>
          </SlideItemContainer>
          <SlideItemContainer>
            <SlideImage source={require("../../assets/intro3.jpg")} />
            <CaptionContainer>
              <Caption>犬が迷子になって困っていますか？</Caption>
              <CaptionTitle>迷子犬サポート</CaptionTitle>
            </CaptionContainer>
          </SlideItemContainer>
        </Swiper>
      </SlideContainer>
      <AuthContainer>
        <Button text={"会員登録"} onPress={toSignUp} accent={true} />
        <TextButton
          caption={"すでにアカウントのお持ちの方は"}
          title={"ログイン"}
          onPress={toSignIn}
        />
      </AuthContainer>
    </Container>
  );
};
