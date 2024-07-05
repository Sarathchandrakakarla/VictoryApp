import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const Dashboard = () => {
  return (
    <View style={{alignItems:"center"}}>
      <Image source={require("../../assets/logo.png")} style={styles.logo}/>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
    logo:{
        width: 200,
        height: 200,
        marginTop:20
    }
})