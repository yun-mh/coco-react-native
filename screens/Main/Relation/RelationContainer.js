import React, { useState } from "react";
import RelationPresenter from "./RelationPresenter";

export default ({ route: { params: { viewUser }} }) => {
  const [isFollowersTab, setIsFollowersTab] = useState(true);

  const handleFollowersTab = () => {
    setIsFollowersTab(true);
  };

  const handleFollowingsTab = () => {
    setIsFollowersTab(false);
  };

  return (
    <RelationPresenter
      id={viewUser.id}
      username={viewUser.username}
      followers={viewUser.followers}
      followings={viewUser.following}
      isFollowersTab={isFollowersTab}
      handleFollowersTab={handleFollowersTab}
      handleFollowingsTab={handleFollowingsTab}
    />
  );
};
