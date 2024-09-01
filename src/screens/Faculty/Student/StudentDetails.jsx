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
import urlExist from 'url-exist';
const StudentDetails = () => {
  const [Id_No, setIdNo] = useState('');
  const [imgStudent, setImgStudent] = useState(false);
  const [imgMale, setImgMale] = useState(false);
  const [imgFemale, setImgFemale] = useState(false);
  const [details, SetDetails] = useState([]);
  function getDetails(id_no) {
    if (id_no == '') {
      ToastAndroid.show('Please Enter Student Id No.', ToastAndroid.SHORT);
      return;
    }
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
  useEffect(() => {
    async function urlexists(url) {
      return urlExist(url).then(val => {
        return val;
      });
    }
    if (details && details.length != 0) {
      urlexists(
        'https://victoryschools.in/Victory/Images/stu_img/' +
          details[1][1] +
          '.jpg',
      ).then(res => {
        setImgStudent(res);
      });
      urlexists(
        'https://victoryschools.in/Victory/Images/parent_img_male/' +
          details[1][1] +
          '.jpg',
      ).then(res => {
        setImgMale(res);
      });
      urlexists(
        'https://victoryschools.in/Victory/Images/parent_img_female/' +
          details[1][1] +
          '.jpg',
      ).then(res => {
        setImgFemale(res);
      });
    }
  }, [details]);
  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: '#000', marginTop: hp('5'), marginLeft: wp('5')}}>
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
        <View style={{flexDirection: 'row', gap: wp('5')}}>
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
            {imgStudent ? (
              <Image
                source={{
                  uri:
                    'https://victoryschools.in/Victory/Images/stu_img/' +
                    details[1][1] +
                    '.jpg',
                }}
                style={{width: wp('38'), height: wp('45'), borderRadius: 10}}
              />
            ) : (
              <>
                <Image
                  source={{
                    uri: 'https://victoryschools.in/Victory/Images/stu_img/not_photo.jpg',
                  }}
                  style={{
                    width: wp('38'),
                    height: wp('45'),
                    borderRadius: 10,
                  }}
                />
              </>
            )}
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={styles.image_container}>
              {imgMale ? (
                <>
                  <Image
                    source={{
                      uri:
                        'https://victoryschools.in/Victory/Images/parent_img_male/' +
                        details[1][1] +
                        '.jpg',
                    }}
                    style={{
                      width: wp('38'),
                      height: wp('45'),
                      borderRadius: 10,
                    }}
                  />
                  <Text style={{color: '#000'}}>Father Image</Text>
                </>
              ) : (
                <>
                  <Image
                    source={{
                      uri: 'https://victoryschools.in/Victory/Images/parent_img_male/not_photo.jpg',
                    }}
                    style={{
                      width: wp('38'),
                      height: wp('45'),
                      borderRadius: 10,
                    }}
                  />
                  <Text style={{color: '#000'}}>Father Image</Text>
                </>
              )}
            </View>
            <View style={styles.image_container}>
              {imgFemale ? (
                <>
                  <Image
                    source={{
                      uri:
                        'https://victoryschools.in/Victory/Images/parent_img_female/' +
                        details[1][1] +
                        '.jpg',
                    }}
                    style={{
                      width: wp('38'),
                      height: wp('45'),
                      borderRadius: 10,
                    }}
                  />
                  <Text style={{color: '#000'}}>Mother Image</Text>
                </>
              ) : (
                <>
                  <Image
                    source={{
                      uri: 'https://victoryschools.in/Victory/Images/parent_img_female/not_photo.jpg',
                    }}
                    style={{
                      width: wp('38'),
                      height: wp('45'),
                      borderRadius: 10,
                    }}
                  />
                  <Text style={{color: '#000'}}>Mother Image</Text>
                </>
              )}
            </View>
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
                      <DataTable.Cell style={{width: wp('40')}}>
                        {col[0]}
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={{
                          width: wp('60'),
                          maxWidth: wp('150'),
                          overflow: 'scroll',
                        }}>
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
    width: wp('50'),
    height: hp('5'),
    margin: wp('7'),
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
    marginTop: hp('4'),
    elevation: 5,
    backgroundColor: '#DBD7D2',
    marginHorizontal: wp('4'),
    borderRadius: 10,
    marginBottom: hp('5'),
  },
  image_container: {
    alignItems: 'center',
    margin: wp('3'),
  },
  table_container: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'scroll',
  },
});
