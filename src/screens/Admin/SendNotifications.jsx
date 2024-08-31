import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
const SendNotifications = () => {
  const [temporary, setTemporary] = useState(false);
  const [Topic, setTopic] = useState();
  const [Notification, setNotification] = useState();
  const [readOnly, setReadOnly] = useState(true);
  const [text, setText] = useState();
  let topics = [
    'Student',
    'Faculty',
    'Admin',
    'All Members',
    'PreKG',
    'LKG',
    'UKG',
  ];
  for (let i = 1; i <= 10; i++) {
    topics.push(i + '_CLASS');
  }
  let notifications = [
    {label: 'Results Declared', text: 'Results have been released for <Exam>'},
    {label: 'Custom', text: ''},
  ];
  useEffect(() => {
    notifications.forEach(notification => {
      if (notification && notification.label === Notification) {
        setText(notification.text.toString());
        setReadOnly(false);
        return;
      } else if (Notification == 'selectnotification') {
        setReadOnly(true);
        setText();
      }
    });
  }, [Notification]);

  function sendNotification() {
    if (!Topic || Topic == 'selectgroup') {
      ToastAndroid.show('Please Select Group', ToastAndroid.SHORT);
      return;
    }
    if (!Notification || Notification == 'selectnotification') {
      ToastAndroid.show('Please Select Notification Type', ToastAndroid.SHORT);
      return;
    }
    if (!text || text.toString().trim() == '') {
      ToastAndroid.show('Please Enter Notification Text', ToastAndroid.SHORT);
      return;
    }
    axios
      .post(
        'http://18.61.98.208:3000/notifications/send',
        {
          Topic: Topic,
          Text: text,
          Temporary: temporary,
        },
        {
          timeout: 20000,
        },
      )
      .then(res => {
        if (res.data.success)
          ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        else ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
      })
      .catch(err => {
        console.log(err);
      });
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            margin: wp('5'),
            marginLeft: wp('15'),
            flexDirection: 'column',
            gap: hp('2'),
          }}>
          <Picker
            selectedValue={Topic}
            onValueChange={itemValue => {
              setTopic(itemValue);
            }}
            mode="dropdown"
            dropdownIconColor="#000"
            dropdownIconRippleColor="#000"
            style={styles.picker}>
            <Picker.Item
              label="-- Select Group --"
              value="selectgroup"
              key={Math.random()}
              style={{color: '#fff'}}
            />
            {topics.map(item => {
              return (
                <Picker.Item
                  style={styles.picker_item}
                  label={item}
                  value={item}
                  key={item}
                />
              );
            })}
          </Picker>
          <Picker
            selectedValue={Notification}
            onValueChange={itemValue => {
              setNotification(itemValue);
            }}
            mode="dropdown"
            dropdownIconColor="#000"
            dropdownIconRippleColor="#000"
            style={styles.picker}>
            <Picker.Item
              label="-- Select Notification --"
              value="selectnotification"
              key={Math.random()}
            />
            {notifications.map(item => {
              return (
                <Picker.Item
                  style={styles.picker_item}
                  label={item['label']}
                  value={item['label']}
                  key={item}
                />
              );
            })}
          </Picker>
          <TextInput
            onChangeText={val => setText(val)}
            style={styles.input}
            value={text}
            multiline={true}
            numberOfLines={4}
            readOnly={readOnly}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Checkbox
              status={temporary ? 'checked' : 'unchecked'}
              onPress={() => {
                setTemporary(!temporary);
              }}
              color="blue"
            />
            <Text style={{color: '#000'}}>Temporary Notification</Text>
          </View>
          <View
            style={{alignItems: 'center', flexDirection: 'row', gap: wp('2')}}>
            <TouchableOpacity
              style={styles.button_show}
              onPress={() => {
                sendNotification();
              }}>
              <Text style={{color: '#fff'}}>Send Notification</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button_clear}
              onPress={() => {
                setTopic();
                setNotification();
                setText();
                setReadOnly(true);
              }}>
              <Text style={{color: '#fff'}}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SendNotifications;

const styles = StyleSheet.create({
  picker: {
    width: wp('70'),
    backgroundColor: '#fff',
    color: '#000',
  },
  picker_item: {
    color: '#000',
    backgroundColor: '#fff',
  },
  input: {
    width: wp('70'),
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
  button_clear: {
    backgroundColor: '#ffa500',
    width: wp('35'),
    padding: 10,
    marginTop: 0,
    borderRadius: 50,
    alignItems: 'center',
  },
});
