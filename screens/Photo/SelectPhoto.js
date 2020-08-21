import React, { useState, useEffect, Fragment } from "react";
import {
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import styled from "styled-components";
import * as MediaLibrary from "expo-media-library";
import { Feather } from "@expo/vector-icons";
import constants from "../../constants";
import { getCameraPermission } from "../../userPermissions";
import Loader from "../../components/Main/Loader";
import colors from "../../colors";
import GallerySwiper from "../../components/Main/GallerySwiper";

const View = styled.View`
  flex: 1;
`;

const SlideContainer = styled.View`
  overflow: hidden;
  width: 100%;
  height: ${constants.height / 2}px;
`;

const Button = styled.TouchableOpacity`
  width: 70px;
  height: 30px;
  position: absolute;
  right: 10px;
  top: 15px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.secondary};
  border-radius: 5px;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selected, setSelected] = useState([]);
  const [endCursor, setEndCursor] = useState();
  const [allPhotos, setAllPhotos] = useState();

  const changeSelected = (photo) => {
    if (selected.includes(photo)) {
      const filtered = selected.filter((item) => item !== photo);
      return setSelected(filtered);
    }
    setSelected((prev) => [...prev, photo]);
  };

  const getPhotos = async () => {
    try {
      const {
        assets,
        endCursor,
        hasNextPage,
      } = await MediaLibrary.getAssetsAsync({
        first: 9,
        sortBy: ["creationTime"],
      });
      const [firstPhoto] = assets;
      setSelected([firstPhoto]);
      if (hasNextPage) {
        setEndCursor(endCursor);
      }
      setAllPhotos(assets);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMore = async (cursor) => {
    if (cursor !== undefined) {
      try {
        const {
          assets,
          endCursor,
          hasNextPage,
        } = await MediaLibrary.getAssetsAsync({
          first: 9,
          after: cursor,
          sortBy: ["creationTime"],
        });
        if (hasNextPage) {
          setEndCursor(endCursor);
        } else {
          setEndCursor();
        }
        setAllPhotos((prev) => [...prev, ...assets]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const askPermission = async () => {
    try {
      const status = await getCameraPermission();
      if (status === "granted") {
        setHasPermission(true);
        getPhotos();
      }
    } catch (error) {
      console.log(error);
      setHasPermission(false);
    }
  };

  const handleSelected = () => {
    if (selected.length === 0) {
      Alert.alert("エラー", "投稿するイメージを選択してください。");
      return;
    }
    navigation.navigate("UploadPhoto", { photo: selected });
  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <View>
          {hasPermission ? (
            <>
              <SlideContainer>
                {selected && selected.length > 0 ? (
                  <GallerySwiper selected={selected} />
                ) : null}
              </SlideContainer>
              {selected && selected.length > 0 ? (
                <Button onPress={handleSelected}>
                  <Text>次へ</Text>
                </Button>
              ) : null}
              <FlatList
                style={{ width: "100%" }}
                data={allPhotos}
                renderItem={({ item }) => (
                  <Fragment key={item.id}>
                    <TouchableOpacity
                      style={{ padding: 7, borderRadius: 10 }}
                      onPress={() => changeSelected(item)}
                    >
                      <Image
                        source={{ uri: item.uri }}
                        style={{
                          width: constants.width / 3 - 14,
                          height: constants.width / 3 - 14,
                          borderRadius: 10,
                          opacity: selected.includes(item) ? 0.5 : 1,
                        }}
                      />
                      {selected.includes(item) ? (
                        <View
                          style={{
                            position: "absolute",
                            top: "15%",
                            right: "15%",
                            borderRadius: 50,
                            backgroundColor: colors.secondary,
                            padding: 3,
                          }}
                        >
                          <Feather
                            name="check"
                            size={16}
                            color={colors.white}
                          />
                        </View>
                      ) : null}
                    </TouchableOpacity>
                  </Fragment>
                )}
                numColumns={3}
                showsHorizontalScrollIndicator={true}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={() => fetchMore(endCursor)}
                onEndReachedThreshold={0.1}
              />
            </>
          ) : null}
        </View>
      )}
    </View>
  );
};
