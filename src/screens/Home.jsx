import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen";
const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={require('../assets/background.jpg')}>
        <Text style={styles.h2}>Welcome to</Text>
        <Text style={styles.title}>Victory Schools</Text>
      </ImageBackground>
      <View style={styles.div2}>
        <View>
          <Image
            source={require('../assets/building.jpg')}
            style={{width: wp("90"), height: hp("20"), borderRadius: 20,resizeMode:"stretch"}}
          />
        </View>
        <View>
          <Text style={styles.p}>
            👉
            <Text style={{fontFamily:"RobotoSlab-Bold"}}>
              Victory
            </Text>{' '}
            is the Place Where Future Talented Minds Assemble...
          </Text>
          <Text style={styles.p}>
            👉
            <Text style={{fontFamily:"RobotoSlab-Bold"}}>
              Victory
            </Text>{' '}
            is the Place Which Brings Glory To Your Skill...
          </Text>
        </View>
        <View style={styles.div3}>
          <Text
            style={{
              color: '#000',
              fontSize: hp("2.5"),
              textAlign: 'center',
              fontFamily:"RobotoSlab-Bold"
            }}>
            Our Features
          </Text>
          <Text style={styles.notify}>
            We took an initiative to facilitate the digitalized interaction with
            our Victory Schools.
          </Text>
          <View style={{flexDirection: 'column', gap: 60}}>
            <View style={{flexDirection: 'row', gap: 40}}>
              <View style={styles.card}>
                <Image
                  source={require('../assets/user.png')}
                  style={styles.card_img}
                />
                <Text style={styles.card_text}>Student Profile</Text>
              </View>
              <View style={styles.card}>
                <Image
                  source={require('../assets/attendance.png')}
                  style={styles.card_img}
                />
                <Text style={styles.card_text}>Real-Time Attendance</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', gap: 40}}>
              <View style={styles.card}>
                <Image
                  source={require('../assets/performance.png')}
                  style={styles.card_img}
                />
                <Text style={styles.card_text}>Student Performance</Text>
              </View>
              <View style={styles.card}>
                <Image
                  source={require('../assets/homework.png')}
                  style={styles.card_img}
                />
                <Text style={styles.card_text}>Daily Homeworks</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  h2: {
    color: 'white',
    fontSize: wp("6"),
    margin: 50,
    marginBottom: 20,
    marginLeft: 50,
    fontFamily:"NotoSerifDisplay_Condensed-BlackItalic",
    letterSpacing:5
  },
  title: {
    fontSize: wp("6"),
    color: 'white',
    margin: 50,
    marginTop: 0,
    marginLeft: 70,
    fontFamily:"NotoSerifDisplay_Condensed-BlackItalic",
    letterSpacing:4,
  },
  div2: {
    height:hp("115"),
    padding: 20,
    paddingBottom:0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#fff',
    paddingBottom:20
  },
  p: {
    fontSize: wp("4"),
    color: '#000',
    marginVertical: 10,
    fontFamily:"RobotoSlab_Regular",
  },
  notify: {
    fontSize: hp("2"),
    color: '#000',
    marginVertical: 10,
    lineHeight: 25,
    fontFamily:"RobotoSlab_Regular",
    textAlign:"justify"
  },
  div3: {
    height: hp("70"),
    padding: 20,
    borderRadius:40,
    textAlign: 'justify',
    backgroundColor: '#E6E6FA',
  },
  card: {
    backgroundColor: '#fff',
    width: wp("35"),
    height: hp("18"),
    borderRadius: 20,
  },
  card_img: {
    width: wp("35"),
    height: hp("17"),
    resizeMode:"cover"
  },
  card_text: {
    color: '#000',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 15,
    fontFamily:"RobotoSlab_Regular",
  },
});
