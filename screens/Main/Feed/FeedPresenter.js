import React, { useState } from "react";
import { FlatList, RefreshControl, AsyncStorage } from "react-native";
import Loader from "../../../components/Main/Loader";

export default ({ loading, data }) => {
  return loading ? (
    <Loader />
  ) : // <FlatList
  //   style={{ width: "100%", marginTop: 30 }}
  //   data={data}
  //   renderItem={({ item }) => <Text>{item.caption}</Text>}
  //   keyExtractor={(item) => item.id.toString()}
  // />
  null;
};
