import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import React from 'react'
import {Colors} from '../constant';
import { TouchableOpacity } from 'react-native';

const OnBoardingSecondScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <ImageBackground source={require('../assets/images/onboarding-2.jpg')} style={{ 
            width: '100%', 
            height: 300 
        }} resizeMode={'cover'}>
            <Text onPress={() => navigation.navigate('Home')} style={{
                position: 'absolute', 
                right: 10, 
                top: 10, 
                backgroundColor: Colors.primary, 
                color: Colors.white, 
                paddingVertical: 3, 
                paddingHorizontal: 10,  
                borderRadius: 3,
                fontSize: 10, }}>Skip</Text>
        </ImageBackground>
        <View style={{ padding: 20, justifyContent: 'space-between', flex: 1, borderRadius: 30, marginTop: -30, backgroundColor: Colors.white, overflow: 'hidden' }}>
            <View>
                <Text style={styles.title}>Bergabung bersama Sava Properti. Dapatkan banyak keuntungan.</Text>
                <Text style={styles.description}>Gratis pasang iklan, Banyak Proyek primary, Banyak Prospek lead buyer, Gratis Sava Properti Induction Program, Komisi tanpa batas dan ratusan juta </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.btnSecondary}>Sebelumnya</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.btnPrimary}>Selanjutnya</Text>
                </TouchableOpacity>
            </View>
        </View>
      
    </View>
  )
}

export default OnBoardingSecondScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    btnSecondary: {
        backgroundColor: Colors.light,
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.dark,
        height: 40
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