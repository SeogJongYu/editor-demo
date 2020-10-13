// Version 2
import {Platform} from 'react-native';
import {
  API_SERVER_WEB,
  API_SERVER_IOS,
  API_SERVER_ANDROID,
} from '@env';

export default {
  API_SERVER: Platform.select({
    web: API_SERVER_WEB,
    ios: API_SERVER_IOS,
    android: API_SERVER_ANDROID,
  }),
};
