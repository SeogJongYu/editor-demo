import React from 'react';
import ReactDOM from 'react-dom';
import {Platform, AppRegistry} from 'react-native';
import Root from './app/Root';
import {name as appName} from './app.json';

if (Platform.OS === 'web') {
  ReactDOM.render(<Root />, document.getElementById('root'));
} else {
  AppRegistry.registerComponent(appName, () => Root);
}
