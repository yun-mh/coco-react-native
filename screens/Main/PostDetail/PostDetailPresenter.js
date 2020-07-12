import React from "react";
import { ScrollView } from "react-native";
import Post from "../../../components/Main/Post";
import Loader from "../../../components/Main/Loader";


export default ({ loading, data }) => {
  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data && data.viewPost && <Post {...data.viewPost} />
      )}
    </ScrollView>
  );
};
