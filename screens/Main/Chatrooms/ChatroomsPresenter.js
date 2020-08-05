import React from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Loader from "../../../components/Main/Loader";
import { FlatList } from "react-native-gesture-handler";
import ChatListItems from "../../../components/Main/ChatListItem";

const Container = styled.View`
  flex: 1;
`;

export default ({ loading, data, currentUser }) => {
  return loading ? (
    <Loader />
  ) : (
    data && (
      <Container>
        <FlatList
          data={data.viewChatRooms}
          renderItem={({ item }) => (
            <ChatListItems
              id={item.id}
              messages={item.messages}
              participants={item.participants}
              currentUser={currentUser.viewMyself.id}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </Container>
    )
  );
};
