import React from "react";
import { StyleSheet, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Swiper from "react-native-swiper";

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

const GallerySwiper = ({ selected }) => {
  return (
    <Swiper
      style={styles.wrapper}
      loop={false}
      showsHorizontalScrollIndicator={true}
      showsPagination={false}
    >
      {selected.length > 0 &&
        selected.map((file) => (
          <Image
            key={file.id}
            style={{
              width: wp("100%"),
              height: hp("50%"),
            }}
            source={{ uri: file.uri }}
          />
        ))}
    </Swiper>
  );
};

export default GallerySwiper;
