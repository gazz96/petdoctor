import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Gap, HeaderWithBackButton, Loading } from '../components'
import OrderInlineCard from '../components/OrderInlineCard'
import { OrderAction, UserAction } from '../actions'
import { UserContext } from '../context'

const MyOrderScreen = ({navigation}) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const state = UserContext();
  const getMyOrders = async() => {
    console.log('my order');
    try {
      const response = await OrderAction.get({
        user_id: state.get().id,
        role_id: state.get().role_d
      });
      console.log(response);
      setOrders(response);
    }catch(error)
    {
      console.log('wew',error)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    getMyOrders()
  }, [])

  return (
      <ScrollView style={styles.container}>
          <Gap height={20}/>
          <HeaderWithBackButton title="Pesanan" onPress={()=> navigation.navigate('SettingScreen')}/>
          <Gap height={40}/>
          <View>
          {
            isLoading ? <ActivityIndicator/> : orders.map((order, index) => 
              (<OrderInlineCard 
                  key={index}
                  order={order}
                  onPress={() => {
                    if(order.status == 'Success') 
                    {
                      navigation.navigate('Chats', {
                        order: order,
                        user: state.get().role_id == '1' ? order.doctor : order.user
                      })
                    }

                    if(order.staus == 'Pending') 
                    {
                      Toast.show({
                          type: 'warning',
                          text1: 'Peringatan',
                          text2: 'Silahkan tunggu sampai status berubah menjadi Success'
                      });
                    }
                  }}
                />)
            )
          }
          </View>
      </ScrollView>
  )
}

export default MyOrderScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    }
})