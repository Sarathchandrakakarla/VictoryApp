import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
const ResetPassword = () => {
  const [username, setUsername] = useState('');
  async function getUsername() {
    await AsyncStorage.getItem('Username').then(name => [setUsername(name)]);
  }
  useEffect(() => {
    getUsername();
  });
  const [oldpass, setOldPass] = useState(null);
  const [newpass, setNewPass] = useState(null);
  const [err, setErr] = useState(null);
  useEffect(() => {
    checkPassword();
  }, [oldpass, newpass]);
  function checkPassword() {
    if (oldpass && newpass && oldpass.trim() == newpass.trim()) {
      setErr('Old and New password should not be the same.');
    } else {
      setErr();
    }
  }
  function changePassword() {
    if (!oldpass || oldpass.trim() == '') {
      ToastAndroid.show('Please Enter Old Password', ToastAndroid.SHORT);
      return;
    }
    if (!newpass || newpass.trim() == '') {
      ToastAndroid.show('Please Enter New Password', ToastAndroid.SHORT);
      return;
    }
    if (err) {
      ToastAndroid.show(err, ToastAndroid.SHORT);
      return;
    }
    axios
      .post(
        'http://18.61.98.208:3000/admin/resetpassword',
        {
          Username: username,
          OldPassword: oldpass,
          NewPassword: newpass,
        },
        {
          timeout: 5000,
        },
      )
      .then(res => {
        if (res.data.success) {
          setOldPass(null);
          setNewPass(null);
          setErr(null);
        }
        ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
      })
      .catch(err => {
        console.log(err);
      });
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Change Your Password</Text>
      <View style={styles.input_container}>
        <View style={styles.row}>
          <Text style={styles.label}>Old Password</Text>
          <TextInput
            style={styles.input}
            value={oldpass}
            onChangeText={val => {
              setOldPass(val);
            }}></TextInput>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            value={newpass}
            onChangeText={val => {
              setNewPass(val);
            }}></TextInput>
        </View>
        {err ? (
          <View style={styles.row}>
            <Text style={styles.error}>⚠️{err}</Text>
          </View>
        ) : (
          <></>
        )}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button_show}
            onPress={() => changePassword()}>
            <Text style={{color: '#fff'}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#000',
    fontSize: wp('5'),
    textAlign: 'center',
    marginTop: hp('10'),
    fontFamily: 'RobotoSlab-Bold',
  },
  input_container: {
    width: wp('90'),
    height: hp('50'),
    alignItems: 'center',
    margin: wp('5'),
    marginTop: hp('10'),
  },
  row: {
    flexDirection: 'row',
    gap: wp('5'),
    marginVertical: hp('2'),
  },
  label: {
    color: '#000',
    fontSize: wp('4'),
  },
  error: {
    color: 'red',
    fontSize: wp('3'),
  },
  input: {
    width: 250,
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    color: '#000',
  },
  button_show: {
    backgroundColor: '#006F40',
    width: wp('35'),
    padding: 10,
    marginTop: 0,
    borderRadius: 50,
    alignItems: 'center',
  },
});
