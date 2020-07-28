import React from "react";
import styled from "styled-components/native";
import constants from "../../../constants";
import colors from "../../../colors";
import { Image, FlatList } from "react-native";
import PostGrid from "../../../components/Main/PostGrid";
import Dog from "../../../components/Main/Dog";
import Loader from "../../../components/Main/Loader";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Button from "../../../components/Main/Button";
import UserInfoModal from "../../../components/Main/UserInfoModal";
import DogInfoModal from "../../../components/Main/DogInfoModal";

const ProfileContainer = styled.View`
  flex: 1;
`;

const HalfScreen = styled.View`
  height: ${constants.height / 2}px;
`;

const HeaderContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: ${colors.secondary};
  height: ${(constants.height / 10) * 3}px;
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

const UserContainer = styled.View`
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
  padding-horizontal: 14px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.lightGray};
`;

const MyDogContentContainer = styled.View`
  flex: 4;
  background-color: white;
`;

const Title = styled.Text`
  color: ${colors.black};
`;

const PostContainer = styled.View`
  flex: 1;
  background-color: white;
`;

const PostHeaderContainer = styled.View`
  padding-horizontal: 14px;
  height: 40px;
  flex-direction: row;
  align-items: center;
  background-color: ${colors.lightGray};
`;

const PostScrollView = styled.ScrollView``;

const PostContentContainer = styled.View`
  flex-direction: row;
  flex: 9;
  flex-wrap: wrap;
  background-color: white;
`;

const ProfilePresenter = ({
  loading,
  data,
  isFollowing,
  handleFollow,
  isUserInfoModalVisible,
  toggleUserInfoModal,
  toProfileModify,
  toAddDog,
  toModifyDog,
  isDogInfoModalVisible,
  toggleDogInfoModal,
  dogId,
  image,
  dogName,
  breed,
  gender,
  birthdate,
  setDogInfoModalVisible,
  logout,
}) => {
  return loading ? (
    <Loader />
  ) : (
    data?.viewUser && (
      <ProfileContainer>
        <HalfScreen>
          <HeaderContainer>
            <HeaderContentContainer>
              <AvatarContainer>
                <Image
                  source={{ uri: data?.viewUser?.avatar }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
              </AvatarContainer>
              <DataContainer>
                <UserContainer>
                  <Username>{data?.viewUser?.username}</Username>
                  {data.viewUser.isMyself ? (
                    <TouchableOpacity onPress={toggleUserInfoModal}>
                      <Feather name="settings" size={18} color={colors.black} />
                    </TouchableOpacity>
                  ) : isFollowing ? (
                    <Button text={"アンフォロー"} onPress={handleFollow} />
                  ) : (
                    <Button
                      text={"フォロー"}
                      accent={true}
                      onPress={handleFollow}
                    />
                  )}
                </UserContainer>
                <InfoContainer>
                  <InfoItem>
                    <InfoTitle>投稿</InfoTitle>
                    <InfoData>{data?.viewUser?.postsCount}</InfoData>
                  </InfoItem>
                  <InfoItem>
                    <InfoTitle>フォロワー</InfoTitle>
                    <InfoData>{data?.viewUser?.followersCount}</InfoData>
                  </InfoItem>
                  <InfoItem>
                    <InfoTitle>フォロー中</InfoTitle>
                    <InfoData>{data?.viewUser?.followingCount}</InfoData>
                  </InfoItem>
                </InfoContainer>
              </DataContainer>
            </HeaderContentContainer>
          </HeaderContainer>
          <MyDogContainer>
            <MyDogHeaderContainer>
              <Title>ドッグ</Title>
              {data?.viewUser?.isMyself ? (
                <TouchableOpacity onPress={toAddDog}>
                  <Feather name="plus-circle" size={18} color={colors.black} />
                </TouchableOpacity>
              ) : null}
            </MyDogHeaderContainer>
            <MyDogContentContainer>
              <FlatList
                style={{
                  width: "100%",
                  paddingVertical: 15,
                }}
                contentContainerStyle={{ alignItems: "center" }}
                data={data?.viewUser?.dogs}
                renderItem={({ item }) => (
                  <Dog
                    image={item.image}
                    name={item.name}
                    onPress={() => toggleDogInfoModal(item.id)}
                  />
                )}
                horizontal={true}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
              />
            </MyDogContentContainer>
          </MyDogContainer>
        </HalfScreen>
        <HalfScreen>
          <PostContainer>
            <PostHeaderContainer>
              <Title>ポスト</Title>
            </PostHeaderContainer>
            <PostScrollView>
              <PostContentContainer>
                {data?.viewUser?.posts &&
                  data?.viewUser?.posts.map((post) => (
                    <PostGrid key={post.id} {...post} />
                  ))}
              </PostContentContainer>
            </PostScrollView>
          </PostContainer>
        </HalfScreen>
        <UserInfoModal
          isUserInfoModalVisible={isUserInfoModalVisible}
          toggleUserInfoModal={toggleUserInfoModal}
          toProfileModify={toProfileModify}
          logout={logout}
        />
        <DogInfoModal
          dogId={dogId}
          image={image}
          dogName={dogName}
          breed={breed}
          gender={gender}
          birthdate={birthdate}
          toModifyDog={toModifyDog}
          isDogInfoModalVisible={isDogInfoModalVisible}
          setDogInfoModalVisible={setDogInfoModalVisible}
          toggleDogInfoModal={toggleDogInfoModal}
        />
      </ProfileContainer>
    )
  );
};

export default ProfilePresenter;
