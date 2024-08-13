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
import useRadioGroups from '../../../components/useMultipleRadios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
const VanAttendance = () => {
  const radioButtons1 = useMemo(
    () => [
      {
        id: '1',
        label: 'Morning',
        value: 'AM',
      },
      {
        id: '2',
        label: 'Evening',
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
  const [radioButtons, setRadioButtons] = useState([]);
  const [radioValues, handleRadioChange] = useRadioGroups({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    radioButtons1.forEach(btn => {
      if (btn.id === selectedId) {
        SetAttType(btn.value);
      }
    });
  }, [selectedId]);

  useEffect(() => {
    if (radioValues.length != {}) {
      setLoading(false);
    }
  }, [radioValues]);

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
    if (!Route || Route == 'selectroute') {
      setLoading(false);
      ToastAndroid.show('Please Select Route!', ToastAndroid.SHORT);
      return;
    }
    axios
      .post(
        'http://18.61.98.208:3000/student/vanattendance/view',
        {
          Route: Route,
          Type: attType,
          Date: formatDate(date, true),
        },
        {
          timeout: 5000,
        },
      )
      .then(res => {
        if (!res.data.success) {
          SetDetails([]);
          handleRadioChange({});
          setLoading(false);
          ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        } else {
          let arr = {},
            btns = {};
          res.data.data.map(row => {
            arr[row.Id_No] = row.Attendance[0];
            Id = row.Id_No;
            btns[row.Id_No] = [
              {
                id: row.Id_No + 'P',
                label: 'Present',
                value: 'P',
                color: 'green',
              },
              {
                id: row.Id_No + 'A',
                label: 'Absent',
                value: 'A',
                color: 'red',
              },
            ];
          });
          handleRadioChange(arr);
          setRadioButtons(btns);
          SetDetails(res.data.data);
        }
      })
      .catch(err => {
        ToastAndroid.show('Error: ' + err, ToastAndroid.SHORT);
      });
  }

  function uploadAttendance() {
    let Date = formatDate(date, true),
      type = '',
      final_data = {};
    radioButtons1.forEach(btn => {
      if (btn.id == selectedId) {
        type = btn.value;
      }
    });
    Object.entries(radioValues).forEach(item => {
      if (item[1] == 'A' || item[1] == 'L') {
        final_data[item[0]] = item[1];
      }
    });
    axios
      .post(
        'http://18.61.98.208:3000/student/vanattendance/upload',
        {
          Route: Route,
          Date: Date,
          Type: type,
          Data: final_data,
        },
        {
          timeout: 5000,
        },
      )
      .then(res => {
        if (!res.data.success) {
          ToastAndroid.show('Error: ' + res.data.message, ToastAndroid.SHORT);
        } else {
          SetDetails([]);
          setSelectedId('1');
          setRoute();
          ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        }
      });
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
            handleRadioChange({});
          }}
          mode="dropdown"
          dropdownIconColor="#000"
          dropdownIconRippleColor="#000"
          style={styles.picker}>
          <Picker.Item
            label="-- Select Route --"
            value="selectroute"
            style={{color: '#fff'}}
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
                    style={{width: wp('40')}}
                    textStyle={{fontWeight: 'bold'}}>
                    Attendance
                  </DataTable.Cell>
                </DataTable.Header>
                {details.map((col, index) => {
                  return (
                    <DataTable.Row key={Math.random() * 1000}>
                      <DataTable.Cell
                        key={Math.random() * 1000}
                        style={{width: wp('10')}}>
                        {index + 1}
                      </DataTable.Cell>
                      <DataTable.Cell
                        key={Math.random() * 1000}
                        style={{width: wp('30')}}>
                        {col['Id_No']}
                      </DataTable.Cell>
                      <DataTable.Cell
                        key={Math.random() * 1000}
                        style={{width: wp('70')}}>
                        {col['Name']}
                      </DataTable.Cell>
                      <DataTable.Cell
                        key={Math.random() * 1000}
                        style={{width: wp('55')}}>
                        <RadioGroup
                          radioButtons={radioButtons[col['Id_No']]}
                          labelStyle={{color: 'black'}}
                          layout="row"
                          onPress={val => {
                            handleRadioChange({
                              ...radioValues,
                              [col['Id_No']]: val[val.length - 1],
                            });
                          }}
                          selectedId={
                            col['Id_No'] + radioValues[col['Id_No']][0]
                          }
                        />
                      </DataTable.Cell>
                    </DataTable.Row>
                  );
                })}
              </ScrollView>
            </DataTable>
          </View>
          <View style={{alignItems: 'center', marginBottom: wp('3')}}>
            <TouchableOpacity
              style={styles.button_submit}
              onPress={() => uploadAttendance()}>
              <Text style={{color: '#fff'}}>Submit</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <></>
      )}
    </ScrollView>
  );
};

export default VanAttendance;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6E6FA',
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
  button_submit: {
    backgroundColor: '#198754',
    width: wp('35'),
    padding: 10,
    marginTop: 0,
    borderRadius: 50,
    alignItems: 'center',
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
});
