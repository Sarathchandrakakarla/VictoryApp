/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
messaging()
  .subscribeToTopic('All')
  .then(async () => {
    try {
      AsyncStorage.getItem('Topics').then(topics => {
        if (topics) {
          const topicsArray = JSON.parse(topics);
          console.log(topicsArray);
          if (!topicsArray.includes('All')) topicsArray.push('All');
          AsyncStorage.setItem('Topics', JSON.stringify(topicsArray));
        } else {
          AsyncStorage.setItem('Topics', JSON.stringify(['All']));
        }
      });
    } catch (err) {
      console.log(err);
    }
  });

AppRegistry.registerComponent(appName, () => App);
