import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView, TouchableOpacity  } from 'react-native'
import React, { useState } from 'react'
import { Colors, logoSrc } from '../constant'
import Gap from '../components/Gap'
import { AuthAction } from '../actions'
import { useHookstate } from '@hookstate/core'


import Toast from 'react-native-toast-message';
import { Loading } from '../components'

const RegisterScreen = ({ route, navigation }) => {

  const {role_id} = route.params
  const [isLoading, setLoading] = useState(false);
  const form = useHookstate({
    role_id: '',
    email: 'akunbaru@gmail.com',
    no_hp: '1234567890',
    password: 'akunbaru123'
  })

  const createAccount = async() => {
    setLoading(true)
    try {
        form.role_id.set(role_id)
        const response = await AuthAction.register(form.get())
        console.log(response);
        Toast.show({
            type: 'success',
            text1: 'Berhasil membuat akun',
            text2: 'mohon ditunggu akun anda sedang diverifikasi oleh team kami'
        });
    }catch(error){
        console.log(error.response.data);
        let errors = error.response.data.errors;
        for(let err in errors)
        {
            let messages = errors[err];
            console.log(messages)
            messages.map((message, index) => {
            Toast.show({
                type: 'error',
                text1: 'Peringatan',
                text2: message
            });
            })
        }
    }finally{
        setLoading(false)
    }
    
  }
  
  
  return (
    <ScrollView style={{ flex: 1 }}>
        {
            isLoading ? <Loading/> : 
            <View style={styles.container}>
                <Gap height={40}/>
                <Image source={logoSrc} style={styles.logo} resizeMode="contain"/>
                <Gap height={80}/>
                <View style={{ width: '100%'}}>
                    <Text style={styles.title}>Buat Akun Baru</Text>
                    <Gap height={30}/>
                    <View>
                        <Text style={styles.formLabel}>Email</Text>
                        <TextInput style={styles.formControl} onChangeText={text => form.email.set(text)} value={form.email.get()}/>
                    </View>
                    <Gap height={20}/>
                    <View>
                        <Text style={styles.formLabel}>Nomor HP</Text>
                        <TextInput style={styles.formControl} onChangeText={text => form.no_hp.set(text)} keyboardType="number-pad" value={form.no_hp.get()}/>
                    </View>
                    <Gap height={20}/>
                    <View>
                        <Text style={styles.formLabel}>Password</Text>
                        <TextInput style={styles.formControl} onChangeText={text => form.password.set(text)} secureTextEntry={true} value={form.password.get()}/>
                    </View>
                    <Gap height={20}/>
                    <View style={{flexDirection:'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                        <Text style={styles.btnSecondary} onPress={() => navigation.goBack()}>Kembali</Text>
                        <Text style={styles.btnPrimary} onPress={() => createAccount()}>Daftar</Text>
                    </View>
                    <Gap height={12}/>
                    <TouchableOpacity style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}  onPress={() => {
                        
                        navigation.navigate('Login')
                    }}>
                        <Text style={{fontWeight: 'bold', fontSize: 14, color: '#828282'}}>Sudah punya akun ?</Text>
                    </TouchableOpacity>
                    <Gap height={40}/>
                </View>
            </View>
        }
        
    </ScrollView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    logo: {
        width: 110,
        height: 110
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
        height: 50,
        paddingHorizontal: 16
    },
    btnPrimary: {
        width: '48%',
        borderRadius: 10,
        color: '#fff',
        backgroundColor: Colors.primary,
        height: 50,
        lineHeight: 50,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btnSecondary: {
        width: '48%',
        borderRadius: 10,
        color: '#fff',
        backgroundColor: Colors.light,
        height: 50,
        lineHeight: 50,
        justifyContent: 'center',
        alignItems: 'center',
        color: Colors.dark,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})