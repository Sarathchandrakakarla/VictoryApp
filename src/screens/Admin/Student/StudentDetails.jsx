import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {DataTable} from 'react-native-paper';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const StudentDetails = () => {
  const [Id_No, setIdNo] = useState('');
  const [details, SetDetails] = useState([]);
  function getDetails(id_no) {
    if (id_no == '') {
      ToastAndroid.show('Please Enter Student Id No.', ToastAndroid.SHORT);
      return;
    }
    //https://victoryserver.onrender.com
    /* fetch('http://18.61.98.208:3000/student/viewdetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Id_No: id_no,
      }),
    })
      .then(response => response.json())
      .then(res => {
        console.log(res);
        if (!res.success) {
          SetDetails([]);
          ToastAndroid.show(res.message, ToastAndroid.SHORT);
        } else {
          SetDetails([res.data]);
        }
      }); */
    axios
      .post(
        'http://18.61.98.208:3000/student/viewdetails',
        {
          Id_No: id_no,
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
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: '#000', marginTop: hp("5"), marginLeft: wp("5")}}>
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
      <View style={{alignItems: 'center'}}>
        <View style={{flexDirection: 'row', gap: wp("5")}}>
          <TouchableOpacity
            style={styles.button_show}
            onPress={() => getDetails(Id_No)}>
            <Text style={{color: '#fff'}}>View Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button_clear}
            onPress={() => {
              setIdNo('');
              SetDetails([]);
            }}>
            <Text style={{color: '#fff'}}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
      {details.length != 0 ? (
        <View style={styles.details_container}>
          <View style={styles.image_container}>
            <Image
              source={{
                uri:
                  'https://victoryschools.in/Victory/Images/stu_img/' +
                  details[1][1] +
                  '.jpg',
              }}
              style={{width: wp("38"), height: wp("45"), borderRadius: 10}}
            />
          </View>
          <DataTable style={styles.table_container}>
            <ScrollView
              horizontal
              contentContainerStyle={{flexDirection: 'column'}}>
              {details.map((col, index) => {
                let colnames = {
                  Id_No: 'Id No.',
                  Adm_No: 'Admission No.',
                  First_Name: 'Student Name',
                  Sur_Name: 'Surname',
                  Father_Name: 'Father Name',
                  Mother_Name: 'Mother Name',
                  Stu_Class: 'Class',
                  Stu_Section: 'Section',
                  DOB: 'Date of Birth',
                  Mobile: 'Mobile Number',
                  Aadhar: 'Aadhar Number',
                  House_No: 'House No',
                  DOJ: 'Date of Join',
                  Previous_School: 'Previous School',
                  Referred_By: 'Referred By',
                };
                if (index != 0) {
                  if (Object.keys(colnames).includes(col[0])) {
                    col[0] = colnames[col[0]];
                  }
                  return (
                    <DataTable.Row key={index}>
                      <DataTable.Cell style={{width: wp("40")}}>
                        {col[0]}
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={{width: wp("60"), maxWidth: wp("150"), overflow: 'scroll'}}>
                        {col[1]}
                      </DataTable.Cell>
                    </DataTable.Row>
                  );
                }
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

export default StudentDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6E6FA',
  },
  input: {
    width: wp("50"),
    height: hp("5"),
    margin: wp("7"),
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    color: '#000',
  },
  button_show: {
    backgroundColor: '#006F40',
    width: wp('35'),
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
  button_clear: {
    backgroundColor: '#ffa500',
    width: wp('35'),
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
  details_container: {
    marginTop: hp("4"),
    elevation: 5,
    backgroundColor: '#DBD7D2',
    marginHorizontal: wp("4"),
    borderRadius: 10,
    marginBottom: hp("5"),
  },
  image_container: {
    alignItems: 'center',
    margin: wp("3"),
  },
  table_container: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'scroll',
  },
});
