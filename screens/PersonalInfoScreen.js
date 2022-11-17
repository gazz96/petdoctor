import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'

// library
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Gap, HeaderWithBackButton, Loading } from '../components'
import { BASE_URL, Colors, UPLOAD_URL } from '../constant'
import { UserContext } from '../context';
import { UserAction } from '../actions';
import * as ImagePicker from 'react-native-image-picker';

import { useHookstate } from '@hookstate/core';

import Toast from 'react-native-toast-message';

const PersonalInfoScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [previewThumbnail, setPreviewThumbnail] = useState('');

  const userState = UserContext();
  const personalInfoState = useHookstate({
    id: '',
    name: '',
    email: '',
    birth_of_date: '',
    gender: '',
    hp: '',
    address: '',
    photo_profile: '',
    information: {},
    skills: [],
  })
  
  const updateProfile = async() => {
    setLoading(true);
    let fd = new FormData();
    const keys = personalInfoState.keys;
    for(let key in keys){
      console.log(keys[key] , personalInfoState[keys[key]].get())
      fd.append(keys[key], personalInfoState[keys[key]].get())
    }

    try {
      const response = await UserAction.update(fd);
      Toast.show({
        type: 'success',
        text1: 'Informasi',
        text2: 'Berhasil memperbaharui'
      });
    }catch(error){
      console.log('update profile', error.response.data);
      Toast.show({
          type: 'error',
          text1: 'Peringatan',
          text2: error.response.data.message
      });
    }
    finally{
      setLoading(false);
    }
  }

  const setValue = async(key, value) => {
    personalInfoState[key].set(value);
  }

  const getMyPersonalInfo = async () => {
    try {
      const response = await UserAction.me(userState.get().id);
      console.log('response', response);
      //const response = await UserAction.me(108);

      personalInfoState.id.set(response.id);
      personalInfoState.name.set(response.name);
      personalInfoState.email.set(response.email);
      personalInfoState.birth_of_date.set(response.birth_of_date);
      personalInfoState.gender.set(response.gender);
      personalInfoState.hp.set(response.hp);
      personalInfoState.address.set(response.address);
      personalInfoState.photo_profile.set(response.photo_profile);
      personalInfoState.skills.set(response.skills);
      personalInfoState.information.set(response.information);

    
      // console.log(UPLOAD_URL + '/' + response.photo)
      // setPreviewThumbnail(UPLOAD_URL + '/' + response.photo)

    }catch(error){
     console.log('wew', error.response);
    }
    finally{
      setLoading(false)
    }
    
  }

  

  const includeExtra = true;
  

  useEffect(()=> {
    getMyPersonalInfo();
  }, [])

  return (
    <ScrollView style={styles.container}>
      <Gap height={20}/>
      <HeaderWithBackButton title="Personal Information" onPress={() => navigation.goBack()}/>
      <Gap height={50}/>
      {
        isLoading ? <Loading/> : 
        <View>
          <View>
            <Text style={styles.formLabel}>Nama Lengkap</Text>
            <TextInput style={styles.formControl}  onChangeText={text => setValue('name', text)} value={personalInfoState.name.get()}/>
          </View>
          <Gap height={20}/>

          <View>
            <Text style={styles.formLabel}>Email</Text>
            <TextInput style={styles.formControl} onChangeText={text => setValue('email', text)} value={personalInfoState.email.get()}/>
          </View>
          <Gap height={20}/>

          <View>
            <Text style={styles.formLabel}>Tanggal Lahir</Text>
            <TextInput style={styles.formControl} onChangeText={text => setValue('birth_of_date', text)} value={personalInfoState.birth_of_date.get()}/>
          </View>
          <Gap height={20}/>

          <View>
            <Text style={styles.formLabel}>Jenis Kelamin</Text>
            <TextInput style={styles.formControl} value={personalInfoState.gender.get()}/>
          </View>
          <Gap height={20}/>

          <View>
            <Text style={styles.formLabel}>HP</Text>
            <TextInput style={styles.formControl} onChangeText={text => setValue('hp', text)} value={personalInfoState.hp.get()}/>
          </View>
          <Gap height={20}/>

          <View>
            <Text style={styles.formLabel}>Alamat</Text>
            <TextInput style={styles.formControl} onChangeText={text => setValue('address', text)} value={personalInfoState.address.get()}/>
          </View>
          <Gap height={20}/>



          <View>
            <Text style={styles.formLabel}>Profile</Text>
            
            {
              personalInfoState.photo_profile.get() ? 
                <Image 
                  source={{ uri: personalInfoState.photo_profile.get() }} 
                  style={{width: 150, height: 150, borderRadius: 10 }} 
                  resizeMode="cover"/> : <></>
            
            }
            
          </View>
          <Gap height={20}/>
          <Text style={styles.separator}></Text>
          <Gap height={20}/>
          {
            userState.get().role_id == 1 ? 
            <>
            <Text style={styles.title}>Informasi Tambahan</Text>
            <Gap height={16}/>
            <View>
              <Text style={styles.formLabel}>STR</Text>
              <TextInput style={styles.formControl} value={personalInfoState.information.get().str}/>
            </View>
            <Gap height={20}/>
            <View>
              <Text style={styles.formLabel}>Alamat Praktik</Text>
              <TextInput style={styles.formControl} onChangeText={text => setValue('nama_cabang', text)} value={personalInfoState.information.get().practice_address}/>
            </View>
            <Gap height={20}/>
              
            <View>
              <Text style={styles.formLabel}>Kemampuan</Text>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {
                personalInfoState.skills.get().map((skill, index )=>{
                  return (
                    <Text key={index} style={{padding: 5, color: Colors.primary, backgroundColor: Colors.white, marginRight: 8}}>{skill.skill.name}</Text>
                  )
                })
              }
              </ScrollView>
            </View>
          </> : <></>
          }
          

          {/* <Pressable style={{ flexDirection: 'row', justifyContent: 'flex-end'}} onPress={()=> {
            updateProfile()
          }}>
            <Text style={styles.btnPrimary}>Simpan Perubahan</Text>
          </Pressable> */}
          <Gap height={40}/>

        </View>
      }
      
    </ScrollView>
  )
}

export default PersonalInfoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontWeight: '500',
    fontSize: 18, 
    color: Colors.dark
  },
  separator: {
    borderBottomWidth: 1, borderBottomColor: Colors.muted
  },
  formLabel: {
    fontSize: 12,
    color: Colors.dark,
    fontWeight: 'bold',
    marginBottom: 5
  },
  formControl: {
    borderColor: Colors.muted,
    borderRadius: 10,
    backgroundColor: Colors.light,
    paddingHorizontal: 16,
    height: 40
  },
  formInputFile: {
    width: 150,
    height: 150,
    backgroundColor: Colors.light, 
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: 150
  },
  btnPrimary: {
    maxWidth: 170, 
    height: 40, 
    paddingHorizontal: 20, 
    color: '#fff', 
    backgroundColor: Colors.primary, 
    borderRadius: 10, 
    lineHeight: 40, 
    textAlign: 'center', 
    fontWeight: 'bold'
  }
})