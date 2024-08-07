import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {DataTable} from 'react-native-paper';
import RadioGroup from 'react-native-radio-buttons-group';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
const SearchStudent = () => {
  const radioButtons1 = useMemo(
    () => [
      {
        id: '1',
        label: 'By Student Name',
        value: 'First_Name',
        placeholder: 'Student Name',
      },
      {
        id: '2',
        label: 'By Surname',
        value: 'Sur_Name',
        placeholder: 'Surname',
      },
    ],
    [],
  );
  const radioButtons2 = useMemo(
    () => [
      {
        id: '3',
        label: 'By Father Name',
        value: 'Father_Name',
        placeholder: 'Father Name',
      },
      {
        id: '4',
        label: 'By Mobile Number',
        value: 'Mobile',
        placeholder: 'Mobile Number',
      },
    ],
    [],
  );
  const [Input, setInput] = useState('');
  const [details, SetDetails] = useState([]);
  const [selectedId, setSelectedId] = useState('1');
  const [placeholder, SetPlaceholder] = useState();
  const [searchby, SetSearchBy] = useState();
  useEffect(() => {
    radioButtons1.forEach(btn => {
      if (btn.id === selectedId) {
        SetPlaceholder(btn.placeholder);
        SetSearchBy(btn.value);
      }
    });
    radioButtons2.forEach(btn => {
      if (btn.id === selectedId) {
        SetPlaceholder(btn.placeholder);
        SetSearchBy(btn.value);
      }
    });
  }, [selectedId]);
  function getDetails() {
    if (Input.trim() == '') {
      ToastAndroid.show(
        'Search Input Should Not Be Empty!',
        ToastAndroid.SHORT,
      );
      return;
    }
    axios
      .post(
        'http://18.61.98.208:3000/student/search',
        {
          SearchBy: searchby,
          Search: Input,
        },
        {
          timeout: 5000,
        },
      )
      .then(res => {
        if (!res.data.success) {
          SetDetails([]);
          ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        } else {
          SetDetails(res.data.data);
        }
      })
      .catch(err => {
        ToastAndroid.show('Error: ' + err, ToastAndroid.SHORT);
      });
  }
  return (
    <ScrollView style={styles.container}>
      <View style={{margin: wp('5')}}>
        <RadioGroup
          radioButtons={radioButtons1}
          labelStyle={{color: 'black'}}
          layout="row"
          onPress={setSelectedId}
          selectedId={selectedId}
        />
        <RadioGroup
          radioButtons={radioButtons2}
          labelStyle={{color: 'black'}}
          layout="row"
          onPress={setSelectedId}
          selectedId={selectedId}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={Input}
          onChangeText={val => setInput(val)}
          placeholderTextColor={'#000'}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <View style={{flexDirection: 'row', gap: wp("5")}}>
          <TouchableOpacity style={styles.button_show} onPress={() => getDetails()}>
            <Text style={{color: '#fff'}}>View Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button_clear}
            onPress={() => {
              setInput('');
              SetDetails([]);
              setSelectedId('1');
            }}>
            <Text style={{color: '#fff'}}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
      {details.length != 0 ? (
        <View style={styles.details_container}>
          <DataTable style={styles.table_container}>
            <ScrollView
              horizontal
              contentContainerStyle={{flexDirection: 'column'}}>
              <DataTable.Header style={{height: hp("6")}}>
                <DataTable.Cell
                  style={{width: wp("10")}}
                  textStyle={{fontWeight: 'bold'}}>
                  S No.
                </DataTable.Cell>
                <DataTable.Cell
                  style={{width: wp("30")}}
                  textStyle={{fontWeight: 'bold'}}>
                  Id No.
                </DataTable.Cell>
                <DataTable.Cell
                  style={{width: wp("40")}}
                  textStyle={{fontWeight: 'bold'}}>
                  Student Name
                </DataTable.Cell>
                <DataTable.Cell
                  style={{width: wp("50")}}
                  textStyle={{fontWeight: 'bold'}}>
                  Surname
                </DataTable.Cell>
                <DataTable.Cell
                  style={{width: wp("60")}}
                  textStyle={{fontWeight: 'bold'}}>
                  Father Name
                </DataTable.Cell>
                <DataTable.Cell
                  style={{width: wp("30")}}
                  textStyle={{fontWeight: 'bold'}}>
                  Class
                </DataTable.Cell>
                <DataTable.Cell
                  style={{width: wp("30")}}
                  textStyle={{fontWeight: 'bold'}}>
                  Mobile Number
                </DataTable.Cell>
              </DataTable.Header>
              {details.map((col, index) => {
                return (
                  <DataTable.Row>
                    <DataTable.Cell
                      key={Math.random() * 1000}
                      style={{width: wp("10")}}>
                      {index + 1}
                    </DataTable.Cell>
                    <DataTable.Cell
                      key={Math.random() * 1000}
                      style={{width: wp("30")}}>
                      {col['Id_No']}
                    </DataTable.Cell>
                    <DataTable.Cell
                      key={Math.random() * 1000}
                      style={{width: wp("70")}}>
                      {col['First_Name']}
                    </DataTable.Cell>
                    <DataTable.Cell
                      key={Math.random() * 1000}
                      style={{width: wp("50")}}>
                      {col['Sur_Name']}
                    </DataTable.Cell>
                    <DataTable.Cell
                      key={Math.random() * 1000}
                      style={{width: wp("75")}}>
                      {col['Father_Name']}
                    </DataTable.Cell>
                    <DataTable.Cell
                      key={Math.random() * 1000}
                      style={{width: wp("40")}}>
                      {col['Class'] + col['Section']}
                    </DataTable.Cell>
                    <DataTable.Cell
                      key={Math.random() * 1000}
                      style={{width: wp("50")}}>
                      {col['Mobile']}
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </ScrollView>
          </DataTable>
        </View>
      ) : (
        <></>
      )}
    </ScrollView>
  );
};

export default SearchStudent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6E6FA',
  },
  input: {
    width: 250,
    height: 40,
    marginTop: 30,
    marginLeft: 80,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    color: '#000',
  },
  button_show: {
    backgroundColor: '#006F40',
    width: wp("35"),
    padding: 10,
    marginTop: 0,
    borderRadius: 50,
    alignItems: 'center',
  },
  button_clear: {
    backgroundColor: '#ffa500',
    width: wp("35"),
    padding: 10,
    marginTop: 0,
    borderRadius: 50,
    alignItems: 'center',
  },
  details_container: {
    marginTop: 24,
    elevation: 5,
    backgroundColor: '#DBD7D2',
    marginHorizontal: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  table_container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'scroll',
  },
});
