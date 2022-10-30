import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Gap, HeaderWithBackButton, Loading } from '../components'
import { Colors, Rp } from '../constant';
import { OrderAction } from '../actions';
import { UserContext } from '../context';

const TimelineScreen = ({ route, navigation }) => {
  const { order_id } = route.params;
  const [order, setOrder] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const state = UserContext();


  useEffect(()=>{
    const getOrder = async() => {
        try {
            const response = await OrderAction.getItem({
                order_id: order_id,
                user_id: state.get().id
            });
            console.log('order', response);
            setOrder(response);
        }catch(error) {
            console.log(error);
        }finally{
            setLoading(false)
        }
    }
    getOrder();
  }, [])
  return (
    <ScrollView style={styles.container}>
        <Gap height={20}/>
        <HeaderWithBackButton title="Timeline" onPress={()=>{navigation.goBack()}}/>
        <Gap height={40}/>
        {
            isLoading ? <Loading/> : <>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{fontSize: 10}}>Tanggal Order</Text>
                <Text style={{
                    fontSize: 24,
                    color: Colors.dark,
                    fontWeight: 'bold'
                }}>{order.order_date}</Text>
            </View>
            <Gap height={40}/>
            {
                (order.timelines) ? (order.timelines).map((timeline, index)=> (
                    <View style={{backgroundColor: Colors.light, padding: 15, borderRadius: 10, marginBottom: 16}}>
                        <Text style={{fontWeight: 'bold', color: Colors.dark}}>{timeline.timeline_step}</Text>
                        <Text style={{color:'#828282'}}>{timeline.timeline_desc}</Text>
                    </View>
                )) : <></>
            }
            
            </>
        }
        
      
    </ScrollView>
  )
}

export default TimelineScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        flex: 1
    }
})