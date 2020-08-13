import React from "react";
import styled from "styled-components";
import Loader from "../../../components/Main/Loader";
import { FlatList } from "react-native-gesture-handler";
import ChatListItems from "../../../components/Main/ChatListItem";

const Container = styled.View`
  flex: 1;
`;

export default ({ loading, rooms, currentUser }) => {
  return loading ? (
    <Loader />
  ) : (
    <Container>
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
