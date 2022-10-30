import { StyleSheet, Text, View, ScrollView, Pressable, Image, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'

// Use prebuilt version of RNVI in dist folder
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Rp, UPLOAD_URL } from '../constant';
import { DoctorAction } from '../actions';

//Components
import { BadgeItem, Gap, HeaderWithBackButton, DoctorInlineCard } from '../components';

import { ShopContext } from '../context';

const ShopScreen = ({route, navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [doctors, setDoctors] = useState([]);
    const [page, setPage] = useState(1);
    const shopSearchParams = ShopContext();
    
    const getDoctors = async(params = {}) => {
       
        setLoading(true)
        setDoctors([])
        // params.tipe_listing = shopSearchParams.tipe_listing.get();
        // params.tipe_bangunan = shopSearchParams.tipe_bangunan.get();
        // params.harga_tertinggi = shopSearchParams.harga_tertinggi.get();
        // params.harga_terendah = shopSearchParams.harga_terendah.get();
        // params.kota = shopSearchParams.kota.get() || '';
        if(shopSearchParams.skill.get())
        {
          params.skill_id = shopSearchParams.skill.get().id;
        }
    
        params.keyword = shopSearchParams.keyword.get();
        try {
            const response = await DoctorAction.get(params)
            setDoctors(p => [...p, ...response]);
            return response.data;
        }catch(error) {
            console.log(error.response)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
      
        const unsubscribe = navigation.addListener('focus', () => {
          getDoctors({
              paginate: 20,
              page: page,
          });
        
      }, [navigation]);
    }, [])

    

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };
  


  return (
    <ScrollView style={styles.container} onScroll={({nativeEvent}) => {
    }}>
      <Gap height={20}/>
      <HeaderWithBackButton onPress={() => goBack(navigation)} title={'Doctors'}/>
      <Gap height={45}/>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <BadgeItem onClick={() => {
          navigation.navigate('Search Screen')
        }} name={<Icon size={18} name={'search'}/>}/>
        {
          shopSearchParams.keyword.get() ? <BadgeItem
             onClick={() => {
              shopSearchParams.keyword.set(''); 
              getDoctors({
                paginate: 20,
                page: page
              })
            }}  name={"Keyword " + shopSearchParams.get().keyword} closeButton={true}/> : <></>
        }
        {
          shopSearchParams.skill.get().id ? <BadgeItem onClick={() => {
            shopSearchParams.skill.set({}); 
              getDoctors({
                paginate: 20,
                page: page
              })
            }} name={shopSearchParams.skill.get().name} closeButton={true}/> : <></>
        }
        {
          shopSearchParams.tipe_bangunan.get() ? <BadgeItem onClick={() => {
            shopSearchParams.tipe_bangunan.set(''); 
              getDoctors({
                paginate: 20,
                page: page
              })
            }} name={shopSearchParams.tipe_bangunan.get()} closeButton={true}/> : <></>
        }
        
        {
          shopSearchParams.kota.get() ? <BadgeItem onClick={() => {
            shopSearchParams.kota.set(''); 
              getDoctors({
                paginate: 20,
                page: page
              })
            }} name={"Kota " + shopSearchParams.get().kota} closeButton={true}/> : <></>
        }

        

        
      </ScrollView>
      <Gap height={12}/>
      {
        isLoading ? <ActivityIndicator/> : doctors.map((doctor, index) => {
          return (
            <DoctorInlineCard 
              key={index}
              doctor={doctor}
              onPress={() => navigation.navigate('Detail Doctor', {
                doctor: doctor
              })}/>
          )
        })
      }
      <Gap height={20}/>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity onPress={() => {
            setPage(page => page - 1)
            getDoctors({
              page: page,
            });
          }} style={styles.btnLoadMore}>
          <Icon name={'chevron-left'} size={12} solid color={'#fff'}/>
          <Text style={{color: Colors.white, marginLeft: 10}}>Sebelumnya</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
            setPage(page => page + 1)
            getDoctors({
              page: page,
            });
          }} style={styles.btnLoadMore}>
          <Text style={{color: Colors.white, marginRight: 10}}>Selanjutnya</Text>
          <Icon name={'chevron-right'} size={12} solid color={'#fff'}/>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default ShopScreen

const goBack = (navigation) => {
  navigation.goBack()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor :'#fff'
  },
  btnLoadMore: {
    backgroundColor: Colors.primary, 
    color: '#fff', 
    height: 30, 
    borderRadius: 10, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    lineHeight: 30, 
    width: 120,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

})