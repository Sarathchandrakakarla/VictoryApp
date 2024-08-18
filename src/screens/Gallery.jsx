import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Gallery from 'react-native-awesome-gallery';
import {Card, Text} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Home = () => {
  const images = [];
  for (let i = 1; i <= 21; i++) {
    images.push(
      'https://victoryschools.in/Victory/Gallery/Images/event' + i + '.jpg',
    );
  }

  const [gallery, setGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  function showGallery(index) {
    setGallery(true);
    setGalleryIndex(index);
  }

  function closeGallery() {
    setGallery(false);
  }

  return (
    <>
      {gallery ? (
        <>
          <TouchableOpacity style={styles.close} onPress={closeGallery}>
            <Ionicons
              name="close"
              size={30}
              color="white"
            />
          </TouchableOpacity>
          <Gallery
            data={images}
            initialIndex={galleryIndex}
            style={{marginTop: hp('-10')}}
            onSwipeToClose={() => {
              console.log(1);
            }}
          />
        </>
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.row}>
            {images.map((img, ind) => {
              return (
                <Card
                  key={ind}
                  style={styles.card}
                  onPress={() => showGallery(ind)}>
                  <Card.Cover source={{uri: img}} />
                </Card>
              );
            })}
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: wp('2'),
    marginVertical: hp('1'),
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    width: wp('90'),
    marginHorizontal: wp('2.5'),
    marginVertical: hp('0.5'),
  },
  close: {
    width: wp('20'),
    backgroundColor: 'transparent',
    padding: 20,
    zIndex: 10,
  },
});
