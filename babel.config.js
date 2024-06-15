module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', {
        targets: {
          esmodules: true,
        },
      }],
    ],
    plugins: [
      // has to be listed last
      'react-native-reanimated/plugin',
    ],
  };
};
