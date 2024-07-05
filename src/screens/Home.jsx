import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Image source={require('../assets/building.jpg')} style={styles.logo} />
        <Text style={styles.h2}>Victory Schools, Kodur</Text>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    width: 440,
    height: 180,
  },
  h2:{
    fontSize: 30,
    textAlign:"center",
    fontWeight:"bold",
    color:"#000"
  }
});
