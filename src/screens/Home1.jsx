import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
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
            style={{width: 390, height: 195, borderRadius: 20,resizeMode:"stretch"}}
          />
        </View>
        <View>
          <Text style={styles.p}>
            👉
            <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>
              Victory
            </Text>{' '}
            is the Place Where Future Talented Minds Assemble...
          </Text>
          <Text style={styles.p}>
            👉
            <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>
              Victory
            </Text>{' '}
            is the Place Which Brings Glory To Your Skill...
          </Text>
        </View>
        <View style={styles.div3}>
          <Text
            style={{
              color: '#000',
              fontWeight: 'bold',
              fontSize: 20,
              textAlign: 'center',
            }}>
            Our Features
          </Text>
          <Text style={styles.notify}>
            We took an initiative to facilitate the digitalized interaction with
            our Victory Schools.
          </Text>
          <View style={{flexDirection: 'column', gap: 80}}>
            <View style={{flexDirection: 'row', gap: 50}}>
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
            <View style={{flexDirection: 'row', gap: 50}}>
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
    fontSize: 35,
    margin: 50,
    marginBottom: 20,
    marginLeft: 20,
    fontStyle: 'italic',
  },
  title: {
    fontSize: 35,
    color: 'white',
    margin: 50,
    marginTop: 0,
    marginLeft: 95,
    fontStyle: 'italic',
  },
  div2: {
    padding: 20,
    paddingBottom:0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#fff',
    paddingBottom:20
  },
  p: {
    fontSize: 18,
    color: '#000',
    marginVertical: 10,
  },
  notify: {
    fontSize: 15,
    color: '#000',
    marginVertical: 10,
    lineHeight: 25,
  },
  div3: {
    height: 620,
    padding: 20,
    borderRadius:40,
    textAlign: 'justify',
    backgroundColor: '#E6E6FA',
  },
  card: {
    backgroundColor: '#fff',
    width: 150,
    height: 150,
    borderRadius: 20,
  },
  card_img: {
    width: 150,
    height: 150,
    resizeMode:"cover"
  },
  card_text: {
    color: '#000',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 15,
  },
});
