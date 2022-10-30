import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Gap, HeaderWithBackButton, Loading } from '../components'
import OrderInlineCard from '../components/OrderInlineCard'
import { Colors, Rp } from '../constant'
import { OrderAction, UserAction } from '../actions'
import { UserContext } from '../context'

import Clipboard from '@react-native-clipboard/clipboard';

import SelectDropdown from 'react-native-select-dropdown'
import { useHookstate } from '@hookstate/core'

const OrderScreen = ({route, navigation}) => {

  const { doctor } = route.params;
  const [banks, setBanks] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const state = UserContext();

  const getMyBanks = async() => {
       
        setLoading(true)
        setBanks([])
        try {
            const response = await UserAction.banks()
            console.log(response)
            setBanks(response);
            return response;
        }catch(error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
  }

  const createOrder = async()=> {
    try{
      const request = await OrderAction.create(form.get());
      navigation.navigate('My Order');
      console.log(request)
    }
    catch(error)
    {
      console.log(error.response)
    }
    finally{

    }
  }

  const copyToClipboard = async(text, message = 'Berhasil menyalin') => {
    Clipboard.setString(text);
    Toast.show({
        type: 'success',
        text1: 'Informasi',
        text2: message
    });
  }

  const form = useHookstate({
    user_id: '',
    doctor_id: '',
    bank_id: '',
    amount: 0,
    status: 'Success',
  });

  useEffect(() => {
    getMyBanks();
    form.user_id.set(2);
    form.doctor_id.set(doctor.id);
    form.amount.set(doctor.information.price);
  }, [])

  return (
    <View style={{ flex: 1}}>
      <ScrollView style={styles.container}>
          <Gap height={20}/>
          <HeaderWithBackButton title="Ringkasan Pembayaran" onPress={()=> navigation.goBack()}/>
          <Gap height={40}/>
          <View style={{ flexDirection: 'row', }}>
            <Image source={{uri: doctor.photo_profile}} style={{ width: 50, height:60, borderRadius: 5 }} resizeMode={'cover'}/>
            <View style={{marginLeft: 10}}>
                <Text style={{ fontWeight: 'bold', color: Colors.dark}}>{doctor.name}</Text>
                <Text style={{fontSize: 12}}>Lokasi Praktik: {doctor.information.practice_address}</Text>
            </View>
          </View>
          <Gap height={20}/>
          <View style={{}}>
            <Text>Biaya per sesi: </Text>
            <Text style={{fontWeight: 'bold', color: Colors.dark}}>{Rp(doctor.information.price)}</Text>
          </View>
          <Gap heigh={20}/>
          <View>
            <Gap height={3}/>
            <View style={{ width: '100%' }}>
                <Text style={{fontWeight:'bold', color: Colors.dark}}>Bank</Text>
                <Text style={{fontSize: 12}}>Tranfer ke salah satu bank berikut</Text>
                <SelectDropdown buttonStyle={{borderRadius: 10, height: 40, width: '100%'}} rowStyle={{}} rowTextStyle={{}} data={banks} onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  form.bank_id.set(selectedItem.id);
                  return selectedItem.nama + ' - ' + selectedItem.an + ' - ' + selectedItem.norek
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item.nama + ' - ' + item.an + ' - ' + item.norek
                }}/>
              </View>
            
          </View>

          <View style={{bottom: 0}}>
          
        </View>
      </ScrollView>
      <TouchableOpacity style={{flexDirection:'row',alignItems:'center', minHeight: 40, padding: 15, justifyContent: 'space-between',backgroundColor:'#fff', borderTopLeftRadius: 15, borderTopRightRadius: 10}} onPress={() => {
          createOrder();
        }}> 
        <Text style={{backgroundColor: Colors.primary, height: 40, lineHeight: 40, textAlign: 'center', color: '#fff', borderRadius:10, width: '100%', fontWeight:'bold'}}>Bayar & Konfirmasi</Text>
        </TouchableOpacity>
    </View>
  )
}

export default OrderScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    }
})