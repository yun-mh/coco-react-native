import React, { useState, useEffect } from "react";
import ProfilePresenter from "./ProfilePresenter";
import { useQuery, useMutation } from "@apollo/client";
import { VIEW_USER, FOLLOW, UNFOLLOW, CREATE_CHATROOM, VIEW_CHATROOMS } from "../../../queries/Main/MainQueries";
import { useLogOut } from "../../../contexts/AuthContext";

const ProfileContainer = ({ navigation, route }) => {
  const logout = useLogOut();

  const { loading, error, data } = useQuery(VIEW_USER, {
    variables: { id: route.params.id },
  });

  const [dogId, setDogId] = useState("");
  const [image, setImage] = useState("");
  const [dogName, setDogName] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [isMissed, setIsMissed] = useState();
  const [isFollowing, setIsFollowing] = useState(data?.viewUser?.isFollowing);
  const [isUserInfoModalVisible, setUserInfoModalVisible] = useState(false);
  const [isDogInfoModalVisible, setDogInfoModalVisible] = useState(false);

  useEffect(() => {
    if (data?.viewUser?.isFollowing === true) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [data?.viewUser?.isFollowing]);

  const [followMutation] = useMutation(FOLLOW, {
    variables: {
      id: route.params.id,
    },
  });

  const [unfollowMutation] = useMutation(UNFOLLOW, {
    variables: {
      id: route.params.id,
    },
  });

  const [createChatRoomMutation] = useMutation(CREATE_CHATROOM, {
    variables: {
      toId: route.params.id,
    },
    refetchQueries: () => [
      { query: VIEW_CHATROOMS },
    ],
  });

  const toChatroom = async () => {
    try {
      const {
        data: {
          createChatRoom: { id: roomId, participants },
        },
      } = await createChatRoomMutation();

      const currentUser = participants.filter((p) => p.id !== route.params.id)[0];

      navigation.navigate("Chatroom", {
        id: roomId,
        counterpartId: route.params.id,
        counterpartUsername: data?.viewUser?.username,
        myself: currentUser.id,
        token: data?.viewUser?.token,
      });
    } catch (error) {
      console.warn(error);
    }
  };

  const toggleUserInfoModal = () => {
    setUserInfoModalVisible(!isUserInfoModalVisible);
  };

  const toProfileModify = () => {
    toggleUserInfoModal();
    navigation.navigate("ModifyProfile", {
      id: data?.viewUser?.id,
      email: data?.viewUser?.email,
      avatar: data?.viewUser?.avatar,
      username: data?.viewUser?.username,
    });
  };

  const toModifyDog = () => {
    navigation.navigate("ModifyDog", {
      id: data?.viewUser?.id,
      dogId,
      image,
      dogName,
      breed,
      gender,
      birthdate,
    });
    toggleDogInfoModal();
  };

  const toSetLost = () => {
    navigation.navigate("SetLost", {
      id: data?.viewUser?.id,
      dogId,
      image,
      dogName,
      breed,
      gender,
      birthdate,
      isMissed,
    });
    toggleDogInfoModal();
  };

  const toAddDog = () => {
    navigation.navigate("AddDog", {
      id: data?.viewUser?.id,
    });
  };

  const toggleDogInfoModal = (dogid) => {
    if (!isDogInfoModalVisible) {
      const target = data?.viewUser?.dogs.find((el) => el.id === dogid);
      setDogId(target.id);
      setImage(target.image);
      setDogName(target.name);
      setBreed(target.breed);
      setGender(target.gender);
      setBirthdate(target.birthdate);
      setIsMissed(target.isMissed);
    } else {
      setDogId("");
      setDogName("");
      setBreed("");
      setGender("");
      setBirthdate("");
      setIsMissed();
    }
    setDogInfoModalVisible(!isDogInfoModalVisible);
  };

  const handleFollow = async () => {
    if (isFollowing) {
      try {
        setIsFollowing(false);
        await unfollowMutation();
      } catch (error) {
        console.warn(error);
      }
    } else {
      try {
        setIsFollowing(true);
        await followMutation();
      } catch (error) {
        console.warn(error);
      }
    }
  };

  return (
    <ProfilePresenter
      loading={loading}
      data={data}
      isFollowing={isFollowing}
      handleFollow={handleFollow}
      isUserInfoModalVisible={isUserInfoModalVisible}
      toggleUserInfoModal={toggleUserInfoModal}
      toProfileModify={toProfileModify}
      toAddDog={toAddDog}
      toModifyDog={toModifyDog}
      toSetLost={toSetLost}
      dogId={dogId}
      image={image}
      dogName={dogName}
      breed={breed}
      gender={gender}
      birthdate={birthdate}
      toChatroom={toChatroom}
      isDogInfoModalVisible={isDogInfoModalVisible}
      setDogInfoModalVisible={setDogInfoModalVisible}
      toggleDogInfoModal={toggleDogInfoModal}
      logout={logout}
    />
  );
};

export default ProfileContainer;
