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

function Login(username, password, navigateFun, url) {
  if (username == '' || password == '') {
    ToastAndroid.show('Please Fill All The Details!', ToastAndroid.SHORT);
  } else {
    fetch('http://192.168.3.107:3000/' + url, {
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
        console.log('Error: ' + err);
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
            Login(Username, Password, props.onNavigate, 'admin_login')
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
            Login(Username, Password, props.onNavigate, 'student_login')
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
            Login(Username, Password, props.onNavigate, 'faculty_login')
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
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  h2: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  input: {
    width: 300,
    height: 40,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderRadius: 40,
    color: '#000',
  },
  loginContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#000',
    width: 150,
    padding: 10,
    marginTop: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
});
