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
import SearchStudent from './Student/SearchStudent';
import Dashboard from './Dashboard';
import StudentAttendance from './Student/StudentAttendance';
import DateWiseAttendance from './Student/DateWiseAttendance';
import ClassWiseMarks from './Student/ClassWiseMarks';
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
        name="Class_Wise_Marks"
        component={ClassWiseMarks}
        options={{
          headerTitle: 'Class Wise Marks View',
          title: 'Class Wise Marks View',
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

function FacultyDashboard({onLogout}) {
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

export default FacultyDashboard;
