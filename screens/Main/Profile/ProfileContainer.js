import React, { useState, useEffect } from "react";
import ProfilePresenter from "./ProfilePresenter";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { VIEW_USER, FOLLOW, UNFOLLOW } from "../../../queries/Main/MainQueries";
import { useLogOut } from "../../../contexts/AuthContext";

const ProfileContainer = ({ navigation, route }) => {
  const logout = useLogOut();

  const { loading, error, data, refetch } = useQuery(VIEW_USER, {
    variables: { id: route.params.id },
  });

  const [image, setImage] = useState("");
  const [dogName, setDogName] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [isFollowing, setIsFollowing] = useState(data?.viewUser?.isFollowing);
  const [isUserInfoModalVisible, setUserInfoModalVisible] = useState(false);
  const [isDogInfoModalVisible, setDogInfoModalVisible] = useState(false);
  const [isModified, setIsModified] = useState(
    route.params.isModified || false
  );

  useEffect(() => {
    setIsModified(route.params.isModified || false);
  }, [route.params.isModified]);

  useEffect(() => {
    refetch();
  }, [isModified]);

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

  const toggleUserInfoModal = () => {
    setUserInfoModalVisible(!isUserInfoModalVisible);
  };

  const toProfileModify = () => {
    toggleUserInfoModal();
    navigation.navigate("ProfileModify", {
      id: data?.viewUser?.id,
      email: data?.viewUser?.email,
      avatar: data?.viewUser?.avatar,
      username: data?.viewUser?.username,
      isModified,
    });
  };

  const toggleDogInfoModal = (id) => {
    if (!isDogInfoModalVisible) {
      const target = data?.viewUser?.dogs.find((el) => el.id === id);
      setImage(target.image);
      setDogName(target.name);
      setBreed(target.breed);
      setGender(target.gender);
      setBirthdate(target.birthdate);
    } else {
      setDogName("");
      setBreed("");
      setGender("");
      setBirthdate("");
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
      image={image}
      dogName={dogName}
      breed={breed}
      gender={gender}
      birthdate={birthdate}
      isDogInfoModalVisible={isDogInfoModalVisible}
      toggleDogInfoModal={toggleDogInfoModal}
      logout={logout}
    />
  );
};

export default ProfileContainer;
