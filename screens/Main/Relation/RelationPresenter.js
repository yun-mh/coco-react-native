import React, { useLayoutEffect } from "react";
import styled from "styled-components/native";
import { Text, View, FlatList } from "react-native";
import Loader from "../../../components/Main/Loader";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../colors";
import RelationUser from "../../../components/Main/RelationUser";

const TabContainer = styled.View`
  height: 40px;
  flex-direction: row;
  align-items: center;
  background-color: white;
  border-bottom-color: ${colors.lightGray};
  border-bottom-width: 1px;
`;

const Tab = styled.TouchableOpacity`
  flex: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const PostScrollView = styled.ScrollView``;

const PostContentContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export default ({
  id,
  username,
  followers,
  followings,
  isFollowersTab,
  handleFollowersTab,
  handleFollowingsTab,
}) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: username
    });
  });

  return (
    <>
      <TabContainer>
        <Tab
          onPress={handleFollowersTab}
          style={{ borderRightWidth: 1, borderColor: colors.lightGray }}
        >
          <Text style={{ color: isFollowersTab? colors.black : colors.darkGray, fontWeight: isFollowersTab ? "bold" : "normal" }}>フォロワー ({followers.length})</Text>
        </Tab>
        <Tab onPress={handleFollowingsTab}>
          <Text style={{ color: isFollowersTab? colors.darkGray : colors.black, fontWeight: isFollowersTab ? "normal" : "bold"}}>フォロー中 ({followings.length})</Text>
        </Tab>
      </TabContainer>
      <View style={{ flex: 1, justifyContent: "center" }}>
        {isFollowersTab ? (
          <FlatList
            style={{ marginHorizontal: 15, paddingTop: 15 }}
            data={followers}
            renderItem={({ item }) => (
              <RelationUser
                currentUser={id}
                id={item.id}
                avatar={item.avatar}
                username={item.username}
                dogs={item.dogs}
                isFollowing={item.isFollowing}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            style={{ marginHorizontal: 15, paddingTop: 15 }}
            data={followings}
            renderItem={({ item }) => (
              <RelationUser
                currentUser={id}
                id={item.id}
                avatar={item.avatar}
                username={item.username}
                dogs={item.dogs}
                isFollowing={item.isFollowing}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </>
  );
};
