import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import {Colors} from '../constant';
import { TouchableOpacity } from 'react-native';

const OnBoardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <ImageBackground source={require('../assets/images/onboarding-1.jpg')} style={{ 
            width: '100%', 
            height: 400 
        }} resizeMode={'cover'}>
            {/* <Text onPress={() => navigation.navigate('Home')} style={{
                position: 'absolute', 
                right: 10, 
                top: 10, 
                backgroundColor: Colors.primary, 
                color: Colors.white, 
                paddingVertical: 3, 
                paddingHorizontal: 10,  
                borderRadius: 3,
                fontSize: 10, }}>Skip</Text> */}
        </ImageBackground>
        <View style={{ padding: 20, justifyContent: 'space-between', flex: 1, borderRadius: 30, marginTop: -30, backgroundColor: Colors.white, overflow: 'hidden' }}>
            <View>
                <Text style={styles.title}>Selamat datang di PETCARE</Text>
                <Text style={styles.description}>Jasa dan konsultasikan kesehatan hewan peliharaan anda bersama kami</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.btnPrimary}>Selanjutnya</Text>
            </TouchableOpacity>
        </View>
    
    </View>
  )
}

export default OnBoardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    btnPrimary: {
        backgroundColor: Colors.primary,
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.white,
        height: 40
    },
    title: {
        textAlign: 'center',
        color: Colors.dark,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    description: {
        textAlign: 'center'
    }
})