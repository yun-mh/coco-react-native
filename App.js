import React, { useEffect, useRef, useState } from "react";
import { AsyncStorage, Image } from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Ionicons, Feather } from "@expo/vector-icons";
import { CachePersistor } from "apollo-cache-persist";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  split,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "apollo-link-error";
import {
  getMainDefinition,
  offsetLimitPagination,
} from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import Gate from "./components/Gate";
import { AuthProvider } from "./contexts/AuthContext";
import { PersistProvider } from "./contexts/PersistContext";

import * as Notifications from "expo-notifications";
import * as WebBrowser from "expo-web-browser";

// const httpLink = new HttpLink({
//   uri:
//     process.env.NODE_ENV === "development"
//       ? "http://localhost:4000/"
//       : "https://api-coco.herokuapp.com/",
// });

const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === "development"
      ? "https://api-coco.herokuapp.com/"
      : "https://api-coco.herokuapp.com/",
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
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
  uri: `ws://api-coco.herokuapp.com/`,
  options: {
    reconnect: true,
    connectionParams: async () => {
      const token = await AsyncStorage.getItem("jwt");
      return {
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    },
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
  const [persistor, setPersistor] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const notificationReceivedListener = useRef();

  useEffect(() => {
    notificationReceivedListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const url = response.notification.request.content.data.url;
        if (url !== "" && url !== undefined) {
          WebBrowser.openBrowserAsync(url);
        }
      }
    );
    // return () => subscription.remove();
    return () => {
      Notifications.removeNotificationSubscription(
        notificationReceivedListener
      );
    };
  }, []);

  const handleFinish = async () => {
    const cache = new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            viewFeed: offsetLimitPagination(),
            viewUser: {
              merge: true,
            },
          },
        },
      },
    });
    const persistor = new CachePersistor({
      cache,
      storage: AsyncStorage,
    });

    const client = new ApolloClient({
      cache,
      link: ApolloLink.from([
        errorLink,
        split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return (
              definition.kind === "OperationDefinition" &&
              definition.operation === "subscription"
            );
          },
          wsLink,
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
    setPersistor(persistor);
    setIsReady(true);
  };

  const preload = () => {
    try {
      const images = [
        require("./assets/intro1.jpg"),
        require("./assets/intro2.jpg"),
        require("./assets/intro3.jpg"),
        require("./assets/walking.jpg"),
        require("./assets/logo_title.png"),
        require("./assets/logo_qr.png"),
        "https://coco-for-dogs.s3-ap-northeast-1.amazonaws.com/anonymous.jpg",
        "https://coco-for-dogs.s3-ap-northeast-1.amazonaws.com/anonymous-dog.jpg",
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
      <PersistProvider persistor={persistor}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <Gate />
        </AuthProvider>
      </PersistProvider>
    </ApolloProvider>
  ) : (
    <AppLoading
      startAsync={preload}
      onError={console.warn}
      onFinish={handleFinish}
    />
  );
}
