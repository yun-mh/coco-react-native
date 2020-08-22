import React from "react";
import { FlatList, View } from "react-native";
import Loader from "../../../components/Main/Loader";
import Post from "../../../components/Main/Post";

export default ({
  loading,
  data,
  onEndReached,
  refreshing,
  onRefresh,
  currentUser,
}) => {
  return loading ? (
    <Loader />
  ) : (
    data && (
      <View style={{ paddingHorizontal: 10 }}>
        <FlatList
          style={{ width: "100%", paddingTop: 15 }}
          data={data.viewFeed}
          renderItem={({ item }) => (
            <Post
              id={item.id}
              user={item.user}
              location={item.location}
              caption={item.caption}
              files={item.files}
              likeCount={item.likeCount}
              comments={item.comments}
              isLiked={item.isLiked}
              currentUser={currentUser?.viewMyself?.id}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
        />
      </View>
    )
  );
};
