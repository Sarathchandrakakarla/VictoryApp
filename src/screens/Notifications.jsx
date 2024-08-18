import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {DataTable} from 'react-native-paper';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  function getNotifications() {
    AsyncStorage.getItem('Topics').then(topics => {
      let topicsArr = JSON.parse(topics);
      axios
        .post('http://18.61.98.208:3000/notifications/fetchall', {
          Topics: topicsArr,
        })
        .then(res => {
          if (res.data.success) {
            setNotifications(res.data.data);
          } else {
            ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
            console.log(res.data.message);
          }
        });
    });
  }
  useEffect(() => {
    getNotifications();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center', marginTop: hp('2')}}>
        <TouchableOpacity
          style={styles.button_show}
          onPress={() => getNotifications()}>
          <Text style={{color: '#fff'}}>Refresh</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {notifications.length == 0 ? (
          <>
            <View style={styles.alert} key={Math.random()}>
              <Text style={{color: '#000'}}>
                You don't have any new Notifications!
              </Text>
            </View>
          </>
        ) : (
          <>
            <View>
              <DataTable style={styles.table}>
                {notifications.map(notification => {
                  return (
                    <>
                      <DataTable.Row style={styles.row} key={Math.random()}>
                        <DataTable.Cell key={Math.random()}>
                          <Text
                            style={{
                              color: '#000',
                              fontFamily: 'RobotoSlab_Regular',
                              padding: 10,
                            }}>
                            {notification.Body}
                          </Text>
                        </DataTable.Cell>
                      </DataTable.Row>
                    </>
                  );
                })}
              </DataTable>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button_show: {
    backgroundColor: '#006F40',
    width: wp('35'),
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
  alert: {
    backgroundColor: '#cfd9df',
    padding: hp('2'),
    borderRadius: wp('2'),
    width: wp('90'),
    alignItems: 'center',
    marginHorizontal: wp('5'),
    marginTop: hp('20'),
    justifyContent: 'center',
  },
  table: {
    width: wp('90'),
    marginHorizontal: wp('5'),
    marginVertical: hp('4'),
  },
  row: {
    backgroundColor: '#cfd9df',
    marginVertical: hp('1'),
    borderRadius: 10,
  },
});
