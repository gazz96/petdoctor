import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors, logoSrc } from '../constant'
import Gap from '../components/Gap'
import { SessionAction, AuthAction } from '../actions'

import { UserContext } from '../context';

import Toast from 'react-native-toast-message';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('doctor@gmail.com');
  const [password, setPassword] = useState('doctor')
  const [token, setToken] = useState('');
  const [isLoading, setLoading] = useState(false);

  const state = UserContext()

  const login = async() => {
    setLoading(true)
    try {
        console.log(email, password);
        const response = await AuthAction.attempt(email,password);
        console.log('LOGIN', response);
        if( response.user ) 
        {
            state.setUser(response.user);
            navigation.navigate("Home",{
                screen: 'HomeScreen'
            });
        }
    }
    catch(error) 
    {
        console.log('login error');
        console.log(error.response.data);
        Toast.show({
            type: 'error',
            text1: 'Peringatan',
            text2: 'Username atau password tidak sesuai'
        });
    }finally {
        setLoading(false)
    }

    
  }

  useEffect(() => {
  })

 
  
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
    
        <View style={styles.container}>
            <Gap height={40}/>
            <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode="contain"/>
            <Gap height={40}/>
            <View style={{ width: '100%'}}>
                <Text style={styles.title}>Silahkan masuk untuk memulai</Text>
                <Gap height={30}/>
                <View>
                    <Text style={styles.formLabel}>Email</Text>
                    <TextInput style={styles.formControl} onChangeText={newEmail => setEmail(newEmail)} value={email}/>
                </View>
                <Gap height={20}/>
                <View>
                    <Text style={styles.formLabel} secureTextEntry={true}>Password</Text>
                    <TextInput style={styles.formControl} secureTextEntry={true} onChangeText={newPassword => setPassword(newPassword)} value={password}/>
                </View>
                <Gap height={20}/>
                {
                    isLoading ? <Text style={styles.btnPrimary}>Loading</Text> : (
                    <Pressable onPress={login}>
                        <Text style={styles.btnPrimary}>Masuk</Text>
                    </Pressable>
                    )
                }
                
                <Gap height={12}/>
                <TouchableOpacity style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}} onPress={()=>{navigation.navigate('Register Screen')}}>
                    <Text style={{fontWeight: 'bold', fontSize: 14, color: '#828282'}}>Belum memiliki akun ?</Text>
                </TouchableOpacity>
                <Gap height={180}/>
            </View>
        </View>
        
    </ScrollView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    logo: {
        width: 200,
        height: 200
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#222'
    },
    formLabel: {
        fontSize: 12, 
        marginBottom: 4,
        color: '#222'
    },
    formControl: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 10,
        height: 40,
        paddingHorizontal: 16
    },
    btnPrimary: {
        borderRadius: 10,
        color: '#fff',
        backgroundColor: Colors.primary,
        height: 40,
        lineHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})