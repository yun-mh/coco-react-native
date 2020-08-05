import React, { useState } from "react";
import { AsyncStorage } from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Ionicons, Feather } from "@expo/vector-icons";
import { persistCache } from "apollo-cache-persist";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  split,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import Gate from "./components/Gate";
import { AuthProvider } from "./contexts/AuthContext";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/",
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("jwt");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true,
  },
});

const cacheImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });

const cacheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const handleFinish = async () => {
    const cache = new InMemoryCache();
    await persistCache({
      cache,
      storage: AsyncStorage,
    });

    const client = new ApolloClient({
      cache,
      link: ApolloLink.from([
        split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return (
              definition.kind === "OperationDefinition" &&
              definition.operation === "subscription"
            );
          },
          authLink.concat(wsLink),
          authLink.concat(httpLink)
        ),
      ]),
    });

    const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
    if (!isLoggedIn || isLoggedIn === "false") {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
    setClient(client);
    setIsReady(true);
  };

  const preload = () => {
    try {
      const images = [
        require("./assets/intro1.jpg"),
        require("./assets/intro2.jpg"),
        require("./assets/intro3.jpg"),
        require("./assets/anonymous.png"),
      ];
      const fonts = [Ionicons.font, Feather.font];
      const imagePromises = cacheImages(images);
      const fontPromises = cacheFonts(fonts);
      return Promise.all([...imagePromises, ...fontPromises]);
    } catch (error) {
      console.warn(error);
    }
  };

  return isReady && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <AuthProvider isLoggedIn={isLoggedIn}>
        <Gate />
      </AuthProvider>
    </ApolloProvider>
  ) : (
    <AppLoading
      startAsync={preload}
      onError={console.error}
      onFinish={handleFinish}
    />
  );
}
