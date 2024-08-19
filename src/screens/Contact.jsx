import * as React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Touchable,
  TouchableHighlight,
  View,
} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import call from 'react-native-phone-call';
const contacts = [
  {
    id: 1,
    name: 'K. Ramakrishna Reddy',
    designation: 'Principal',
    phone: '9440289081',
    img: 'Principal.jpg',
    args: {
      number: '+919440289081',
      prompt: true,
      skipCanOpen: true,
    },
  },
  {
    id: 2,
    name: 'A. Narasimha Reddy',
    designation: 'Correspondent',
    phone: '9885027156',
    img: 'correspondent.jpg',
    args: {
      number: '+919885027156',
      prompt: true,
      skipCanOpen: true,
    },
  },
  {
    id: 3,
    name: 'S. Mahammad Hussain',
    designation: 'Head Master',
    phone: '9912652121',
    img: 'hm.jpg',
    args: {
      number: '+919912652121',
      prompt: true,
      skipCanOpen: true,
    },
  },
  {
    id: 4,
    name: 'Victory School',
    designation: 'School Office',
    phone: '08566-244584',
    img: 'Victory Logo.png',
    args: {
      number: '08566-244584',
      prompt: true,
      skipCanOpen: true,
    },
  },
];
const Contact = () => (
  <SafeAreaView>
    <ScrollView>
      <View
        style={{
          height: hp('80'),
          gap: hp('4'),
          marginTop: hp('2'),
          marginHorizontal: wp('2.5'),
        }}>
        {contacts.map(contact => (
          <Card key={contact.id}>
            <Card.Content style={{flexDirection: 'row', width: wp('100')}}>
              <Card.Content style={{width:wp("70")}}>
                <Text variant="titleLarge">{contact.name}</Text>
                <Text variant="titleMedium">{contact.designation}</Text>
                <TouchableHighlight
                  onPress={() => {
                    call(contact.args).catch(err => {
                      console.log(err);
                    });
                  }}
                  underlayColor="transparent">
                  <Text variant="bodyMedium" style={{color: 'blue'}}>
                    Phone : {contact.phone}
                  </Text>
                </TouchableHighlight>
              </Card.Content>
              <ImageBackground
                source={{
                  uri:
                    'https://victoryschools.in/Victory/Images/' + contact.img,
                }}
                imageStyle={{borderRadius: 50}}
                style={{width: wp('20'), height: wp('20')}}
              />
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScrollView>
  </SafeAreaView>
);

export default Contact;
