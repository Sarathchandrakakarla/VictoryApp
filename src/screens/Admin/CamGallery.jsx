import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  ToastAndroid,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Gallery from 'react-native-awesome-gallery';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
const RNFS = require('react-native-fs');

const CamGallery = props => {
  const [images, setImages] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);
  useEffect(() => {
    RNFS.readDir(
      RNFS.ExternalStorageDirectoryPath + '/Android/media/com.victoryapp/Files',
    ).then(res => {
      let data = res.filter(val => val.isFile());
      data = data
        .sort((a, b) => {
          if (a && b) b.mtime - a.mtime;
        })
        .map(img => {
          if (img.isFile()) return 'file://' + img.path;
        });
      if (data && data != [undefined]) setImages(data);
      else setImages([]);
    });
  }, [images]);

  useEffect(() => {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    ).then(res => {
      if (!res) {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        ).then(res => {
          if (res !== 'granted') {
            Alert.alert(
              'Permission Denied',
              'You need to allow the app to access your gallery.',
              [
                {
                  text: 'OK',
                  onPress: () => Linking.openSettings(),
                },
              ],
            );
          }
        });
      }
    });
  }, []);

  function deleteImage() {
    Alert.alert('Delete Image', 'Confirm to Delete Image?', [
      {
        text: 'Cancel',
        onPress: () => null,
      },
      {
        text: 'OK',
        onPress: () => {
          let filepath = images[currIndex]
            .toString()
            .substring(7, images[currIndex].toString().length);
          RNFS.exists(filepath).then(res => {
            if (res) {
              RNFS.unlink(filepath)
                .then(() => {
                  ToastAndroid.show(
                    'Image Deleted Successfully',
                    ToastAndroid.SHORT,
                  );
                })
                .catch(err => {
                  console.log(err);
                });
            }
          });
        },
      },
    ]);
  }
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#000',
        }}>
        <TouchableHighlight
          style={styles.close}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Ionicons name="close" size={30} color="white" />
        </TouchableHighlight>
        {images.length != 0 ? (
          <TouchableHighlight
            style={styles.close}
            onPress={() => {
              deleteImage();
            }}>
            <Ionicons name="trash" size={30} color="red" />
          </TouchableHighlight>
        ) : (
          <></>
        )}
      </View>

      {images.length != 0 && images ? (
        <Gallery data={images} onIndexChange={setCurrIndex} />
      ) : (
        <>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#000',
            }}>
            <Text style={{color: '#fff', textAlign: 'center'}}>
              No Images Found
            </Text>
          </View>
        </>
      )}
    </>
  );
};

export default CamGallery;

const styles = StyleSheet.create({
  close: {
    /* width: wp('50'), */
    backgroundColor: '#000',
    padding: 20,
    zIndex: 10,
  },
});
