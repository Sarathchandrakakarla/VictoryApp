import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {DataTable} from 'react-native-paper';
import RadioGroup from 'react-native-radio-buttons-group';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
const DateWiseVanAttendanceView = () => {
  const radioButtons1 = useMemo(
    () => [
      {
        id: '1',
        label: 'Morning',
        value: 'AM',
      },
      {
        id: '2',
        label: 'Afternoon',
        value: 'PM',
      },
    ],
    [],
  );
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [Route, setRoute] = useState();
  const [attType, SetAttType] = useState();
  const [selectedId, setSelectedId] = useState('1');
  const [details, SetDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(null);
  let s_no = 1;
  useEffect(() => {
    radioButtons1.forEach(btn => {
      if (btn.id === selectedId) {
        SetAttType(btn.value);
      }
    });
  }, [selectedId]);

  useEffect(() => {
    setCount(s_no);
  }, [details]);

  useEffect(() => {
    if (routes.length == 0) {
      getRoutes();
    }
  }, []);

  function getRoutes() {
    setLoading(true);
    axios
      .post('http://18.61.98.208:3000/getroutes', {}, {timeout: 20000})
      .then(res => {
        if (res.data.success) setRoutes(res.data.data);
        else ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
      })
      .catch(err => {
        ToastAndroid.show(err, ToastAndroid.SHORT);
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  function formatDate(date, standard = false) {
    var d = new Date(date);
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    month = month < 10 ? '0' + month : month;
    date = d.getDate();
    date = date < 10 ? '0' + date : date;
    if (standard) {
      return date + '-' + month + '-' + year;
    }
    return year + '-' + month + '-' + date;
  }

  function getDetails() {
    axios
      .post(
        'http://18.61.98.208:3000/student/vanattendance/report',
        {
          Route: Route,
          Type: attType,
          Date: formatDate(date, true),
        },
        {
          timeout: 20000,
        },
      )
      .then(res => {
        SetDetails([]);
        if (res.data.success) {
          if (Object.entries(res.data.data).length == 0) {
            ToastAndroid.show('No Student Found Absent', ToastAndroid.SHORT);
          } else {
            SetDetails(Object.entries(res.data.data));
          }
        } else {
          ToastAndroid.show('Error:' + res.data.message, ToastAndroid.SHORT);
        }
      })
      .catch(err => {
        ToastAndroid.show(err, ToastAndroid.SHORT);
      })
      .finally(() => setLoading(false));
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{alignItems: 'center', marginTop: hp('3')}}>
        <TouchableOpacity
          style={styles.button_date}
          onPress={() => setOpen(true)}>
          <Text style={{color: '#fff'}}> Select Date</Text>
        </TouchableOpacity>
        <TextInput
          value={date.toDateString()}
          style={{
            width: wp('50'),
            height: hp('5'),
            marginTop: hp('3'),
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            color: '#000',
          }}
          readOnly={true}
          placeholderTextColor={'#000'}
        />
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          maximumDate={new Date()}
          onConfirm={d => {
            d = new Date(formatDate(d));
            setOpen(false);
            setDate(d);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <Picker
          selectedValue={Route}
          onValueChange={itemValue => {
            setRoute(itemValue);
            SetDetails([]);
          }}
          mode="dropdown"
          dropdownIconColor="#000"
          dropdownIconRippleColor="#000"
          style={styles.picker}>
          <Picker.Item
            label="-- Select Route --"
            value="selectroute"
            key={Math.random()}
          />
          {routes.map(item => {
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
        <RadioGroup
          radioButtons={radioButtons1}
          labelStyle={{color: 'black'}}
          layout="row"
          onPress={setSelectedId}
          selectedId={selectedId}
        />
      </View>
      <View style={{alignItems: 'center', marginTop: hp('2')}}>
        <View style={{flexDirection: 'row', gap: wp('3')}}>
          <TouchableOpacity
            style={styles.button_show}
            onPress={() => {
              setLoading(true);
              getDetails();
            }}>
            <Text style={{color: '#fff'}}>Show</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button_clear}
            onPress={() => {
              setLoading(false);
              SetDetails([]);
              setDate(new Date());
              setSelectedId('1');
              setRoute();
            }}>
            <Text style={{color: '#fff'}}>Clear</Text>
          </TouchableOpacity>
        </View>
        {count && details.length != 0 ? (
          <View style={styles.count_container}>
            <Text style={styles.count_text}>
              Total No. of Students Absent: {count - 1}
            </Text>
          </View>
        ) : (
          <></>
        )}
      </View>
      {loading && <ActivityIndicator size={50} style={{marginTop: hp('6')}} />}
      {details.length != 0 ? (
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
                    S No.
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{width: wp('30')}}
                    textStyle={{fontWeight: 'bold'}}>
                    Id No.
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{width: wp('70')}}
                    textStyle={{fontWeight: 'bold'}}>
                    Student Name
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{width: wp('25')}}
                    textStyle={{fontWeight: 'bold'}}>
                    Class
                  </DataTable.Cell>
                  {!Route ? (
                    <DataTable.Cell
                      style={{width: wp('25')}}
                      textStyle={{fontWeight: 'bold'}}>
                      Van Route
                    </DataTable.Cell>
                  ) : (
                    <></>
                  )}
                  <DataTable.Cell
                    style={{width: wp('45')}}
                    textStyle={{fontWeight: 'bold'}}>
                    Mobile Number
                  </DataTable.Cell>
                </DataTable.Header>
                {details.map(route => {
                  return route[1].map(student => {
                    return (
                      <DataTable.Row key={Math.random() * 1000}>
                        <DataTable.Cell
                          key={Math.random() * 1000}
                          style={{width: wp('10')}}>
                          {s_no++}
                        </DataTable.Cell>
                        <DataTable.Cell
                          key={Math.random() * 1000}
                          style={{width: wp('30')}}>
                          {student['Id_No']}
                        </DataTable.Cell>
                        <DataTable.Cell
                          key={Math.random() * 1000}
                          style={{width: wp('70')}}>
                          {student['Name']}
                        </DataTable.Cell>
                        <DataTable.Cell
                          key={Math.random() * 1000}
                          style={{width: wp('30')}}>
                          {student['Class'] + ' ' + student['Section']}
                        </DataTable.Cell>
                        {!Route ? (
                          <DataTable.Cell
                            key={Math.random() * 1000}
                            style={{width: wp('30')}}>
                            {student['Route']}
                          </DataTable.Cell>
                        ) : (
                          <></>
                        )}
                        <DataTable.Cell
                          key={Math.random() * 1000}
                          style={{width: wp('50')}}>
                          {student['Mobile']}
                        </DataTable.Cell>
                      </DataTable.Row>
                    );
                  });
                })}
              </ScrollView>
            </DataTable>
          </View>
        </>
      ) : (
        <></>
      )}
    </ScrollView>
  );
};

export default DateWiseVanAttendanceView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6E6FA',
  },
  picker: {
    width: wp('70'),
    backgroundColor: '#fff',
    color: '#000',
    marginVertical: hp('1'),
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
  button_date: {
    backgroundColor: '#000080',
    width: wp('35'),
    padding: 10,
    marginTop: 0,
    borderRadius: 50,
    alignItems: 'center',
  },
  count_container: {
    alignItems: 'center',
    marginTop: hp('4'),
  },
  count_text: {
    fontSize: 18,
    color: '#000',
  },
  details_container: {
    marginTop: hp('4'),
    elevation: 5,
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
