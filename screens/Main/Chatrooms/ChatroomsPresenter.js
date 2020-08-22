import React from "react";
import styled from "styled-components";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loader from "../../../components/Main/Loader";
import { FlatList } from "react-native-gesture-handler";
import ChatListItems from "../../../components/Main/ChatListItem";
import colors from "../../../colors";
import { Text } from "react-native";
import Friend from "../../../components/Main/Friend";

const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;

const FriendsContainer = styled.View`
  height: ${hp("10%")}px;
  border-bottom-width: 0.5px;
  border-bottom-color: ${colors.grayShadow};
`;

export default ({ loading, rooms, friendLoading, friends, currentUser }) => {
  return loading ? (
    <Loader />
  ) : (
    <Container>
      <FriendsContainer>
        {friendLoading ? (
          <Loader />
        ) : (
          <FlatList
            style={{
              width: "100%",
              paddingVertical: 15,
            }}
            contentContainerStyle={{ alignItems: "center" }}
            data={friends}
            renderItem={({ item }) => (
              <Friend
                id={item.id}
                username={item.username}
                avatar={item.avatar}
                currentUser={currentUser}
              />
            )}
            horizontal={true}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </FriendsContainer>
      <FlatList
        data={rooms}
        renderItem={({ item }) => (
          <ChatListItems
            id={item.id}
            messages={item.messages}
            participants={item.participants}
            currentUser={currentUser}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};
