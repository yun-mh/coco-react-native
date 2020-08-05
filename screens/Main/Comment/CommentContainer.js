import React, { useState } from "react";
import { Alert } from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import {
  VIEW_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  CHECK_MYSELF,
} from "../../../queries/Main/MainQueries";
import CommentPresenter from "./CommentPresenter";

export default ({ navigation, route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [comment, setComment] = useState("");
  const [height, setHeight] = useState(40);
  const { loading, error, data, refetch } = useQuery(VIEW_POST, {
    variables: { id: route.params.id },
  });
  const {
    data: {
      viewMyself: { id: currentUser },
    },
  } = useQuery(CHECK_MYSELF);

  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: {
      postId: route.params.id,
      text: comment,
    },
    refetchQueries: () => [
      { query: VIEW_POST, variables: { id: route.params.id } },
    ],
  });

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const updateInputSize = (height) => {
    setHeight(height);
  };

  const handleAddComment = async () => {
    if (comment === "") {
      Alert.alert("エラー", "コメントを入力してください。");
      return;
    }
    try {
      const {
        data: { addComment },
      } = await addCommentMutation();
    } catch (error) {
      console.warn(error);
    } finally {
      setComment("");
    }
  };

  return (
    <CommentPresenter
      loading={loading}
      data={data}
      refreshing={refreshing}
      onRefresh={onRefresh}
      comment={comment}
      height={height}
      setComment={setComment}
      updateInputSize={updateInputSize}
      handleAddComment={handleAddComment}
      currentUser={currentUser}
    />
  );
};
