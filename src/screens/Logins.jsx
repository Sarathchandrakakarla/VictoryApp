import {
  Image,
  Text,
  ScrollView,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
    <ScrollView style={styles.container}>
      {logins.map(login => {
        return (
          <ImageBackground
            source={{
              uri: 'https://victoryschools.in/Victory/App Files/Images/background2.jpg',
            }}
            imageStyle={{borderRadius: 20}}
            style={styles.login}
            key={login.id}>
            <Text
              style={{
                color: '#fff',
                marginVertical: 10,
                fontSize: wp('5'),
                fontFamily: 'RobotoSlab-Bold',
              }}>
              {login.Title}
            </Text>
            <Text
              style={{
                color: '#fff',
                marginVertical: 10,
                textAlign: 'justify',
                fontFamily: 'RobotoSlab_Regular',
                fontSize: wp('3.3'),
              }}>
              {login.Content}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate(login.url)}>
              <Text style={{color: '#000', fontFamily: 'RobotoSlab_Regular'}}>
                {login.Title}
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        );
      })}
    </ScrollView>
  );
};

export default Logins;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA',
  },
  login: {
    height: hp('29'),
    borderColor: '#000',
    marginVertical: 10,
    alignItems: 'center',
    margin: 40,
    marginHorizontal: wp('5'),
    padding: 10,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#fff',
    width: wp('50'),
    padding: 10,
    marginTop: hp('1'),
    borderRadius: 50,
    alignItems: 'center',
  },
});
