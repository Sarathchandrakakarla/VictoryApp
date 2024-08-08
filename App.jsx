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
import AdminDashboard from './src/screens/Admin/AdminDashboard';
import FacultyDashboard from './src/screens/Faculty/FacultyDashboard';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
function MainPage() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(remoteMessage['notification']['title'], remoteMessage['notification']['body']);
    });

    return unsubscribe;
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
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('Username');
      await AsyncStorage.removeItem('Name');
      await AsyncStorage.removeItem('UserType');
      setisloggedin('false');
      setUserType(null);

      navigation.navigate('MainPage');
      /* const checkLogin = async () => {
        let isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        isLoggedIn == 'true' ? setisloggedin('true') : setisloggedin('false');
      }; */
      /* checkLogin().then(() => {
      }); */
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
            <Stack.Screen name="AdminDashboard" options={{headerShown: false}}>
              {props => (
                <AdminDashboard
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
