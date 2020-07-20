import React from "react";
import Loader from "../../../components/Main/Loader";
import Post from "../../../components/Main/Post";

export default ({ loading, data, refreshing, onRefresh }) => {
  return loading ? (
    <Loader />
  ) : (
    data && data?.viewPost && (
      <Post
        id={data.viewPost.id}
        user={data.viewPost.user}
        location={data.viewPost.location}
        caption={data.viewPost.caption}
        files={data.viewPost.files}
        likeCount={data.viewPost.likeCount}
        comments={data.viewPost.comments}
        isLiked={data.viewPost.isLiked}
      />
    )
  );
};
