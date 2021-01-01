import envs from "./components/env";

export default ({ config }) => {
  console.log(config);
  let newConfig = {
    ...config,
  };
  newConfig.android.config.googleMaps.apiKey = envs.googleMapsApiKey;
  newConfig.hooks.postPublish[0].config.authToken = envs.sentryKey;
  return {
    ...newConfig,
  };
};
