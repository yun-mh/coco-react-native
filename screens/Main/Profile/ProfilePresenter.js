import React from "react";
import styled from "styled-components/native";
import constants from "../../../constants";
import colors from "../../../colors";

const ProfileContainer = styled.View`
  flex: 1;
`;

const HalfScreen = styled.View`
  height: ${constants.height / 2}px;
`;

const HeaderContainer = styled.View`
  height: ${(constants.height / 10) * 3}px;
`;

const HeaderUpperContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: ${colors.secondary};
`;

const HeaderContentContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
`;

const AvatarContainer = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: black;
`;

const DataContainer = styled.View`
  width: 65%;
`;

const UsernameContainer = styled.View`
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Username = styled.Text`
  font-weight: bold;
  font-size: 20px;
`;

const InfoContainer = styled.View`
  flex-direction: row;
  height: 50px;
  justify-content: space-evenly;
  background-color: white;
  border-radius: 8px;
  padding: 5px;
`;

const InfoItem = styled.View`
  flex: 1;
  align-items: center;
`;

const InfoTitle = styled.Text`
  flex: 1;
  color: gray;
`;

const InfoData = styled.Text`
  flex: 1;
  font-weight: bold;
  font-size: 16px;
`;

const MyDogContainer = styled.View`
  height: ${(constants.height / 10) * 2}px;
  background-color: green;
`;

const MyDogHeaderContainer = styled.View`
  height: 40px;
  background-color: ${colors.gray};
`;

const MyDogContentContainer = styled.View`
  flex: 4;
  background-color: white;
`;

const PostContainer = styled.View`
  flex: 1;
  background-color: violet;
`;

const PostHeaderContainer = styled.View`
  height: 40px;
  background-color: ${colors.gray};
`;

const PostContentContainer = styled.View`
  flex: 9;
  background-color: white;
`;

const ProfilePresenter = () => {
  return (
    <ProfileContainer>
      <HalfScreen>
        <HeaderContainer>
          <HeaderUpperContainer>
            <HeaderContentContainer>
              <AvatarContainer></AvatarContainer>
              <DataContainer>
                <UsernameContainer>
                  <Username>cocodaddy</Username>
                </UsernameContainer>
                <InfoContainer>
                  <InfoItem>
                    <InfoTitle>投稿</InfoTitle>
                    <InfoData>50</InfoData>
                  </InfoItem>
                  <InfoItem>
                    <InfoTitle>フォロワー</InfoTitle>
                    <InfoData>50</InfoData>
                  </InfoItem>
                  <InfoItem>
                    <InfoTitle>フォロー中</InfoTitle>
                    <InfoData>50</InfoData>
                  </InfoItem>
                </InfoContainer>
              </DataContainer>
            </HeaderContentContainer>
          </HeaderUpperContainer>
        </HeaderContainer>
        <MyDogContainer>
          <MyDogHeaderContainer></MyDogHeaderContainer>
          <MyDogContentContainer></MyDogContentContainer>
        </MyDogContainer>
      </HalfScreen>
      <HalfScreen>
        <PostContainer>
          <PostHeaderContainer></PostHeaderContainer>
          <PostContentContainer></PostContentContainer>
        </PostContainer>
      </HalfScreen>
    </ProfileContainer>
  );
};

export default ProfilePresenter;
