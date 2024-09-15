import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AppState,
  ImageBackground,
  BackHandler,
  PermissionsAndroid,
  Linking,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Camera,
  useCameraPermission,
  useCameraDevice,
} from 'react-native-vision-camera';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
const RNFS = require('react-native-fs');

const CameraPage = p => {
  const handleBack = () => {
    if (photo) {
      Alert.alert(
        'Delete Photo',
        'Are you sure you want to delete this photo?',
        [
          {
            text: 'Cancel',
            onPress: () => null,
          },
          {
            text: 'Delete',
            onPress: () => setPhoto(null),
          },
        ],
      );
      return true; // Indicate that we have handled the back action
    }
    return false; // Allow default back action
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBack,
    );
    return () => backHandler.remove();
  });

  const appState = useRef(AppState.currentState);
  useEffect(() => {
    AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState;
      appState.current == 'active' ? setisActive(true) : setisActive(false);
    });
  });
  useEffect(() => {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    ])
      .then(res => {
        Object.entries(res).map(permission => {
          let per =
            permission[0].split('.')[permission[0].split('.').length - 1];
          let permissionName =
            per == 'CAMERA'
              ? 'Camera'
              : per == 'READ_MEDIA_IMAGES'
              ? 'Storage'
              : '';
          if (permission[1] !== 'granted') {
            Alert.alert(
              'Permission Required',
              permissionName + ' Permission Needed',
              [
                {
                  text: 'Go to Settings',
                  onPress: () => {
                    Linking.openSettings();
                  },
                },
                {
                  text: 'Ask Me Later',
                  onPress: () => {},
                },
              ],
            );
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const device = useCameraDevice('back');
  const camera = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [isActive, setisActive] = useState(true);
  const {hasPermission} = useCameraPermission();
  const [flashactive, setflashactive] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!hasPermission)
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
        }}>
        <Text style={{color: '#fff'}}>
          No access to camera! Go to Settings and Enable Camera Permission
        </Text>
      </View>
    );

  if (device == null) return <NoCameraDeviceError />;

  const takePhoto = async () => {
    const photo = await camera.current.takePhoto({
      flash: flashactive ? 'on' : 'off',
    });
    setPhoto(photo);
    saveImage(photo.path);
  };

  const saveImage = async () => {
    function getTime() {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      return `${year}${month}${day}${hours}${minutes}${seconds}`;
    }
    if (photo) {
      setLoading(true);
      let upload_status =
        p['route']['params'] &&
        p['route']['params']['Path'] &&
        p['route']['params']['Id_No']
          ? true
          : false;
      let img_path =
        p['route']['params'] && p['route']['params']['Path']
          ? '/' + p['route']['params']['Path']
          : '';
      let img_name =
        p['route']['params'] && p['route']['params']['Path']
          ? p['route']['params']['Id_No'] + '.jpg'
          : 'IMG-' + getTime() + '.jpg';
      RNFS.mkdir(
        RNFS.ExternalStorageDirectoryPath +
          '/Android/media/com.victoryschools/Files' +
          img_path,
      ).then(() => {
        RNFS.moveFile(
          photo.path,
          RNFS.ExternalStorageDirectoryPath +
            '/Android/media/com.victoryschools/Files' +
            img_path +
            '/' +
            img_name,
        ).then(() => {
          ToastAndroid.show('Image Saved to Galllery', ToastAndroid.SHORT);
          if (upload_status) {
            const url =
              'https://victoryschools.in/Victory/php/upload_image.php';
            const formData = new FormData();
            formData.append('File', {
              uri:
                'file://' +
                RNFS.ExternalStorageDirectoryPath +
                '/Android/media/com.victoryschools/Files' +
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
                  console.log(response);
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
                setPhoto(null);
              });
          } else {
            setPhoto(null);
          }
        });
      });
    }
  };
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {photo ? (
        <>
          {loading && <ActivityIndicator size={60} />}
          <ImageBackground
            source={{uri: 'file://' + photo.path}}
            style={{width: wp('100'), height: hp('100')}}
            resizeMode="contain"
          />
          <View style={styles.options}>
            <TouchableOpacity
              style={styles.button_save}
              onPress={() => saveImage()}>
              <Text style={{color: '#fff'}}>
                Save <Ionicons name="save" size={15} />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button_retake}
              onPress={() => setPhoto(null)}>
              <Text style={{color: '#fff'}}>
                Re-Take <Ionicons name="refresh" size={15} />
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={{flex: 1}}>
            {device ? (
              <Camera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={isActive}
                photo
                resizeMode="contain"
                enableZoomGesture={true}
                photoQualityBalance="speed"
              />
            ) : (
              <></>
            )}
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                gap: 20,
                alignItems: 'flex-end',
                marginLeft: wp('20'),
              }}>
              <TouchableOpacity
                style={styles.flashbtn}
                onPress={() => navigation.navigate('CamGallery')}>
                <Ionicons name="images-outline" size={30} color={'#fff'} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.flashbtn}
                onPress={() => setflashactive(!flashactive)}>
                <Ionicons
                  name={flashactive ? 'flash' : 'flash-off'}
                  size={30}
                  color={'#fff'}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.camerabtn} onPress={takePhoto}>
                <Ionicons name="camera" size={30} color={'#000'} />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default CameraPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  flashbtn: {
    width: wp('8'),
    height: hp('6'),
    borderRadius: 30,
    bottom: hp('5.5'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  camerabtn: {
    width: wp('12'),
    height: hp('6'),
    borderRadius: 30,
    backgroundColor: '#fff',
    bottom: hp('5.5'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  options: {
    width: wp('100'),
    borderRadius: 30,
    position: 'absolute',
    bottom: hp('5.5'),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 20,
  },
  button_save: {
    backgroundColor: '#006F40',
    width: wp('35'),
    padding: 8,
    borderRadius: 50,
    alignItems: 'center',
  },
  button_retake: {
    backgroundColor: '#ffa500',
    width: wp('35'),
    padding: 8,
    borderRadius: 50,
    alignItems: 'center',
  },
});
