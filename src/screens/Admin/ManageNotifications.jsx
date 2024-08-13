import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useEffect, useState} from 'react';
import {DataTable} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
const ManageNotifications = () => {
  const [loading, setLoading] = useState(false);
  const [Topic, setTopic] = useState();
  const [Notifications, setNotifications] = useState([]);
  let topics = [
    'Sent To All',
    'Student',
    'Faculty',
    'Admin',
    'All Notifications',
    'PreKG',
    'LKG',
    'UKG',
  ];
  for (let i = 1; i <= 10; i++) {
    topics.push(i + '_CLASS');
  }
  let s_no = 1;

  function getNotifications() {
    if (!Topic || Topic == 'selectgroup') {
      setLoading(false);
      ToastAndroid.show('Please Select Group', ToastAndroid.SHORT);
      return;
    }
    let Topics;
    if (Topic == 'All Notifications') {
      Topics = topics.map(topic => {
        if (topic != 'All Notifications') {
          return topic;
        } else {
          return 'All';
        }
      });
    } else if (Topic == 'Sent To All') {
      Topics = ['All'];
    } else {
      Topics = [Topic];
    }
    axios
      .post(
        'http://18.61.98.208:3000/notifications/fetchall',
        {
          Topics: Topics,
        },
        {
          timeout: 20000,
        },
      )
      .then(res => {
        if (res.data.success) {
          if (res.data.data.length == 0) {
            setNotifications([]);
            ToastAndroid.show(
              'No Notifications Found for this Group',
              ToastAndroid.SHORT,
            );
          } else {
            setNotifications(res.data.data);
          }
        } else ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  function deleteNotification(Id) {
    axios
      .post(
        'http://18.61.98.208:3000/notifications/delete',
        {
          Id: Id,
        },
        {
          timeout: 20000,
        },
      )
      .then(res => {
        if (res.data.success) {
          ToastAndroid.show(
            'Notification Deleted Successfully',
            ToastAndroid.SHORT,
          );
          getNotifications();
        } else {
          ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        }
      })
      .catch(err => {
        ToastAndroid.show(err, ToastAndroid.SHORT);
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
          <View
            style={{alignItems: 'center', flexDirection: 'row', gap: wp('2')}}>
            <TouchableOpacity
              style={styles.button_show}
              onPress={() => {
                setLoading(true);
                getNotifications();
              }}>
              <Text style={{color: '#fff'}}>Show</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button_clear}
              onPress={() => {
                setTopic();
                setNotifications([]);
                setLoading(false);
              }}>
              <Text style={{color: '#fff'}}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {loading && <ActivityIndicator size={50} />}
          {Notifications && Notifications.length != 0 ? (
            <>
              <View style={styles.details_container}>
                <DataTable style={styles.table_container}>
                  <ScrollView
                    horizontal
                    contentContainerStyle={{flexDirection: 'column'}}>
                    <DataTable.Header style={{height: hp('6')}}>
                      <DataTable.Cell
                        style={{width: wp('10')}}
                        textStyle={{fontWeight: 'bold'}}>
                        S No
                      </DataTable.Cell>
                      {Topic && Topic == 'All Notifications' ? (
                        <DataTable.Cell
                          style={{width: wp('30')}}
                          textStyle={{fontWeight: 'bold', marginLeft: wp('5')}}>
                          Group
                        </DataTable.Cell>
                      ) : (
                        <></>
                      )}
                      <DataTable.Cell
                        style={{width: wp('60')}}
                        textStyle={{fontWeight: 'bold'}}>
                        Text
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={{width: wp('20')}}
                        textStyle={{fontWeight: 'bold'}}>
                        Date
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={{width: wp('20')}}
                        textStyle={{fontWeight: 'bold'}}>
                        Actions
                      </DataTable.Cell>
                    </DataTable.Header>
                    {Notifications.map(Notification => {
                      return (
                        <DataTable.Row key={Math.random()}>
                          <DataTable.Cell style={{width: wp('8')}}>
                            {s_no++}
                          </DataTable.Cell>
                          {Topic && Topic == 'All Notifications' ? (
                            <DataTable.Cell>
                              {Notification.Topic}
                            </DataTable.Cell>
                          ) : (
                            <></>
                          )}
                          <DataTable.Cell
                            style={{
                              width: wp('60'),
                            }}>
                            <Text
                              style={{
                                color: '#000',
                                marginLeft: wp('8'),
                                padding: 5,
                              }}>
                              {Notification.Body}
                            </Text>
                          </DataTable.Cell>
                          <DataTable.Cell style={{width: wp('20')}}>
                            {Notification.Date}
                          </DataTable.Cell>
                          <DataTable.Cell
                            style={{width: wp('20'), paddingLeft: wp('10')}}>
                            <Text
                              onPress={() => {
                                Alert.alert(
                                  'Confirmation',
                                  'Confirm to Delete Notification?',
                                  [
                                    {
                                      text: 'Yes',
                                      onPress: () =>
                                        deleteNotification(Notification.Id),
                                    },
                                    {
                                      text: 'No',
                                      onPress: () => console.log('No Pressed'),
                                    },
                                  ],
                                );
                              }}>
                              <Ionicons
                                color={'red'}
                                size={30}
                                name={'trash'}
                              />
                            </Text>
                          </DataTable.Cell>
                        </DataTable.Row>
                      );
                    })}
                  </ScrollView>
                </DataTable>
              </View>
            </>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManageNotifications;

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
  details_container: {
    marginTop: hp('4'),
    backgroundColor: '#DBD7D2',
    marginHorizontal: hp('2'),
    borderRadius: 10,
    marginBottom: hp('2'),
  },
  table_container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'scroll',
  },
});
