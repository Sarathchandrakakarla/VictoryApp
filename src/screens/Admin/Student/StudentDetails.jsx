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
const StudentDetails = () => {
  const [Id_No, setIdNo] = useState('');
  const [details, SetDetails] = useState([]);
  /* useEffect(() => {
    console.log(details);
  },[details]); */
  function getDetails(id_no) {
    if (id_no == '') {
      ToastAndroid.show('Please Enter Student Id No.', ToastAndroid.SHORT);
      return;
    }
    fetch('http://192.168.14.107:3000/student/viewdetails', {
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
        if (!res.success) {
          SetDetails([]);
          ToastAndroid.show(res.message, ToastAndroid.SHORT);
        } else {
          SetDetails(res.data);
        }
      });
  }
  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: '#000', marginTop: 40, marginLeft: 20}}>
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
        <View style={{flexDirection: 'row', gap: 20}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => getDetails(Id_No)}>
            <Text style={{color: '#fff'}}>View Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
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
              style={{width: 150, height: 200, borderRadius: 10}}
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
                      <DataTable.Cell style={{width: 150}}>
                        {col[0]}
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={{width: 250, maxWidth: 500, overflow: 'scroll'}}>
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
    backgroundColor: '#fff',
  },
  input: {
    width: 250,
    height: 40,
    margin: 32,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    color: '#000',
  },
  button: {
    backgroundColor: '#000',
    width: 150,
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
  image_container: {
    alignItems: 'center',
    margin: 10,
  },
  table_container: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'scroll',
  },
});
