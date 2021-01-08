import React from "react";
import Loader from "../../../components/Main/Loader";
import PostDetail from "../../../components/Main/PostDetail";

export default ({
  loading,
  data,
  refreshing,
  onRefresh,
  comment,
  height,
  setComment,
  updateInputSize,
  handleAddComment,
  addLoading,
  currentUser,
}) => {
  return loading ? (
    <Loader />
  ) : (
    data && data.viewPost && (
      <PostDetail
        {...data.viewPost}
        addLoading={addLoading}
        refreshing={refreshing}
        onRefresh={onRefresh}
        comment={comment}
        height={height}
        setComment={setComment}
        updateInputSize={updateInputSize}
        handleAddComment={handleAddComment}
        currentUser={currentUser}
      />
    )
  );
};
