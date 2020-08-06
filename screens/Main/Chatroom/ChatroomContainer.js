import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import ChatroomPresenter from "./ChatroomPresenter";
import { VIEW_CHATROOM } from "../../../queries/Main/MainQueries";

export default ({ navigation, route }) => {
  const counterpart = route.params.username;
  const myself = route.params.myself;
  console.log(myself);
  const [height, setHeight] = useState(40);

  navigation.setOptions({ title: counterpart });

  const { loading, error, data, refetch } = useQuery(VIEW_CHATROOM, {
    variables: { id: route.params.id },
  });

  const updateInputSize = (height) => {
    setHeight(height);
  };

  console.log(data);
  return (
    <ChatroomPresenter
      loading={loading}
      data={data}
      height={height}
      updateInputSize={updateInputSize}
      myself={myself}
    />
  );
};
