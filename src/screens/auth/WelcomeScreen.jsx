import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React from 'react'


const WelcomeScreen = ({navigation}) => {
  function navigationToSignIn() {
    navigation.navigate('SignInScreen')
  }
  return (
    <View>
      <Text>WelcomeScreen</Text>
      <TouchableOpacity onPress={navigationToSignIn}>
        <Text style={{color: "blue"}}>Click me!</Text>
      </TouchableOpacity>
      
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({})