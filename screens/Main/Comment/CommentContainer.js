import React, { useState } from "react";
import { Alert } from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import {
  VIEW_POST,
  ADD_COMMENT,
  CHECK_MYSELF,
} from "../../../queries/Main/MainQueries";
import CommentPresenter from "./CommentPresenter";
import { useEffect } from "react";

export default ({ route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [comment, setComment] = useState("");
  const [height, setHeight] = useState(40);
  const [currentUser, setCurrentUser] = useState();
  const [addLoading, setAddLoading] = useState(false);

  const { loading, error, data, refetch } = useQuery(VIEW_POST, {
    variables: { id: route.params.id },
  });

  // const {
  //   data: {
  //     viewMyself: { id: currentUser },
  //   },
  // } = useQuery(CHECK_MYSELF);

  const { loading: myselfLoading, data: myselfData } = useQuery(CHECK_MYSELF);

  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: {
      postId: route.params.id,
      text: comment,
      token: route.params.token,
    },
    refetchQueries: () => [
      { query: VIEW_POST, variables: { id: route.params.id } },
    ],
  });

  useEffect(() => {
    if (!myselfLoading && !myselfData) {
      setCurrentUser(myselfData.viewMyself.id);
    }
  }, [myselfData]);

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
      setAddLoading(true);
      await addCommentMutation();
    } catch (error) {
      console.warn(error);
    } finally {
      setComment("");
      setAddLoading(false);
    }
  };

  return (
    <CommentPresenter
      loading={loading}
      data={data}
      refreshing={refreshing}
      onRefresh={onRefresh}
      addLoading={addLoading}
      comment={comment}
      height={height}
      setComment={setComment}
      updateInputSize={updateInputSize}
      handleAddComment={handleAddComment}
      currentUser={currentUser}
    />
  );
};
