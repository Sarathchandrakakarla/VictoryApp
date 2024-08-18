import * as React from 'react';
import {ImageBackground, SafeAreaView, ScrollView, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const contacts = [
  {
    id: 1,
    name: 'K. Ramakrishna Reddy',
    designation: 'Principal',
    phone: '9440289081',
    img: 'Principal.jpg',
  },
  {
    id: 2,
    name: 'A. Narasimha Reddy',
    designation: 'Correspondent',
    phone: '9885027156',
    img: 'correspondent.jpg',
  },
  {
    id: 3,
    name: 'S. Mahammad Hussain',
    designation: 'Head Master',
    phone: '9912652121',
    img: 'hm.jpg',
  },
  {
    id: 4,
    name: 'Victory School',
    designation: 'School Office',
    phone: '08566-244584',
    img: 'Victory Logo.png',
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
            <Card.Content
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Card.Content>
                <Text variant="titleLarge">{contact.name}</Text>
                <Text variant="titleMedium">{contact.designation}</Text>
                <Text variant="bodyMedium">Phone : {contact.phone}</Text>
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
