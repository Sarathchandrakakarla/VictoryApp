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
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function DrawerNav(p) {
  return (
    <Drawer.Navigator
      useLegacyImplementation={false}
      screenOptions={{
        drawerStyle: {
          width: wp('80'),
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
