import React, { useState } from "react";
import { Image, TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { Feather } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import colors from "../../colors";
import {
  TOGGLE_LIKE,
  VIEW_FEED,
  DELETE_POST,
} from "../../queries/Main/MainQueries";
import PostModal from "./PostModal";

const Container = styled.View`
  margin-bottom: 30px;
  background-color: ${colors.white};
  border-radius: 10px;
  box-shadow: 2px 3px rgba(0, 0, 0, 0.08);
`;

const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const UserContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;

const Bold = styled.Text`
  font-weight: 500;
`;

const Location = styled.Text`
  font-size: 9px;
  color: ${colors.darkGray};
`;

const SlideContainer = styled.View`
  margin-bottom: 10px;
  overflow: hidden;
  width: 100%;
  height: ${hp("50%")}px;
`;

const IconsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

const IconContainer = styled.View`
  margin-right: 10px;
`;

const InfoContainer = styled.View`
  padding: 10px;
`;

const Caption = styled.Text`
  margin-bottom: 10px;
`;

const Post = ({
  id,
  user,
  location,
  caption,
  files = [],
  likeCount: likeCountProp,
  comments,
  isLiked: isLikedProp,
  currentUser,
}) => {
  const navigation = useNavigation();
  const [isPostModalVisible, setIsPostModalVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likeCount, setLikeCount] = useState(likeCountProp);

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: {
      postId: id,
    },
  });

  const [deletePostMutation] = useMutation(DELETE_POST, {
    variables: {
      id,
      action: "DELETE",
    },
    refetchQueries: () => [{ query: VIEW_FEED }],
  });

  const togglePostModal = () => {
    setIsPostModalVisible(!isPostModalVisible);
  };

  const handleDeletePost = async () => {
    try {
      const { data: editPost } = await deletePostMutation();
      if (editPost) {
        setIsPostModalVisible(false);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const toPostEdit = () => {
    setIsPostModalVisible(!isPostModalVisible);
    navigation.navigate("ModifyPost", { id, files, location, caption });
  };

  const handleLike = async () => {
    if (isLiked === true) {
      setLikeCount((l) => l - 1);
    } else {
      setLikeCount((l) => l + 1);
    }
    try {
      setIsLiked((p) => !p);
      await toggleLikeMutation();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Header>
        <UserContainer>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile", { id: user.id })}
          >
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{ uri: user.avatar }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile", { id: user.id })}
          >
            <HeaderUserContainer>
              <Bold>{user.username}</Bold>
              <Location>{location}</Location>
            </HeaderUserContainer>
          </TouchableOpacity>
        </UserContainer>
        {currentUser === user.id ? (
          <TouchableOpacity onPress={togglePostModal}>
            <Feather name="more-horizontal" size={24} color={colors.darkGray} />
          </TouchableOpacity>
        ) : null}
      </Header>
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
          {files.map((file) => (
            <Image
              key={file.id}
              style={{ width: wp("100%"), height: hp("50%") }}
              source={{ uri: file.url }}
            />
          ))}
        </Swiper>
      </SlideContainer>
      <InfoContainer>
        <Caption>{caption}</Caption>
        <IconsContainer>
          <TouchableOpacity
            onPress={handleLike}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <IconContainer style={{ marginRight: 3 }}>
              <Feather
                size={24}
                color={isLiked ? colors.red : colors.black}
                name="heart"
              />
            </IconContainer>
            <Text style={{ fontSize: 16 }}>
              {likeCount === 1 ? "1" : `${likeCount}`}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Comment", { id })}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <IconContainer style={{ marginRight: 3 }}>
              <Feather size={24} color={colors.black} name="message-square" />
            </IconContainer>
            <Text style={{ fontSize: 16 }}>{comments.length}</Text>
          </TouchableOpacity>
        </IconsContainer>
      </InfoContainer>
      <PostModal
        id={id}
        files={files}
        location={location}
        caption={caption}
        isPostModalVisible={isPostModalVisible}
        togglePostModal={togglePostModal}
        toPostEdit={toPostEdit}
        handleDeletePost={handleDeletePost}
      />
    </Container>
  );
};

export default Post;
