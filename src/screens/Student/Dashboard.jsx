import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [quote, setQuote] = useState([]);
  async function getUsername() {
    await AsyncStorage.getItem('Username').then(name => [setUsername(name)]);
    await AsyncStorage.getItem('Name').then(name => [setName(name)]);
  }

  useEffect(() => {
    messaging()
      .subscribeToTopic('Student')
      .then(() => {});
    AsyncStorage.getItem('Topics').then(topics => {
      let topicsArray = JSON.parse(topics);
      if (!topicsArray.includes('Student')) topicsArray.push('Student');
      AsyncStorage.setItem('Topics', JSON.stringify(topicsArray));
    });
  });
  useEffect(() => {
    getUsername()
      .then(() => {
        if (username && username != '') {
          axios
            .post(
              'http://18.61.98.208:3000/student/getclass',
              {
                Id_No: username,
              },
              {
                timeout: 30000,
              },
            )
            .then(res => {
              messaging()
                .subscribeToTopic(res.data.Class.replace(' ', '_'))
                .then(() => {});
              AsyncStorage.getItem('Topics').then(topics => {
                let topicsArray = JSON.parse(topics);
                if (!topicsArray.includes(res.data.Class.replace(' ', '_')))
                  topicsArray.push(res.data.Class.replace(' ', '_'));
                AsyncStorage.setItem('Topics', JSON.stringify(topicsArray));
              });
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
  useEffect(() => {
    axios
      .get('https://api.quotable.io/quotes/random?limit=1&maxLength=120', {
        timeout: 30000,
      })
      .then(response => {
        setQuote([response.data[0].content, response.data[0].author]);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <SafeAreaView>
      <View style={{height: hp('100%'), backgroundColor: '#E6E6FA'}}>
        <ImageBackground
          source={{
            uri: 'https://victoryschools.in/Victory/App Files/Images/background.jpg',
          }}
          imageStyle={{borderRadius: 30}}
          style={styles.div1}></ImageBackground>
        <ImageBackground
          source={{
            uri:
              'https://victoryschools.in/Victory/Images/stu_img/' +
              username +
              '.jpg' +
              '?random=' +
              Date.now(),
          }}
          imageStyle={{borderRadius: 50}}
          style={styles.div2}></ImageBackground>
        <View style={{width: wp('70')}}>
          <Text style={styles.title}>Welcome, {'\n' + name}</Text>
        </View>
      </View>
      <View style={{position: 'absolute', top: 250}}>
        <Text style={styles.heading}>Pearl of Wisdom</Text>
        <View style={styles.quote_container}>
          <Text style={styles.quote_text}>{quote[0]}</Text>
          <Text style={styles.author_text}>-{quote[1]}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  div1: {
    width: wp('90%'),
    height: hp('18%'),
    position: 'absolute',
    marginHorizontal: 20,
    marginTop: 20,
  },
  div2: {
    position: 'relative',
    width: wp('20'),
    height: hp('10'),
    right: wp('-70'),
    marginTop: 50,
    borderRadius: 50,
  },
  user_img: {
    width: wp('50'),
    height: 200,
    marginTop: 20,
    resizeMode: 'contain',
  },
  title: {
    position: 'absolute',
    fontSize: wp('5'),
    color: '#fff',
    top: wp('-20'),
    left: wp('7'),
    fontFamily: 'RobotoSlab-Bold',
  },
  heading: {
    fontSize: wp('6'),
    color: '#000',
    marginLeft: wp('25'),
    fontFamily: 'RobotoSlab-Bold',
  },
  quote_container: {
    width: wp('90'),
    height: hp('20'),
    backgroundColor: '#fff',
    borderRadius: 10,
    left: wp('5'),
    top: 50,
    padding: 20,
    alignItems: 'center',
  },
  quote_text: {
    color: '#000',
    fontSize: wp('4'),
    fontFamily: 'RobotoSlab_Regular',
  },
  author_text: {
    color: '#000',
    fontSize: wp('4'),
    fontFamily: 'RobotoSlab_Regular',
    top: 20,
    left: 50,
  },
});
