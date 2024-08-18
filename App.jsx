import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import Home from './src/screens/Home';
import About from './src/screens/About';
import Logins from './src/screens/Logins';
import {
  AdminLogin,
  StudentLogin,
  FacultyLogin,
} from './src/screens/logins/Logins';
import Notifications from './src/screens/Notifications';
import Contact from './src/screens/Contact';
import Gallery from './src/screens/Gallery';
import AdminDashboard from './src/screens/Admin/AdminDashboard';
import FacultyDashboard from './src/screens/Faculty/FacultyDashboard';
import StudentDashboard from './src/screens/Student/StudentDashboard';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
function MainPage() {
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        remoteMessage['notification']['title'],
        remoteMessage['notification']['body'],
      );
    });
  }, []);
  useEffect(() => {
    async function tokengen() {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      //console.log(token);
    }
    tokengen();
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          paddingBottom: 5,
          height: 55,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          color: 'black',
        },
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={size}
            />
          ),
        }}
        navigate={navigation}
        component={Home}
      />
      <Tab.Screen
        name="About"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name={
                focused ? 'information-circle' : 'information-circle-outline'
              }
              color={color}
              size={size}
            />
          ),
        }}
        component={About}
      />
      <Tab.Screen
        name="Gallery"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name={focused ? 'images' : 'images-outline'}
              color={color}
              size={size}
            />
          ),
        }}
        component={Gallery}
      />
      <Tab.Screen
        name="Logins"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name={focused ? 'log-in' : 'log-in-outline'}
              color={color}
              size={size}
            />
          ),
        }}
        component={Logins}
      />
    </Tab.Navigator>
  );
}

const Navigator = () => {
  let [isloggedin, setisloggedin] = useState('false');
  let [usertype, setUserType] = useState(null);
  useEffect(() => {
    const checkLogin = async () => {
      let isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      isLoggedIn == 'true' ? setisloggedin('true') : '';
      let UserType = await AsyncStorage.getItem('UserType');
      setUserType(UserType);
    };

    checkLogin();
  });
  const handleLogout = async navigation => {
    try {
      AsyncStorage.getItem('Topics').then(topics => {
        let topicsArray = JSON.parse(topics);
        console.log(topicsArray);
        topicsArray.forEach(topic => {
          if (topic != 'All') {
            messaging()
              .unsubscribeFromTopic(topic)
              .then(() => {
                console.log('Unsubscribed from ' + topic);
              });
          }
        });
      });
      await AsyncStorage.setItem('Topics', JSON.stringify(['All']));
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('Username');
      await AsyncStorage.removeItem('Name');
      await AsyncStorage.removeItem('Role');
      await AsyncStorage.removeItem('UserType');
      setisloggedin('false');
      setUserType(null);

      navigation.navigate('MainPage');
    } catch (err) {
      console.log(err);
    }
  };

  const handleNavigate = (navigation, page) => {
    const checkLogin = async () => {
      let isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      isLoggedIn == 'true' ? setisloggedin('true') : setisloggedin('false');
      let UserType = await AsyncStorage.getItem('UserType');
      setUserType(UserType);
    };

    checkLogin().then(() => {
      navigation.replace(page);
    });
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isloggedin == 'true' && usertype ? (
          usertype == 'Admin' ? (
            <Stack.Screen name="AdminDashboard" options={{headerShown: false}}>
              {props => (
                <AdminDashboard
                  {...props}
                  onLogout={() => handleLogout(props.navigation)}
                />
              )}
            </Stack.Screen>
          ) : usertype == 'Faculty' ? (
            <Stack.Screen
              name="FacultyDashboard"
              options={{headerShown: false}}>
              {props => (
                <FacultyDashboard
                  {...props}
                  onLogout={() => handleLogout(props.navigation)}
                />
              )}
            </Stack.Screen>
          ) : usertype == 'Student' ? (
            <Stack.Screen
              name="StudentDashboard"
              options={{headerShown: false}}>
              {props => (
                <StudentDashboard
                  {...props}
                  onLogout={() => handleLogout(props.navigation)}
                />
              )}
            </Stack.Screen>
          ) : (
            <Stack.Screen
              name="MainPage"
              component={MainPage}
              options={{headerShown: false}}
            />
          )
        ) : (
          <Stack.Screen
            name="MainPage"
            component={MainPage}
            options={{headerShown: false}}
          />
        )}
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Contact"
          component={Contact}
          options={{headerShown: true, headerTitle: 'Contact Us'}}
        />
        <Stack.Screen
          name="AdminLogin"
          options={{headerShown: true, headerTitle: ''}}>
          {props => (
            <AdminLogin
              {...props}
              onNavigate={() =>
                handleNavigate(props.navigation, 'AdminDashboard')
              }
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="FacultyLogin"
          options={{headerShown: true, headerTitle: ''}}>
          {props => (
            <FacultyLogin
              {...props}
              onNavigate={() =>
                handleNavigate(props.navigation, 'FacultyDashboard')
              }
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="StudentLogin"
          options={{headerShown: true, headerTitle: ''}}>
          {props => (
            <StudentLogin
              {...props}
              onNavigate={() =>
                handleNavigate(props.navigation, 'StudentDashboard')
              }
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return <Navigator />;
};

export default App;
