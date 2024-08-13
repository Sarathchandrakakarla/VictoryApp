import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  ScrollView,
  TextInput,
} from 'react-native';
import {DataTable} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
const Marks = () => {
  const [Id_No, setIdNo] = useState();
  const [loading, setLoading] = useState(false);
  const [exams, setExams] = useState([]);
  const [Exam, setExam] = useState();
  const [details, SetDetails] = useState([]);
  const [Max_Marks, setMaxMarks] = useState({});
  const [Max_Total, setMaxTotal] = useState();
  useEffect(() => {
    if (Id_No && Id_No.length == 9) getExams();
    else {
      setExam();
      setExams([]);
    }
  }, [Id_No]);

  useEffect(() => {
    SetDetails([]);
  }, [Exam]);

  function getExams() {
    if (Id_No && Id_No != '') {
      axios
        .post(
          'http://18.61.98.208:3000/student/getexams',
          {
            Id_No: Id_No,
          },
          {
            timeout: 20000,
          },
        )
        .then(res => {
          if (!res.data.success) {
            ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
            return;
          } else {
            setExams(res.data.data);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
  }

  function getDetails() {
    if (!Id_No || Id_No.trim() == '') {
      setLoading(false);
      return ToastAndroid.show(
        'Please Enter Student Id No.',
        ToastAndroid.SHORT,
      );
    } else if (Id_No.length != 9) {
      setLoading(false);
      return ToastAndroid.show(
        'Please Enter Valid Student Id No.',
        ToastAndroid.SHORT,
      );
    }
    if (!Exam || Exam.trim() == '') {
      setLoading(false);
      return ToastAndroid.show('Please Select an Exam', ToastAndroid.SHORT);
    }
    axios
      .post(
        'http://18.61.98.208:3000/student/marks',
        {
          Id_No: Id_No,
          Exam: Exam,
        },
        {
          timeout: 50000,
        },
      )
      .then(res => {
        if (!res.data.success) {
          ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
          return;
        }
        SetDetails(res.data.data);
        setMaxMarks(res.data.Sub_Max);
        setMaxTotal(res.data.Max_Total);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <SafeAreaView style={styles.container}>
      {loading && <ActivityIndicator size={50} />}
      <ScrollView>
        <View style={{alignItems: 'center', marginTop: hp('2')}}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{color: '#000', marginTop: hp('5'), marginLeft: wp('5')}}>
              Student Id No.
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Id No."
              value={Id_No}
              onChangeText={val => setIdNo(val.toUpperCase())}
              placeholderTextColor={'#000'}
            />
          </View>
          <Picker
            selectedValue={Exam}
            onValueChange={itemValue => {
              setExam(itemValue);
              SetDetails([]);
            }}
            mode="dropdown"
            dropdownIconColor="#000"
            dropdownIconRippleColor="#000"
            style={styles.picker}>
            <Picker.Item
              label="-- Select Exam --"
              value="selectexam"
              key={Math.random()}
            />
            {exams.length != 0 &&
              exams.map(item => {
                if (item == 'No Exam Found') {
                  return (
                    <Picker.Item
                      style={styles.picker_item}
                      label={item}
                      value={item}
                      key={item}
                      enabled={false}
                    />
                  );
                }
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
                setExam();
                setExams([]);
                setIdNo();
              }}>
              <Text style={{color: '#fff'}}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>
        {details.length != 0 ? (
          <>
            <View style={styles.details_container}>
              <DataTable style={styles.table_container}>
                <ScrollView
                  horizontal
                  contentContainerStyle={{flexDirection: 'column'}}>
                  <DataTable.Header style={{height: hp('6')}}>
                    <DataTable.Cell>
                      <Text style={{fontFamily: 'RobotoSlab-Bold'}}>
                        Student Name:
                      </Text>{' '}
                      <Text style={{fontFamily: 'RobotoSlab_Regular'}}>
                        {details.Name}
                      </Text>
                    </DataTable.Cell>
                  </DataTable.Header>
                  <DataTable.Header style={{height: hp('6')}}>
                    <DataTable.Cell>
                      <Text style={{fontFamily: 'RobotoSlab-Bold'}}>
                        Class:
                      </Text>{' '}
                      <Text style={{fontFamily: 'RobotoSlab_Regular'}}>
                        {details.Class}
                      </Text>
                    </DataTable.Cell>
                  </DataTable.Header>
                  <DataTable.Header style={{height: hp('6')}}>
                    <DataTable.Cell
                      style={{width: wp('25')}}
                      textStyle={{fontWeight: 'bold'}}>
                      Subject
                    </DataTable.Cell>
                    <DataTable.Cell
                      style={{width: wp('35')}}
                      textStyle={{fontWeight: 'bold'}}>
                      Max Marks
                    </DataTable.Cell>
                    <DataTable.Cell
                      style={{width: wp('30')}}
                      textStyle={{fontWeight: 'bold', marginLeft: -30}}>
                      Obtained Marks
                    </DataTable.Cell>
                  </DataTable.Header>
                  {Object.entries(details['Subjects']).map(
                    ([subject, marks]) => {
                      return (
                        <DataTable.Row key={Math.random() * 1000}>
                          <DataTable.Cell style={{width: wp('30')}}>
                            {subject}
                          </DataTable.Cell>
                          <DataTable.Cell style={{width: wp('20')}}>
                            {Max_Marks[subject]}
                          </DataTable.Cell>
                          <DataTable.Cell style={{width: wp('25')}}>
                            {marks}
                          </DataTable.Cell>
                        </DataTable.Row>
                      );
                    },
                  )}
                  <DataTable.Row key={Math.random() * 1000}>
                    <DataTable.Cell
                      style={{width: wp('30')}}
                      textStyle={{fontWeight: 'bold'}}>
                      Total
                    </DataTable.Cell>
                    <DataTable.Cell
                      style={{width: wp('20')}}
                      textStyle={{fontWeight: 'bold'}}>
                      {details['Total'] + '/' + Max_Total}
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row key={Math.random() * 1000}>
                    <DataTable.Cell
                      style={{width: wp('30')}}
                      textStyle={{fontWeight: 'bold'}}>
                      Percentage
                    </DataTable.Cell>
                    <DataTable.Cell
                      style={{width: wp('20')}}
                      textStyle={{fontWeight: 'bold'}}>
                      {details['Percentage']}
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row key={Math.random() * 1000}>
                    <DataTable.Cell
                      style={{width: wp('30')}}
                      textStyle={{fontWeight: 'bold'}}>
                      Grade
                    </DataTable.Cell>
                    <DataTable.Cell
                      style={{width: wp('20')}}
                      textStyle={{fontWeight: 'bold'}}>
                      {details['Grade']}
                    </DataTable.Cell>
                  </DataTable.Row>
                </ScrollView>
              </DataTable>
            </View>
          </>
        ) : (
          <></>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Marks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA',
  },
  input: {
    width: wp('50'),
    height: hp('5'),
    margin: wp('7'),
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    color: '#000',
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
