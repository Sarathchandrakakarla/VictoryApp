import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const About = () => {
  let academics = [
    'Qualified Faculty',
    'Fully Equipped Science Lab',
    'Smart Classrrom with LCD Projector',
    'IIT Foundation',
    'Vedic Maths',
    'Abacus',
    'Spoken English',
    'Drawing',
  ];
  let ssc = [
    {
      year: '2017',
      results: {
        10: '3',
        9.8: '5',
        9.7: '8',
      },
    },
    {
      year: '2018',
      results: {
        10: '5',
        9.8: '8',
        9.7: '12',
      },
    },
    {
      year: '2019',
      results: {
        10: '9',
        9.8: '9',
        9.7: '12',
      },
    },
  ];
  return (
    <ScrollView style={styles.container}>
      <View>
        <ImageBackground
          source={{
            uri: 'https://victoryschools.in/Victory/App Files/Images/about.jpg',
          }}
          style={styles.div1}></ImageBackground>
      </View>
      <View style={styles.div2}>
        <Text style={styles.subtitle}>Our Management</Text>
        <View style={{flexDirection: 'row', gap: 50, marginTop: 50}}>
          <View style={styles.card}>
            <Image
              source={{
                uri: 'https://victoryschools.in/Victory/App Files/Images/principal.jpg',
              }}
              style={styles.card_img}
            />
            <Text style={styles.card_text}>K. Ramakrishna Reddy</Text>
            <Text style={styles.card_text}>Principal</Text>
          </View>
          <View style={styles.card}>
            <Image
              source={{
                uri: 'https://victoryschools.in/Victory/App Files/Images/correspondent.jpg',
              }}
              style={styles.card_img}
            />
            <Text style={styles.card_text}>A. Narasimha Reddy</Text>
            <Text style={styles.card_text}>Correspondent</Text>
          </View>
        </View>
        <Text
          style={{
            color: '#000',
            marginTop: 100,
            lineHeight: 20,
            fontSize: wp('3.5'),
            textAlign: 'justify',
            fontFamily: 'RobotoSlab_Regular',
          }}>
          Victory High School is proudly guided by the visionary leadership of
          Principal{'\n'}
          <Text style={{fontStyle: 'italic'}}>K. Ramakrishna Reddy </Text>and
          Correspondent{'\n'}
          <Text style={{fontStyle: 'italic'}}>A. Narasimha Reddy. </Text>
          With their unwavering commitment to education, they ensure that our
          institution remains a beacon of academic excellence and holistic
          development.
        </Text>
        <Text style={styles.subtitle}>Our Academic Facilities</Text>
        <View style={{paddingLeft: 10, marginTop: 20}}>
          {academics.map((li, ind) => (
            <Text key={ind} style={styles.list_item}>
              ⭐ {li}
            </Text>
          ))}
        </View>
        <Text style={styles.subtitle}>Our SSC Results</Text>
        <View style={{paddingLeft: 10, marginTop: 20}}>
          {ssc.map((y, ind) => (
            <View key={Math.random()}>
              <Text key={ind} style={styles.list_item}>
                🏆 SSC {y.year}
                {'\n'}
                <Text key={Math.random()} style={{color: '#000'}}>
                  {'             '}
                  10.0 GPA - {y.results['10']} students
                </Text>
                {'\n'}
                <Text key={Math.random()} style={{color: '#000'}}>
                  {'             '}
                  9.8 GPA - {y.results['9.8']} students
                </Text>
                {'\n'}
                <Text key={Math.random()} style={{color: '#000'}}>
                  {'             '}
                  9.7 GPA - {y.results['9.7']} students
                </Text>
              </Text>
            </View>
          ))}
          <Text
            style={{
              color: '#000',
              fontSize: wp('3.5'),
              marginTop: 10,
              fontFamily: 'RobotoSlab_Regular',
              textAlign: 'justify',
            }}>
            A great achievement our school got is: {'\n'}In SSC 2014, SSC 2015,
            SSC 2016 our students received PRATIBHA PURASKAR by Honourable Chief
            minister.
          </Text>
          <Text
            style={{
              color: '#000',
              fontSize: wp('3.5'),
              marginTop: 10,
              fontFamily: 'RobotoSlab_Regular',
              textAlign: 'justify',
            }}>
            Our Students have been getting admissions into the most prestigious
            institution in AP, the IIIT (triple IT) every year since its
            establishment.
          </Text>
          <Text style={styles.subtitle}>Our Co-Curricular Activities</Text>
          <Text
            style={{
              color: '#000',
              fontSize: wp('3.5'),
              marginTop: 10,
              fontFamily: 'RobotoSlab_Regular',
              textAlign: 'justify',
            }}>
            Besides the curricular activities we give much importance to all
            co-curricular and extra-curricular activities like Sports and games,
            dance social activities and cultural activities. We try to instill
            moral and traditional values in children and drive them towards
            responsibility and respect in the society. For this to happen we
            celebrate all festivals in harmony with all religious people.
          </Text>
          <Image
            source={{
              uri: 'https://victoryschools.in/Victory/App Files/Images/event1.jpg',
            }}
            style={{
              width: wp('85'),
              height: hp('23'),
              borderRadius: 20,
              resizeMode: 'cover',
              marginTop: 10,
            }}
          />
          <Image
            source={{
              uri: 'https://victoryschools.in/Victory/App Files/Images/event2.jpg',
            }}
            style={{
              width: wp('85'),
              height: hp('23'),
              borderRadius: 20,
              resizeMode: 'cover',
              marginTop: 10,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    position: 'absolute',
    height: hp('100'),
  },
  div1: {
    height: hp('25'),
    opacity: 0.6,
  },
  div2: {
    width: wp('100'),
    padding: 20,
    paddingBottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#E6E6FA',
    paddingBottom: 20,
    position: 'relative',
    marginTop: -50,
    marginBottom: 50,
  },
  subtitle: {
    textAlign: 'center',
    color: '#000',
    fontSize: wp('5'),
    marginTop: 10,
    fontFamily: 'RobotoSlab-Bold',
  },
  card: {
    width: wp('40'),
    height: hp('20'),
  },
  card_img: {
    width: wp('40'),
    height: hp('20'),
    resizeMode: 'cover',
    borderRadius: 20,
  },
  card_text: {
    color: '#000',
    textAlign: 'center',
    fontSize: wp('3.3'),
    marginTop: 15,
    marginLeft: -15,
    fontFamily: 'RobotoSlab_Regular',
  },
  list_item: {
    color: '#000',
    fontSize: wp('3.5'),
    fontFamily: 'RobotoSlab_Regular',
  },
});
