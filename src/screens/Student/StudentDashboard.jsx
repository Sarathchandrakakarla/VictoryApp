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
import ResetPassword from './ResetPassword';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function DrawerNav(p) {
  return (
    <Drawer.Navigator
      useLegacyImplementation={false}
      screenOptions={{
        drawerStyle: {
          width: wp('70'),
        },
      }}
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Logout"
              icon={({focused, color, size}) => (
                <Ionicons
                  color={color}
                  size={size}
                  name={focused ? 'log-out' : 'log-out-outline'}
                />
              )}
              onPress={p.logout}
            />
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
