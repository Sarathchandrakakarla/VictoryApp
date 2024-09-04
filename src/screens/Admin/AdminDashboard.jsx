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
import StudentDetails from './Student/StudentDetails';
import Camera from './Camera';
import SearchStudent from './Student/SearchStudent';
import Dashboard from './Dashboard';
import CamGallery from './CamGallery';
import StudentAttendance from './Student/StudentAttendance';
import DateWiseAttendance from './Student/DateWiseAttendance';
import ClassWiseMarks from './Student/ClassWiseMarks';
import IndividualMarks from './Student/IndividualMarks';
import VanAttendance from './Student/VanAttendance';
import DateWiseVanAttendanceView from './Student/DateWiseVanAttendance';
import SendNotifications from './SendNotifications';
import MyNotifications from './MyNotifications';
import ManageNotifications from './ManageNotifications';
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
    if (username == '' || !imgUser) {
      getUsername();
    }
  });
  let menus = {
    Dashboard: {
      name: 'Dashboard',
      isMenu: false,
      icon: 'home',
      route: 'Dashboard',
    },
    Student: {
      name: 'Student',
      isMenu: true,
      icon: 'person',
      submenus: [
        {
          name: 'Student Details',
          icon: 'person',
          route: 'StudentDetails',
        },
        {
          name: 'Search Student',
          icon: 'search',
          route: 'SearchStudent',
        },
      ],
    },
    Attendance: {
      name: 'Attendance',
      isMenu: true,
      icon: 'person-add',
      submenus: [
        {
          name: 'Student Attendance',
          icon: 'person-add',
          route: 'Attendance',
        },
        {
          name: 'Date Wise Attendance View',
          icon: 'people',
          route: 'Date_Wise_Attendance',
        },
        {
          name: 'Van Attendance',
          icon: 'person-add',
          route: 'VanAttendance',
        },
        {
          name: 'Van Attendance View',
          icon: 'people',
          route: 'Date_Wise_Van_Attendance',
        },
      ],
    },
    Marks: {
      name: 'Marks',
      isMenu: true,
      icon: 'stats-chart',
      submenus: [
        {
          name: 'Class Wise Marks',
          icon: 'stats-chart',
          route: 'Class_Wise_Marks',
        },
        {
          name: 'Individual Marks',
          icon: 'trending-up',
          route: 'Individual_Marks',
        },
      ],
    },
    Notifications: {
      name: 'Notifications',
      isMenu: true,
      icon: 'alarm',
      submenus: [
        {
          name: 'Send Notifications',
          icon: 'send',
          route: 'Send_Notifications',
        },
        {
          name: 'Manage Notifications',
          icon: 'alarm',
          route: 'Manage_Notifications',
        },
      ],
    },
    My_Notifications: {
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
          width: wp('84'),
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
                        'https://victoryschools.in/Victory/Images/' +
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
                Administrator
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
                  bottom: hp('-22'),
                  height: hp('25'),
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
        name="StudentDetails"
        component={StudentDetails}
        options={{headerTitle: 'Student Details', title: 'Student Details'}}
      />
      <Drawer.Screen
        name="SearchStudent"
        component={SearchStudent}
        options={{headerTitle: 'Search Student', title: 'Search Student'}}
      />
      <Drawer.Screen
        name="Attendance"
        component={StudentAttendance}
        options={{
          headerTitle: 'Student Attendance',
          title: 'Student Attendance',
        }}
      />
      <Drawer.Screen
        name="Date_Wise_Attendance"
        component={DateWiseAttendance}
        options={{
          headerTitle: 'Date Wise Attendance View',
          title: 'Date Wise Attendance View',
        }}
      />
      <Drawer.Screen
        name="VanAttendance"
        component={VanAttendance}
        options={{
          headerTitle: 'Student Van Attendance',
          title: 'Student Van Attendance',
        }}
      />
      <Drawer.Screen
        name="Date_Wise_Van_Attendance"
        component={DateWiseVanAttendanceView}
        options={{
          headerTitle: 'Date Wise Van Attendance View',
          title: 'Date Wise Van Attendance View',
        }}
      />
      <Drawer.Screen
        name="Class_Wise_Marks"
        component={ClassWiseMarks}
        options={{
          headerTitle: 'Class Wise Marks View',
          title: 'Class Wise Marks View',
        }}
      />
      <Drawer.Screen
        name="Individual_Marks"
        component={IndividualMarks}
        options={{
          headerTitle: 'Individual Marks View',
          title: 'Individual Marks View',
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
        name="Send_Notifications"
        component={SendNotifications}
        options={{
          headerTitle: 'Send Notifications',
          title: 'Send Notifications',
        }}
      />
      <Drawer.Screen
        name="Manage_Notifications"
        component={ManageNotifications}
        options={{
          headerTitle: 'Manage Notifications',
          title: 'Manage Notifications',
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

function AdminDashboard({onLogout}) {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="DrawerNav" options={{headerShown: false}}>
          {props => <DrawerNav {...props} logout={onLogout} />}
        </Stack.Screen>
        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CamGallery"
          component={CamGallery}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AdminDashboard;
