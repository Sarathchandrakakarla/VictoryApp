import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableHighlight,
  View,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Home = p => {
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://victoryschools.in/Victory/App Files/Images/background.jpg',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginHorizontal: wp('4'),
            gap: wp('4'),
            marginTop: hp('1'),
          }}>
          <TouchableHighlight
            underlayColor={'transparent'}
            onPress={() => {
              p.navigation.navigate('Contact');
            }}>
            <Ionicons name={'call-outline'} size={30} color={'#fff'} />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={'transparent'}
            onPress={() => {
              p.navigation.navigate('Notifications');
            }}>
            <Ionicons name={'notifications-outline'} size={30} color={'#fff'} />
          </TouchableHighlight>
        </View>

        <Text style={styles.h2}>Welcome to</Text>
        <Text style={styles.title}>Victory Schools</Text>
      </ImageBackground>
      <View style={styles.div2}>
        <View>
          <Image
            source={{
              uri: 'https://victoryschools.in/Victory/App Files/Images/building.jpg',
            }}
            style={{
              width: wp('90'),
              height: hp('20'),
              borderRadius: 20,
              resizeMode: 'stretch',
            }}
          />
        </View>
        <View>
          <Text style={styles.p}>
            👉
            <Text style={{fontFamily: 'RobotoSlab-Bold'}}>Victory</Text> is the
            Place Where Future Talented Minds Assemble...
          </Text>
          <Text style={styles.p}>
            👉
            <Text style={{fontFamily: 'RobotoSlab-Bold'}}>Victory</Text> is the
            Place Which Brings Glory To Your Skill...
          </Text>
        </View>
        <View style={styles.div3}>
          <Text
            style={{
              color: '#000',
              fontSize: hp('2.5'),
              textAlign: 'center',
              fontFamily: 'RobotoSlab-Bold',
            }}>
            Our Features
          </Text>
          <Text style={styles.notify}>
            We took an initiative to facilitate the digitalized interaction with
            our Victory Schools.
          </Text>
          <View style={{flexDirection: 'column', gap: hp('7')}}>
            <View style={{flexDirection: 'row', gap: wp('10')}}>
              <View style={styles.card}>
                <TouchableHighlight
                  underlayColor={'transparent'}
                  onPress={() => {
                    ToastAndroid.show(
                      'Please Login to Continue',
                      ToastAndroid.SHORT,
                    );
                    p.navigation.navigate('Logins');
                  }}>
                  <Image
                    source={{
                      uri: 'https://victoryschools.in/Victory/App Files/Images/user.png',
                    }}
                    style={styles.card_img}
                  />
                </TouchableHighlight>
                <Text style={styles.card_text}>Student Profile</Text>
              </View>
              <View style={styles.card}>
                <TouchableHighlight
                  underlayColor={'transparent'}
                  onPress={() => {
                    ToastAndroid.show(
                      'Please Login to Continue',
                      ToastAndroid.SHORT,
                    );
                    p.navigation.navigate('Logins');
                  }}>
                  <Image
                    source={{
                      uri: 'https://victoryschools.in/Victory/App Files/Images/attendance.png',
                    }}
                    style={styles.card_img}
                  />
                </TouchableHighlight>
                <Text style={styles.card_text}>Real-Time Attendance</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', gap: wp('10')}}>
              <View style={styles.card}>
                <TouchableHighlight
                  underlayColor={'transparent'}
                  onPress={() => {
                    ToastAndroid.show(
                      'Please Login to Continue',
                      ToastAndroid.SHORT,
                    );
                    p.navigation.navigate('Logins');
                  }}>
                  <Image
                    source={{
                      uri: 'https://victoryschools.in/Victory/App Files/Images/performance.png',
                    }}
                    style={styles.card_img}
                  />
                </TouchableHighlight>
                <Text style={styles.card_text}>Student Performance</Text>
              </View>
              <View style={styles.card}>
                <TouchableHighlight
                  underlayColor={'transparent'}
                  onPress={() => {
                    ToastAndroid.show(
                      'Please Login to Continue',
                      ToastAndroid.SHORT,
                    );
                    p.navigation.navigate('Logins');
                  }}>
                  <Image
                    source={{
                      uri: 'https://victoryschools.in/Victory/App Files/Images/homework.png',
                    }}
                    style={styles.card_img}
                  />
                </TouchableHighlight>
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
  icon: {
    marginLeft: wp('87'),
    marginTop: hp('1.5'),
  },
  h2: {
    color: 'white',
    fontSize: wp('6'),
    margin: 50,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: wp('10'),
    fontFamily: 'NotoSerifDisplay_Condensed-BlackItalic',
    letterSpacing: 5,
  },
  title: {
    fontSize: wp('6'),
    color: 'white',
    margin: 50,
    marginTop: 0,
    marginLeft: wp('16'),
    fontFamily: 'NotoSerifDisplay_Condensed-BlackItalic',
    letterSpacing: 4,
  },
  div2: {
    height: hp('115'),
    padding: 20,
    paddingBottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  p: {
    fontSize: wp('4'),
    color: '#000',
    marginVertical: 10,
    fontFamily: 'RobotoSlab_Regular',
  },
  notify: {
    fontSize: hp('2'),
    color: '#000',
    marginVertical: 10,
    lineHeight: 25,
    fontFamily: 'RobotoSlab_Regular',
    textAlign: 'justify',
  },
  div3: {
    height: hp('70'),
    padding: 20,
    borderRadius: 40,
    textAlign: 'justify',
    backgroundColor: '#E6E6FA',
  },
  card: {
    backgroundColor: '#fff',
    width: wp('35'),
    height: hp('18'),
    borderRadius: 20,
  },
  card_img: {
    width: wp('35'),
    height: hp('17'),
    resizeMode: 'cover',
  },
  card_text: {
    color: '#000',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 15,
    fontFamily: 'RobotoSlab_Regular',
  },
});
