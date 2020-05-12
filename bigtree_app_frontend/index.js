import {Platform, AppRegistry} from 'react-native';
import Root from './app/Root';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Root);

if (Platform.OS === 'web') {
  AppRegistry.runApplication(appName, {
    rootTag: document.getElementById('root'),
  });
}
