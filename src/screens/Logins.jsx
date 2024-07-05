import {
  Image,
  Text,
  ScrollView,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
const Logins = () => {
  const navigation = useNavigation();
  let logins = [
    {
      id: 1,
      Title: 'Admin Login',
      Content:
        "School Administrators to manage various aspects of the school's operations, such as student records, staff information, academic schedules, and communication with parents.",
      url: 'AdminLogin',
    },
    {
      id: 2,
      Title: 'Student Login',
      Content:
        'Students to access personalized information related to their academic progress, class schedules, grades, assignments, and other relevant school-related data.',
      url: 'StudentLogin',
    },
    {
      id: 3,
      Title: 'Faculty Login',
      Content:
        'Faculty members to access and manage academic resources, student information, grading systems and monitor student progress.',
      url: 'FacultyLogin',
    },
  ];
  return (
    <View style={styles.container}>
      {logins.map(login => {
        return (
          <View style={styles.login} key={login.id}>
            <Text
              style={{
                color: '#fff',
                marginVertical: 10,
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {login.Title}
            </Text>
            <Text style={{color: '#fff', marginVertical: 10}}>
              {login.Content}
            </Text>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate(login.url)}>
              <Text style={{color: '#000'}}>{login.Title}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default Logins;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginHorizontal: 30,
  },
  logo: {
    width: 420,
    height: 180,
  },
  h2: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
  login: {
    height: 220,
    borderColor: '#000',
    borderWidth: 2,
    marginVertical: 20,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#0066b2',
  },
  button: {
    backgroundColor: '#fff',
    width: 150,
    padding: 10,
    marginTop: 0,
    borderRadius: 50,
    alignItems: 'center',
  },
});
