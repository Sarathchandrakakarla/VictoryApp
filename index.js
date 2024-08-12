/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
messaging()
  .subscribeToTopic('All')
  .then(() => {});

AppRegistry.registerComponent(appName, () => App);
