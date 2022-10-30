import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Gap, HeaderWithBackButton, Loading } from '../components'
import { Colors } from '../constant'
import { ShopContext } from '../context'
import { DoctorAction } from '../actions'


import Toast from 'react-native-toast-message';



const KotaScreen = ({ navigation }) => {

  const shopSearchParams = ShopContext();
  const [isLoading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [cities, setCities] = useState([]);

  const getCities = async(name='') => {
    setLoading(true);
    try{
      const response = await DoctorAction.getCities(name);
      setCities(response);
    }
    catch(error)
    {
      console.log('wew');
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Peringatan',
        text2: 'Something Wrong'
      });
    } finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    getCities();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Gap height={25}/>
      <HeaderWithBackButton title="Settings" onPress={() => navigation.goBack()}/>
      <Gap height={55}/>
      
      <View>
        <TextInput style={styles.formControl} placeholder={'Cari Kota'} onChangeText={text => setKeyword(text)} onSubmitEditing={() => {
          getCities(keyword);
        }}/>
      </View>
      <Gap height={20}/>
      <View>
        {
          isLoading ? <Loading/> :  
          cities.map((city, index) => {
            return (
              <View key={city.id}>
                <Text style={styles.listView} onPress={() => {
                  shopSearchParams.kota.set(city.nama)
                  navigation.navigate('ShopScreen');
                }}>{(city.nama).toUpperCase()}</Text>
              </View> 
            )
          })
          
        }
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex:1 ,
    backgroundColor: Colors.white
  },
  formControl: {
    borderColor: Colors.light,
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 10
  },
  listView: {
    paddingVertical: 5,
    borderBottomColor: Colors.light,
    borderBottomWidth: 1
  }
})

export default KotaScreen