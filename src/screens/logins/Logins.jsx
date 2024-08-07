import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';

function Login(username, password, navigateFun, url, setusername, usertype) {
  if (username == '' || password == '') {
    ToastAndroid.show('Please Fill All The Details!', ToastAndroid.SHORT);
  } else {
    /* async function fetchWithTimeout(resource, options = {}) {
      const {timeout = 5000} = options;

      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(resource, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(id);

      return response;
    }
    //https://victoryserver.onrender.com/
    fetchWithTimeout('http://18.61.98.208:3000/' + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Username: username,
        Password: password,
      }),
    })
      .then(response => response.json())
      .then(async res => {
        if (res.success) {
          await AsyncStorage.setItem('isLoggedIn', 'true');
          navigateFun();
          ToastAndroid.show('Login Successful', ToastAndroid.LONG);
        } else {
          ToastAndroid.show(res.message, ToastAndroid.LONG);
        }
      })
      .catch(err => {
        if (err.toString() == 'AbortError: Aborted') {
          ToastAndroid.show('Server is not responding', ToastAndroid.LONG);
        } else {
          ToastAndroid.show(err.toString(), ToastAndroid.LONG);
          console.log('Error: ' + err);
          //setusername(err.toString());
        }
      }); */
    axios
      .post(
        'http://18.61.98.208:3000/' + url,
        {
          Username: username,
          Password: password,
        },
        {
          timeout: 5000,
        },
      )
      .then(async res => {
        if (res.data.success) {
          await AsyncStorage.setItem('isLoggedIn', 'true');
          await AsyncStorage.setItem('Username', username);
          await AsyncStorage.setItem('Name', res.data.data.Name);
          await AsyncStorage.setItem('UserType', usertype);
          navigateFun();
          ToastAndroid.show('Login Successful', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(res.data.message, ToastAndroid.LONG);
        }
      })
      .catch(err => {
        console.log('Error: ' + err);
        ToastAndroid.show(err.toString(), ToastAndroid.LONG);
      });
  }
}
export const AdminLogin = props => {
  let [Username, SetUsername] = useState('');
  let [Password, SetPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.h2}>Admin Login</Text>
      <View style={styles.loginContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={'black'}
          value={Username}
          onChangeText={text => SetUsername(text.toUpperCase())}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={'black'}
          secureTextEntry={true}
          value={Password}
          onChangeText={text => SetPassword(text)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            Login(
              Username,
              Password,
              props.onNavigate,
              'admin_login',
              SetUsername,
              'Admin',
            )
          }>
          <Text style={{color: '#fff'}}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const StudentLogin = props => {
  let [Username, SetUsername] = useState('');
  let [Password, SetPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.h2}>Student Login</Text>
      <View style={styles.loginContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={'black'}
          value={Username}
          onChangeText={text => SetUsername(text.toUpperCase())}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={'black'}
          secureTextEntry={true}
          value={Password}
          onChangeText={text => SetPassword(text)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            Login(
              Username,
              Password,
              props.onNavigate,
              'student_login',
              SetUsername,
              'Student',
            )
          }>
          <Text style={{color: '#fff'}}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const FacultyLogin = props => {
  let [Username, SetUsername] = useState('');
  let [Password, SetPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.h2}>Faculty Login</Text>
      <View style={styles.loginContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={'black'}
          value={Username}
          onChangeText={text => SetUsername(text.toUpperCase())}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={'black'}
          secureTextEntry={true}
          value={Password}
          onChangeText={text => SetPassword(text)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            Login(
              Username,
              Password,
              props.onNavigate,
              'faculty_login',
              SetUsername,
              'Faculty',
            )
          }>
          <Text style={{color: '#fff'}}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA',
    alignItems: 'center',
  },
  h2: {
    fontSize: wp('6'),
    textAlign: 'center',
    color: '#000',
    marginTop: hp('20'),
    fontFamily: 'RobotoSlab-Bold',
    letterSpacing: 2,
  },
  input: {
    width: wp('75'),
    height: hp('5'),
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderRadius: 40,
    color: '#000',
  },
  loginContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#000',
    width: wp('40'),
    padding: 10,
    marginTop: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
});
