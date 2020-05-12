module.exports = {
  preset: 'react-native-web',
  automock: false,
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
  moduleFileExtensions: [
    'web.js',
    'native.js',
    'android.js',
    'ios.js',
    'js',
    'json',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.init.js'],
};
