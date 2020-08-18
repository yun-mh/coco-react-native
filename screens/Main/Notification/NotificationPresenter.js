import React from "react";
import styled from "styled-components";
import colors from "../../../colors";
import NotificationCard from "../../../components/Main/NotificationCard";
import { FlatList } from "react-native-gesture-handler";
import Loader from "../../../components/Main/Loader";

const Container = styled.View`
  flex: 1;
  background-color: ${colors.secondaryShadow};
  padding-vertical: 20px; /* fix */
  padding-horizontal: 10px; /* fix */
`;

export default ({ loading, notifications, currentUser }) => {
  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={notifications}
          renderItem={({ item }) => (
            <NotificationCard
              id={item.id}
              type={item.type}
              from={item.from}
              cmt={item.comment}
              currentUser={currentUser}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Container>
  );
};
