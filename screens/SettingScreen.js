import { View, Text, Pressable, StyleSheet, ScrollView, Image } from 'react-native'
import React from 'react'


// Use prebuilt version of RNVI in dist folder
import Icon from 'react-native-vector-icons/FontAwesome5';

import HeaderWithBackButton from '../components/HeaderWithBackButton';
import { Colors, UPLOAD_URL } from '../constant';
import Gap from '../components/Gap';
import { UserContext } from '../context';


const SettingScreen = ({ navigation }) => {
  const state = UserContext();
  return (
    <ScrollView style={styles.container}>
      <Gap height={25}/>
      <HeaderWithBackButton title="Pengaturan" onPress={() => navigation.goBack()}/>
      <Gap height={55}/>
      
        
          <View style={{alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
            {
              state.get().id && state.get().photo_profile ? 
                <Image source={{
                  uri: state.get().photo_profile
                }} style={{ width: 80, height: 80, borderRadius: 10}} resizeMode="cover"/>
                : <></>
            }
            {
              state.get().id ? (
              <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}>
                <Gap height={8}/>
                <Text style={{ fontWeight: 'bold', color: Colors.dark, fontSize: 14 }}>{state.get().name}</Text>
                <Text>{state.get().email}</Text>
              </View>
              )
              : <></>
            }
            
          </View> 
      

      <Gap height={40}/>
      <Pressable style={styles.flatList} onPress={() => {navigation.navigate("Personal Info")}}>
        <Text style={{color: Colors.primary, fontWeight:'bold'}}>Informasi Personal</Text>
        <Icon name={'chevron-right'} color={Colors.primary} size={14}/>
      </Pressable>
      <Gap height={14}/>



      
      
      {
        [4,5].includes(state.get().role_id) ? 
        <>
        <Pressable style={styles.flatList} onPress={() => {navigation.navigate("My Income")}}>
          <Text style={{color: Colors.dark, fontWeight:'bold'}}>Penghasilan</Text>
          <Icon name={'chevron-right'} color={Colors.primary} size={14}/>
        </Pressable>
        <Gap height={14}/>
        </>
      : <></>
      }
      
      {
        [4,5].includes(state.get().role_id) ? 
        <>
        <Pressable style={styles.flatList} onPress={() => {navigation.navigate("My Review")}}>
          <Text style={{color: Colors.dark, fontWeight:'bold'}}>Ulasan</Text>
          <Icon name={'chevron-right'} color={Colors.primary} size={14}/>
        </Pressable>
        <Gap height={14}/>
        </>: <></>
      }
      
      
      <Pressable style={styles.flatList} onPress={() => {navigation.navigate("My Order")}}>
        <Text style={{color: Colors.primary, fontWeight:'bold'}}>Pesanan</Text>
        <Icon name={'chevron-right'} color={Colors.primary} size={14}/>
      </Pressable>
      <Gap height={14}/>
      <Pressable style={styles.flatList} onPress={() => {navigation.navigate("Account Security")}}>
        <Text style={{color: Colors.primary, fontWeight:'bold'}}>Keamanan</Text>
        <Icon name={'chevron-right'} color={Colors.primary} size={14}/>
      </Pressable>
      <Gap height={14}/>
      {
        [4,5].includes(state.get().role_id) ? 
        <Pressable style={styles.flatList} onPress={() => {navigation.navigate("Induction Program")}}>
          <Text style={{color: Colors.dark, fontWeight:'bold'}}>Sava Induction Program</Text>
          <Icon name={'chevron-right'} color={Colors.primary} size={14}/>
        </Pressable>
        :
        <></>
      }
      
      <Gap height={50}/>
      <Pressable style={{ justifyContent: 'center',  flexDirection:'row'}} onPress={()=> { 
        state.setUser({});
        navigation.replace('Login')
      }}>
        <Text style={{ backgroundColor: Colors.primary, height: 40, width: 150, color: '#fff', textAlign: 'center', lineHeight: 40, borderRadius: 10, fontWeight:'bold'}}>Logout</Text>
      </Pressable>
      <Gap height={50}/>
    </ScrollView>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  flatList: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    backgroundColor: Colors.white, 
    paddingVertical: 12, 
    paddingHorizontal: 18, 
    borderRadius: 10
  }
})