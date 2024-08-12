import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DataTable} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
const Profile = () => {
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [details, setDetails] = useState([]);
  async function getUsername() {
    await AsyncStorage.getItem('Username').then(name => setUsername(name));
  }
  function getDetails() {
    axios
      .post('http://18.61.98.208:3000/student/viewdetails', {
        Id_No: username,
      })
      .then(res => {
        if (res.data.success) setDetails(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }
  useEffect(() => {
    getUsername().then(() => getDetails());
  });
  useEffect(() => {
    if (details.length != 0) setLoaded(true);
  }, [details]);

  return (
    <SafeAreaView style={styles.container}>
      {loading && <ActivityIndicator size={50} />}
      <ScrollView>
        {loaded && details.length != 0 ? (
          <View style={styles.details_container}>
            <View style={styles.image_container}>
              <Image
                source={{
                  uri:
                    'https://victoryschools.in/Victory/Images/stu_img/' +
                    details[1][1] +
                    '.jpg',
                }}
                style={{width: wp('38'), height: wp('45'), borderRadius: 10}}
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
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA',
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
