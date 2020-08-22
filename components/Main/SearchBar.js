import React from "react";
import { TextInput } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../colors";

const SearchBar = ({ onChange, value, onSubmit }) => (
  <TextInput
    style={{
      width: wp("100%") / 1.5,
      height: 35,
      padding: 10,
      borderStyle: "solid",
      borderBottomColor: colors.gray,
      borderBottomWidth: 1,
      textAlign: "center",
    }}
    returnKeyType="search"
    autoCapitalize="none"
    value={value}
    placeholder={"検索"}
    placeholderTextColor={colors.gray}
    onChangeText={onChange}
    onSubmitEditing={onSubmit}
  />
);

export default SearchBar;
