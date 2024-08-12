import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {DataTable} from 'react-native-paper';
import RadioGroup from 'react-native-radio-buttons-group';
import {Picker} from '@react-native-picker/picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
const ClassWiseMarks = () => {
  const markstypeRadios = useMemo(
    () => [
      {
        id: 'Normal',
        label: 'Normal',
        value: 'Normal',
      },
      {
        id: 'GPA',
        label: 'GPA',
        value: 'GPA',
      },
    ],
    [],
  );
  const classes = ['PreKG', 'LKG', 'UKG'];
  for (i = 1; i <= 10; i++) {
    classes.push(i + ' CLASS');
  }
  const sections = ['A', 'B', 'C', 'D'];
  const [Class, setClass] = useState();
  const [Section, setSection] = useState();
  const [Exam, setExam] = useState();
  const [exams, setExams] = useState([]);
  const [Subjects, setSubjects] = useState([]);
  const [markstype, setMarksType] = useState('Normal');
  const [details, SetDetails] = useState([]);
  const [Max_Sum, setMaxSum] = useState();
  const [loading, setLoading] = useState(false);
  let s_no = 1;

  useEffect(() => {
    if (Class) {
      getExams();
    }
  }, [Class]);

  useEffect(() => {
    SetDetails([]);
  }, [markstype]);

  function getExams() {
    setLoading(true);
    axios
      .post(
        'http://18.61.98.208:3000/fetchexams',
        {
          Class: Class,
        },
        {
          timeout: 5000,
        },
      )
      .then(res => {
        setExams(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function getDetails() {
    if (!Class) {
      setLoading(false);
      ToastAndroid.show('Please Select Class', ToastAndroid.SHORT);
      return;
    }
    if (!Exam) {
      setLoading(false);
      ToastAndroid.show('Please Select Exam', ToastAndroid.SHORT);
      return;
    }
    axios
      .post(
        'http://18.61.98.208:3000/classwisemarks',
        {
          Class: Class,
          Section: Section,
          Exam: Exam,
          MarksType: markstype,
        },
        {
          timeout: 60000,
        },
      )
      .then(res => {
        if (res.data.success) {
          setSubjects(res.data.Subjects);
          SetDetails(Object.entries(res.data.data));
          setMaxSum(res.data.Max_Sum);
        } else {
          ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        }
      })
      .catch(err => {
        ToastAndroid.show(err, ToastAndroid.SHORT);
      })
      .finally(() => setLoading(false));
    /* axios
      .post(
        'http://18.61.98.208:3000/student/attendance/report',
        {
          Class: Class,
          Section: Section,
          Type: attType,
          AbsentType: absentType,
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
      .finally(() => setLoading(false)); */
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{alignItems: 'center', marginTop: hp('3')}}>
        <Picker
          selectedValue={Class}
          onValueChange={itemValue => {
            setClass(itemValue);
            SetDetails([]);
          }}
          mode="dropdown"
          dropdownIconColor="#000"
          dropdownIconRippleColor="#000"
          style={styles.picker}>
          <Picker.Item
            label="-- Select Class --"
            value="selectclass"
            key={Math.random()}
          />
          {classes.map(item => {
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
          selectedValue={Section}
          onValueChange={itemValue => {
            setSection(itemValue);
            SetDetails([]);
          }}
          mode="dropdown"
          dropdownIconColor="#000"
          dropdownIconRippleColor="#000"
          style={styles.picker}>
          <Picker.Item
            label="-- Select Section --"
            value="selectsection"
            key={Math.random()}
          />
          {sections.map(item => {
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
        <RadioGroup
          radioButtons={markstypeRadios}
          labelStyle={{color: 'black'}}
          layout="row"
          onPress={setMarksType}
          selectedId={markstype}
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
              setMarksType('Normal');
              setClass();
              setSection();
              setExam();
              setExams([]);
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
                    style={{width: wp('15')}}
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
                  {Class && !Section ? (
                    <DataTable.Cell
                      style={{width: wp('25')}}
                      textStyle={{fontWeight: 'bold'}}>
                      Class
                    </DataTable.Cell>
                  ) : (
                    <></>
                  )}
                  {Subjects.length != 0 ? (
                    <>
                      {Subjects.map(Subject => {
                        return (
                          <DataTable.Cell
                            key={Math.random()}
                            style={{width: wp('25')}}
                            textStyle={{fontWeight: 'bold'}}>
                            {Subject}
                          </DataTable.Cell>
                        );
                      })}
                      <DataTable.Cell
                        key={Math.random()}
                        style={{width: wp('25')}}
                        textStyle={{fontWeight: 'bold'}}>
                        Total
                      </DataTable.Cell>
                      {markstype == 'Normal' ? (
                        <>
                          <DataTable.Cell
                            key={Math.random()}
                            style={{width: wp('28')}}
                            textStyle={{fontWeight: 'bold'}}>
                            Percentage
                          </DataTable.Cell>
                        </>
                      ) : (
                        <>
                          <DataTable.Cell
                            key={Math.random()}
                            style={{width: wp('25')}}
                            textStyle={{fontWeight: 'bold', marginLeft: 25}}>
                            GPA
                          </DataTable.Cell>
                        </>
                      )}
                      <DataTable.Cell
                        key={Math.random()}
                        style={{width: wp('35')}}
                        textStyle={{fontWeight: 'bold'}}>
                        Grade
                      </DataTable.Cell>
                      <DataTable.Cell
                        key={Math.random()}
                        style={{width: wp('20')}}
                        textStyle={{fontWeight: 'bold'}}>
                        Rank
                      </DataTable.Cell>
                    </>
                  ) : (
                    <></>
                  )}
                </DataTable.Header>
                {details.map(student_details => {
                  return Object.entries(student_details[1]).map(student => {
                    return (
                      <DataTable.Row key={Math.random() * 1000}>
                        <DataTable.Cell
                          key={Math.random() * 1000}
                          style={{width: wp('10')}}>
                          {s_no++}
                        </DataTable.Cell>
                        <DataTable.Cell
                          key={Math.random() * 1000}
                          style={{width: wp('25')}}>
                          {student[0]}
                        </DataTable.Cell>
                        <DataTable.Cell
                          key={Math.random() * 1000}
                          style={{width: wp('60')}}
                          textStyle={{marginLeft: 30}}>
                          {student[1].Name}
                        </DataTable.Cell>
                        {Class && !Section ? (
                          <DataTable.Cell
                            key={Math.random() * 1000}
                            style={{width: wp('25')}}
                            textStyle={{fontWeight: 'bold'}}>
                            {student[1].Class}
                          </DataTable.Cell>
                        ) : (
                          <></>
                        )}
                        {Subjects.map(subject => {
                          return (
                            <DataTable.Cell
                              key={Math.random() * 1000}
                              style={{width: wp('25')}}
                              numeric>
                              {student[1]['Subjects'][subject]}
                            </DataTable.Cell>
                          );
                        })}
                        <DataTable.Cell
                          key={Math.random() * 1000}
                          style={{width: wp('30')}}
                          numeric>
                          {student[1].Total + '/' + Max_Sum}
                        </DataTable.Cell>
                        {markstype == 'Normal' ? (
                          <>
                            <DataTable.Cell
                              key={Math.random() * 1000}
                              style={{width: wp('30')}}
                              numeric>
                              {student[1].Percentage}
                            </DataTable.Cell>
                          </>
                        ) : (
                          <>
                            <DataTable.Cell
                              key={Math.random() * 1000}
                              style={{width: wp('30')}}
                              numeric>
                              {student[1].GPA}
                            </DataTable.Cell>
                          </>
                        )}
                        <DataTable.Cell
                          key={Math.random() * 1000}
                          style={{width: wp('28'), marginLeft: wp('15')}}>
                          {student[1].Grade}
                        </DataTable.Cell>
                        <DataTable.Cell
                          key={Math.random() * 1000}
                          style={{width: wp('20'), marginLeft: wp('10')}}>
                          {student[1].Rank}
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

export default ClassWiseMarks;

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
