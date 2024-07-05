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
import Dashboard from './Dashboard';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function DrawerNav(p) {
  return (
    <Drawer.Navigator
      useLegacyImplementation={false}
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
        name="StudentDetails"
        component={StudentDetails}
        options={{headerTitle: 'Student Details',title:"Student Details"}}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AdminDashboard;
