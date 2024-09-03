import {View, Text, ImageBackground, Linking} from 'react-native';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Marks from './Marks';
import MyNotifications from './MyNotifications';
import ResetPassword from './ResetPassword';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import urlExist from 'url-exist';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function DrawerNav(p) {
  const [username, setUsername] = useState('');
  const [imgUser, setImgUser] = useState(false);
  const [menuIndex, setMenuIndex] = useState(null);
  async function urlexists(url) {
    return urlExist(url).then(val => {
      return val;
    });
  }
  async function getUsername() {
    await AsyncStorage.getItem('Username').then(name => [setUsername(name)]);
    await urlexists(
      'https://victoryschools.in/Victory/Images/' + username + '.jpg',
    ).then(res => {
      setImgUser(res);
    });
  }
  useEffect(() => {
    getUsername();
  });
  let menus = {
    Dashboard: {
      name: 'Dashboard',
      isMenu: false,
      icon: 'home',
      route: 'Dashboard',
    },
    Profile: {
      name: 'My Profile',
      isMenu: false,
      icon: 'person',
      route: 'Profile',
    },
    Performance: {
      name: 'My Performance',
      isMenu: false,
      icon: 'stats-chart',
      route: 'Marks',
    },
    Notifications: {
      name: 'My Notifications',
      isMenu: false,
      icon: 'notifications',
      route: 'My_Notifications',
    },
    Reset_Password: {
      name: 'Reset Password',
      isMenu: false,
      icon: 'finger-print',
      route: 'Reset_Password',
    },
  };
  return (
    <Drawer.Navigator
      useLegacyImplementation={false}
      screenOptions={{
        drawerStyle: {
          width: wp('80'),
        },
      }}
      drawerContent={props => {
        const {routeNames, index} = props.state;
        const focused = routeNames[index];
        return (
          <DrawerContentScrollView {...props}>
            {/* <DrawerItemList {...props} /> */}
            <View
              style={{
                height: hp('20'),
                backgroundColor: '#002244',
                marginTop: -5,
              }}>
              <View
                style={{
                  width: wp('20'),
                  height: hp('10'),
                  borderRadius: 50,
                  alignSelf: 'center',
                  marginTop: hp('2'),
                }}>
                {imgUser ? (
                  <ImageBackground
                    source={{
                      uri:
                        'https://victoryschools.in/Victory/Images/stu_img/' +
                        username +
                        '.jpg',
                    }}
                    style={{width: wp('20'), height: hp('10')}}
                    imageStyle={{width: wp('20'), borderRadius: 50}}
                  />
                ) : (
                  <ImageBackground
                    source={{
                      uri: 'https://victoryschools.in/Victory/App Files/Images/user1.png',
                    }}
                    style={{width: wp('20'), height: hp('10')}}
                    imageStyle={{width: wp('20'), borderRadius: 50}}
                  />
                )}
              </View>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  marginTop: hp('2'),
                  fontSize: wp('5'),
                  fontFamily: 'NotoSerifDisplay-Bold',
                }}>
                Student
              </Text>
            </View>
            {Object.entries(menus).map((menu, index) => {
              if (!menu[1]['isMenu']) {
                return (
                  <DrawerItem
                    label={menu[1]['name']}
                    icon={({focused, color, size}) => (
                      <Ionicons
                        color={color}
                        size={size}
                        name={
                          focused
                            ? menu[1]['icon']
                            : menu[1]['icon'] + '-outline'
                        }
                      />
                    )}
                    style={{borderRadius: 40}}
                    labelStyle={{
                      marginLeft: -20,
                      fontFamily: 'RobotoSlab-Bold',
                    }}
                    focused={focused === menu[1]['route']}
                    activeBackgroundColor="orange"
                    activeTintColor="white"
                    onPress={() => p.navigation.navigate(menu[1]['route'])}
                    key={Math.random()}
                  />
                );
              } else {
                return (
                  <>
                    <DrawerItem
                      label={
                        menuIndex && menuIndex == index
                          ? menu[1]['name'] + '   ▲'
                          : menu[1]['name'] + '   ▼'
                      }
                      icon={({focused, color, size}) => (
                        <Ionicons
                          color={color}
                          size={size}
                          name={
                            focused
                              ? menu[1]['icon']
                              : menu[1]['icon'] + '-outline'
                          }
                        />
                      )}
                      style={{borderRadius: 40}}
                      labelStyle={{
                        marginLeft: -20,
                        fontFamily: 'RobotoSlab-Bold',
                      }}
                      activeBackgroundColor="orange"
                      activeTintColor="white"
                      key={Math.random()}
                      onPress={() => {
                        menuIndex && menuIndex == index
                          ? setMenuIndex(null)
                          : setMenuIndex(index);
                      }}
                    />
                    {menuIndex && menuIndex == index ? (
                      <>
                        <DrawerContentScrollView
                          contentContainerStyle={{padding: 0, margin: 0}}
                          key={Math.random()}>
                          {menu[1]['submenus'].map(submenu => {
                            return (
                              <DrawerItem
                                label={submenu['name']}
                                icon={({focused, color, size}) => (
                                  <Ionicons
                                    color={color}
                                    size={size}
                                    name={
                                      focused
                                        ? submenu['icon']
                                        : submenu['icon'] + '-outline'
                                    }
                                  />
                                )}
                                style={{paddingLeft: wp('5'), borderRadius: 40}}
                                labelStyle={{
                                  marginLeft: -20,
                                  fontFamily: 'RobotoSlab-Bold',
                                }}
                                focused={focused === submenu['route']}
                                activeBackgroundColor="orange"
                                activeTintColor="white"
                                key={Math.random()}
                                onPress={() =>
                                  props.navigation.navigate(submenu['route'])
                                }
                              />
                            );
                          })}
                        </DrawerContentScrollView>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                );
              }
            })}
            <DrawerItem
              label="Logout"
              icon={({focused, color, size}) => (
                <Ionicons
                  color={color}
                  size={size}
                  name={focused ? 'log-out' : 'log-out-outline'}
                />
              )}
              labelStyle={{marginLeft: -20, fontFamily: 'RobotoSlab-Bold'}}
              onPress={p.logout}
            />
            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  fontStyle: 'italic',
                  bottom: hp('-35'),
                  height: hp('40'),
                  left: wp('2'),
                }}>
                Developed and Maintained By{' '}
                <Text
                  style={{
                    color: 'blue',
                    fontFamily: 'NotoSerifDisplay-Bold',
                  }}
                  onPress={() =>
                    Linking.openURL('https://sarathtechgenics.netlify.app')
                  }>
                  Sarath Techgenics
                </Text>
              </Text>
            </View>
          </DrawerContentScrollView>
        );
      }}>
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerTitle: 'Dashboard',
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: 'My Profile',
          title: 'My Profile',
        }}
      />
      <Drawer.Screen
        name="Marks"
        component={Marks}
        options={{
          headerTitle: 'My Performance',
          title: 'My Performance',
        }}
      />
      <Drawer.Screen
        name="My_Notifications"
        component={MyNotifications}
        options={{
          headerTitle: 'My Notifications',
          title: 'My Notifications',
        }}
      />
      <Drawer.Screen
        name="Reset_Password"
        component={ResetPassword}
        options={{
          headerTitle: 'Reset Password',
          title: 'Reset Password',
        }}
      />
    </Drawer.Navigator>
  );
}

function StudentDashboard({onLogout}) {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="DrawerNav" options={{headerShown: false}}>
          {props => <DrawerNav {...props} logout={onLogout} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StudentDashboard;
