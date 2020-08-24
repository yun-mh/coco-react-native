import React from "react";
import styled from "styled-components";
import { Text, TouchableOpacity, Image } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import colors from "../../colors";
import { useNavigation } from "@react-navigation/native";
import {
  CREATE_CHATROOM,
  VIEW_CHATROOMS,
} from "../../queries/Main/MainQueries";
import { useMutation } from "@apollo/client";

const Container = styled.View`
  padding: 12px;
`;

const TouchableContainer = styled.TouchableOpacity`
  align-items: center;
`;

const Username = styled.Text`
  font-size: 10px;
  color: ${colors.darkGray};
`;

const Friend = ({ id, avatar, username, currentUser }) => {
  const navigation = useNavigation();

  const [createChatRoomMutation] = useMutation(CREATE_CHATROOM, {
    variables: {
      toId: id,
    },
    refetchQueries: () => [
      { query: VIEW_CHATROOMS, variables: { id: currentUser } },
    ],
  });

  const toChatroom = async () => {
    try {
      const {
        data: {
          createChatRoom: { id: roomId },
        },
      } = await createChatRoomMutation();

      navigation.navigate("Chatroom", {
        id: roomId,
        counterpartId: id,
        counterpartUsername: username,
        myself: currentUser,
      });
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <Container>
      <TouchableContainer onPress={toChatroom}>
        <Image
          source={{ uri: avatar }}
          style={{
            width: widthPercentageToDP("10%"),
            height: widthPercentageToDP("10%"),
            borderRadius: widthPercentageToDP("10%") / 2,
          }}
        />
        <Username>{username}</Username>
      </TouchableContainer>
    </Container>
  );
};

export default Friend;
