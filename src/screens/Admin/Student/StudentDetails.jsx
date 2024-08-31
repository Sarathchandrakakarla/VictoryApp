import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Image,
  Modal,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {DataTable} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import urlExist from 'url-exist';
import {launchImageLibrary} from 'react-native-image-picker';
const RNFS = require('react-native-fs');
const StudentDetails = props => {
  const [Id_No, setIdNo] = useState('');
  const [imgStudent, setImgStudent] = useState(false);
  const [imgMale, setImgMale] = useState(false);
  const [imgFemale, setImgFemale] = useState(false);
  const [details, SetDetails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgPath, setImgPath] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const getGallery = img_path => {
    setSelectedImage(null);
    setImgPath(null);
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options).then(res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('Image picker error: ', res.error);
      } else {
        let imageUri = res.assets?.[0].uri;
        setSelectedImage(imageUri);
        setModalVisible(true);
        setImgPath(img_path);
      }
    });
  };

  function uploadImage() {
    setLoading(true);
    let img_name = Id_No + '.jpg';
    let img_path = imgPath;
    RNFS.mkdir(
      RNFS.ExternalStorageDirectoryPath +
        '/Pictures/Victory Schools/' +
        img_path,
    ).then(() => {
      RNFS.moveFile(
        selectedImage,
        RNFS.ExternalStorageDirectoryPath +
          '/Pictures/Victory Schools/' +
          img_path +
          '/' +
          img_name,
      ).then(() => {
        ToastAndroid.show('Image Saved to Galllery', ToastAndroid.SHORT);
        const url = 'https://victoryschools.in/Victory/php/upload_image.php';
        const formData = new FormData();
        formData.append('File', {
          uri:
            'file://' +
            RNFS.ExternalStorageDirectoryPath +
            '/Pictures/Victory Schools/' +
            img_path +
            '/' +
            img_name,
          type: 'image/jpeg',
          name: img_name,
        });
        formData.append('Action', 'Student');
        formData.append('FileName', img_name);
        formData.append('FilePath', img_path);
        // Make POST request using fetch
        fetch(url, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(res => {
            return res.json();
          })
          .then(response => {
            if (response) {
              if (response.success == 'success') {
                ToastAndroid.show(
                  response.message.toString(),
                  ToastAndroid.SHORT,
                );
              } else {
                ToastAndroid.show(
                  response.message.toString(),
                  ToastAndroid.SHORT,
                );
              }
            } else {
              console.log('No response from server');
            }
          })
          .catch(err => {
            Alert.alert('Error', err);
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
            setModalVisible(false);
          });
      });
    });
  }

  function deleteImage(img_path) {
    setLoading(true);
    let url = 'https://victoryschools.in/Victory/php/upload_image.php';
    const formData = new FormData();
    formData.append('Action', 'Delete');
    formData.append('FileName', Id_No + '.jpg');
    formData.append('FilePath', img_path);
    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then(res => {
        return res.json();
      })
      .then(response => {
        if (response) {
          console.log(response);
          if (response.success == 'success') {
            ToastAndroid.show(response.message.toString(), ToastAndroid.SHORT);
          } else {
            ToastAndroid.show(response.message.toString(), ToastAndroid.SHORT);
          }
        } else {
          console.log('No response from server');
        }
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {selectedImage ? (
              <>
                <Image
                  source={{uri: selectedImage}}
                  style={{width: wp('50'), height: hp('50')}}
                  resizeMode="contain"
                />
              </>
            ) : (
              <></>
            )}
            {loading && <ActivityIndicator size={60} />}
            <View style={{flexDirection: 'row', gap: 20}}>
              <Pressable
                style={[styles.button, styles.button_show]}
                onPress={() => uploadImage()}>
                <Text style={styles.textStyle}>Confirm Image</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
              <>
                <Image
                  source={{
                    uri:
                      'https://victoryschools.in/Victory/Images/stu_img/' +
                      details[1][1] +
                      '.jpg' +
                      '?random=' +
                      Date.now(),
                  }}
                  style={{width: wp('38'), height: wp('45'), borderRadius: 10}}
                />
                <View style={{flexDirection: 'row', gap: 20}}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('Camera', {
                        Id_No: Id_No,
                        Path: 'stu_img',
                      });
                    }}>
                    <Ionicons name="create" size={30} color={'black'} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => getGallery('stu_img')}>
                    <Ionicons name="images" size={30} color={'black'} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert('Confirmation', 'Confirm to Delete Image?', [
                        {
                          text: 'Cancel',
                          onPress: () => null,
                        },
                        {
                          text: 'OK',
                          onPress: () => deleteImage('stu_img'),
                        },
                      ]);
                    }}>
                    <Ionicons name="trash" size={30} color={'red'} />
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Image
                  source={{
                    uri:
                      'https://victoryschools.in/Victory/Images/stu_img/not_photo.jpg' +
                      '?random=' +
                      Date.now(),
                  }}
                  style={{
                    width: wp('38'),
                    height: wp('45'),
                    borderRadius: 10,
                  }}
                />
                <View style={{flexDirection: 'row', gap: 20}}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('Camera', {
                        Id_No: Id_No,
                        Path: 'stu_img',
                      });
                    }}>
                    <Ionicons name="camera" size={30} color={'black'} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => getGallery('stu_img')}>
                    <Ionicons name="images" size={30} color={'black'} />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.image_container}>
              {imgMale ? (
                <>
                  <Image
                    source={{
                      uri:
                        'https://victoryschools.in/Victory/Images/parent_img_male/' +
                        details[1][1] +
                        '.jpg' +
                        '?random=' +
                        Date.now(),
                    }}
                    style={{
                      width: wp('38'),
                      height: wp('45'),
                      borderRadius: 10,
                    }}
                  />
                  <View style={{flexDirection: 'row', gap: 20}}>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('Camera', {
                          Id_No: Id_No,
                          Path: 'parent_img_male',
                        });
                      }}>
                      <Ionicons name="create" size={30} color={'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => getGallery('parent_img_male')}>
                      <Ionicons name="images" size={30} color={'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(
                          'Confirmation',
                          'Confirm to Delete Image?',
                          [
                            {
                              text: 'Cancel',
                              onPress: () => null,
                            },
                            {
                              text: 'OK',
                              onPress: () => deleteImage('parent_img_male'),
                            },
                          ],
                        );
                      }}>
                      <Ionicons name="trash" size={30} color={'red'} />
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <Image
                    source={{
                      uri:
                        'https://victoryschools.in/Victory/Images/parent_img_male/not_photo.jpg' +
                        '?random=' +
                        Date.now(),
                    }}
                    style={{
                      width: wp('38'),
                      height: wp('45'),
                      borderRadius: 10,
                    }}
                  />
                  <View style={{flexDirection: 'row', gap: 20}}>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('Camera', {
                          Id_No: Id_No,
                          Path: 'parent_img_male',
                        });
                      }}>
                      <Ionicons name="camera" size={30} color={'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => getGallery('parent_img_male')}>
                      <Ionicons name="images" size={30} color={'black'} />
                    </TouchableOpacity>
                  </View>
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
                        '.jpg' +
                        '?random=' +
                        Date.now(),
                    }}
                    style={{
                      width: wp('38'),
                      height: wp('45'),
                      borderRadius: 10,
                    }}
                  />
                  <View style={{flexDirection: 'row', gap: 20}}>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('Camera', {
                          Id_No: Id_No,
                          Path: 'parent_img_female',
                        });
                      }}>
                      <Ionicons name="create" size={30} color={'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => getGallery('parent_img_female')}>
                      <Ionicons name="images" size={30} color={'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(
                          'Confirmation',
                          'Confirm to Delete Image?',
                          [
                            {
                              text: 'Cancel',
                              onPress: () => null,
                            },
                            {
                              text: 'OK',
                              onPress: () => deleteImage('parent_img_female'),
                            },
                          ],
                        );
                      }}>
                      <Ionicons name="trash" size={30} color={'red'} />
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <Image
                    source={{
                      uri:
                        'https://victoryschools.in/Victory/Images/parent_img_female/not_photo.jpg' +
                        '?random=' +
                        Date.now(),
                    }}
                    style={{
                      width: wp('38'),
                      height: wp('45'),
                      borderRadius: 10,
                    }}
                  />
                  <View style={{flexDirection: 'row', gap: 20}}>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('Camera', {
                          Id_No: Id_No,
                          Path: 'parent_img_female',
                        });
                      }}>
                      <Ionicons name="camera" size={30} color={'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => getGallery('parent_img_female')}>
                      <Ionicons name="images" size={30} color={'black'} />
                    </TouchableOpacity>
                  </View>
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
  button_input: {
    backgroundColor: 'blue',
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

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: '#000',
    marginBottom: 15,
    textAlign: 'center',
  },
});
