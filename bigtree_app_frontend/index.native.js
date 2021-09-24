import {AppRegistry} from 'react-native';

import Root from './app/Root';
import appConfig from './app.json';

AppRegistry.registerComponent(appConfig.name, () => Root);
