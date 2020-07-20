import React, { useLayoutEffect } from "react";
import styled from "styled-components/native";
import { Text, View, FlatList } from "react-native";
import SearchBar from "../../../components/Main/SearchBar";
import Loader from "../../../components/Main/Loader";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../colors";
import PostGrid from "../../../components/Main/PostGrid";
import SearchUser from "../../../components/Main/SearchUser";

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
  value,
  onChange,
  onSubmit,
  loading,
  data,
  isUser,
  handleUserTab,
  handlePostTab,
}) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <SearchBar value={value} onChange={onChange} onSubmit={onSubmit} />
      ),
    });
  }, [value]);

  return (
    <>
      <TabContainer>
        <Tab
          onPress={handleUserTab}
          style={{ borderRightWidth: 1, borderColor: colors.lightGray }}
        >
          <Text style={{ color: colors.black }}>ユーザー</Text>
        </Tab>
        <Tab onPress={handlePostTab}>
          <Text style={{ color: colors.black }}>ポスト</Text>
        </Tab>
      </TabContainer>
      <View style={{ flex: 1, justifyContent: "center" }}>
        {loading ? (
          <Loader />
        ) : isUser ? (
          <FlatList
            style={{ marginHorizontal: 15, paddingTop: 15 }}
            data={data?.searchUser}
            renderItem={({ item }) => (
              <SearchUser
                id={item.id}
                avatar={item.avatar}
                username={item.username}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <PostScrollView>
            <PostContentContainer>
              {data?.searchPost &&
                data?.searchPost.map((post) => (
                  <PostGrid key={post.id} {...post} />
                ))}
            </PostContentContainer>
          </PostScrollView>
        )}
      </View>
    </>
  );
};
