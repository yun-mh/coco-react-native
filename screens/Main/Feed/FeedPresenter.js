import React from "react";
import { FlatList, Text } from "react-native";
import Loader from "../../../components/Main/Loader";

export default ({ loading, data, refreshing, onRefresh }) => {
  return loading ? (
    <Loader />
  ) : data && (
  <FlatList
     style={{ width: "100%", marginTop: 30 }}
     data={data.viewFeed}
     renderItem={({ item }) => <Text>{item.caption}</Text>}
     keyExtractor={(item) => item.id.toString()}
     refreshing={refreshing}
     onRefresh={onRefresh}
   />
  )
};
