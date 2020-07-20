import React from "react";
import { Feather } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SearchButton = () => {
  const navigation = useNavigation();

  return (
    <View style={{ marginRight: 8 }}>
      <TouchableOpacity onPress={() => navigation.navigate("Search")}>
        <Feather
          name="search"
          size={24}
          color={"grey"}
          style={{ marginLeft: 8 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchButton;
