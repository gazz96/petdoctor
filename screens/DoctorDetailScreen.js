import { 
    StyleSheet, 
    Text,
    View, 
    ScrollView, 
    ImageBackground, 
    Pressable, 
    useWindowDimensions, 
    Image, 
    TouchableOpacity, 
    Linking
} from 'react-native'

import React, {useState, useEffect, useCallback} from 'react'
import { Colors, BASE_URL, Rp, SAVACONTACT, UPLOAD_URL } from '../constant'
import { Gap, BadgeItem, Loading } from '../components'
import { DoctorAction } from '../actions'

// Use prebuilt version of RNVI in dist folder
import Icon from 'react-native-vector-icons/FontAwesome5';

import DatePicker from 'react-native-date-picker'
import Toast from 'react-native-toast-message';
import Clipboard from '@react-native-clipboard/clipboard';
import { UserContext } from '../context'

import RenderHtml from 'react-native-render-html';
import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';
import {DoctorCardBlock} from '../components'

import WebView from 'react-native-webview';
import { State } from 'react-native-gesture-handler'

const renderers = {
  iframe: IframeRenderer
};

const customHTMLElementModels = {
  iframe: iframeModel
};

const DoctorDetailScreen = ({route, navigation}) => {
  const [isLoadingRelatedProperties, setLoadingRelatedProperties] = useState(true);
  const [relatedProperties, setRelatedProperties] = useState([]);
  const userState = UserContext();

  const normalisasiNomorHP = (phone) => {
        phone = String(phone).trim();
        phone = (phone).replace('-', '');
        phone = (phone).replace(' ', '');
        if (phone.startsWith('08')) {
            phone = '628' + phone.slice(2);
        } else if (phone.startsWith('+62')) {
            phone = '628' + phone.slice(3);
        }
        return phone.replace(/[- .]/g, '');
  }

  const openWaUrl = (noHp, message) => {
    let url = 'https://wa.me/' + normalisasiNomorHP(noHp) + '?text=' + message;
    Linking.openURL(url);
  }

  const getRelatedProperties = async () => {
    setLoadingRelatedProperties(true);
    try {
        const response = await DoctorAction.relatedProperties();
        setRelatedProperties(response);
    }catch(error){
        Toast.show({
            type: 'error',
            text1: 'Peringatan',
            text2: 'Something Wrong'
        });
    }finally{
        setLoadingRelatedProperties(false)
    }
  }

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const savaWhaatsppUrl = 'https://wa.me/' +  '';
  

  const { height, width } = useWindowDimensions();
  const { doctor } = route.params;
  let getImage = (image) => {
      return {
          uri: BASE_URL + '/uploads/' + image
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

  const openUrl = (url) => {
    Linking.openURL(url);
  }

  useEffect(() => {
    //getRelatedProperties();
  }, [route])

  
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView style={{flex: 1, backgroundColor: '#fff'}} contentContainerStyle={{flexGrow: 1}}>
            <ImageBackground source={{
                uri: doctor.photo_profile
            }} imageStyle={{borderBottomLeftRadius: 15, borderBottomRightRadius: 15}} style={styles.hero}>
                <Pressable style={{ paddingHorizontal:  20, paddingVertical: 20}} onPress={() => navigation.goBack()}>
                    <Text style={{ width: 40, height: 40, backgroundColor: '#fff', borderRadius: 40, justifyContent: 'center', textAlign: 'center', lineHeight: 40 }}>
                        <Icon name={'arrow-left'} color={Colors.dark} size={14} solid/>
                    </Text>
                </Pressable>
                
        
                
            </ImageBackground>
            <View style={styles.container}>
                <Gap height={16}/>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  
                    <Text style={styles.badge}>{(doctor.information.str || '').toUpperCase()}</Text>
                    {
                        doctor.skills.map((skill, index) => (
                            <Text style={styles.badge} key={index}>{(skill.skill.name || '').toUpperCase()}</Text>
                        ))
                    }
                </ScrollView>
                <Gap height={10}/>
                <Text style={styles.title}>{doctor.name}</Text>
                <Gap height={5}/>
                
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: Colors.primary, fontWeight:'bold', fontSize: 18 }}>{Rp(doctor.information.price)}</Text>
                    <Text>/Session</Text>
                </View>
                <Gap height={20}/>
            </View>
            
          

            
            {
                doctor.information.practice_address ? 
                <>
                    <View style={styles.container}>
                        <Text  style={{fontWeight: 'bold', color: Colors.dark, fontSize:  16}}>Alamat Praktik</Text>
                        <Gap height={10}/>
                        <TouchableOpacity style={{borderRadius: 10, overflow:"hidden", padding: 0}} onPress={() => {
                            openUrl('https://www.google.com/maps/search/' + doctor.information.practice_address)
                            
                        }}>
                        <Text>{doctor.information.practice_address}</Text>
                        </TouchableOpacity>
                        
                        <Gap height={20}/>
                    </View>
                </> : <></>
            }
            
            {/* Suggest Property */}
            {/* <View style={styles.container}>
                <Text  style={{fontWeight: 'bold', color: Colors.dark, fontSize:  16}}>Dokter Lainnya</Text>
                <Gap height={20}/>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} nestedScrollEnabled={true}>
                {
                    isLoadingRelatedProperties ? <Loading/> : relatedProperties.map((related, index) => {
                        return (  
                            <View style={{width: 280, marginRight: 10}}>
                                <DoctorCardBlock 
                                    title={related.title} 
                                    key={index} 
                                    image={getImage(related.thumbnail)} 
                                    location={''}
                                    price={Rp(related.harga)}
                                    review={related.property_reviews}
                                    listrik={related.listrik}
                                    luas_bangunan={related.luas_bangunan}
                                    jumlah_kamar={related.kamar_tidur}
                                    jumlah_kamar_mandi={related.kamar_mandi}
                                    sertifikat={related.sertifikat}
                                    tipe_listing={related.tipe_listing}
                                    tipe_bangunan={related.tipe_bangunan}
                                    author={related.author}
                                    onPress={() => navigation.navigate("Detail Property", {
                                        property: related
                                    })}
                                />
                            </View>
                        )
                    })
                }
                </ScrollView>
            </View> */}
            <Gap height={20}/>
        </ScrollView>
        {
            (userState.get().role_id != 1) ? 
            <View style={{bottom: 0}}>
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center', minHeight: 40, padding: 15, justifyContent: 'space-between',backgroundColor:'#fff', borderTopLeftRadius: 15, borderTopRightRadius: 10}} onPress={() => {

                navigation.navigate('Order', {
                    doctor: doctor
                });
            }}> 
                <Text style={{backgroundColor: Colors.primary, height: 40, lineHeight: 40, textAlign: 'center', color: '#fff', borderRadius:10, width: '100%', fontWeight:'bold'}}>Hubungi Sekarang</Text>
            </TouchableOpacity>
            </View> : <></>
        }
        
    </View>
  )
}

export default DoctorDetailScreen

const styles = StyleSheet.create({
  hero: {
      height: 220
  },
  title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Colors.dark
  },
  container : {
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      width: '100%',
  },
  contentContainer: {
      backgroundColor: '#fafafa',
      paddingHorizontal: 20,
      paddingVertical: 10,
      width: '100%',
  },
  btnContact: (color) =>  {
    return {
        flexDirection:'row',
        backgroundColor: color,
        width: 40,
        height: 40,
        textAlign: 'center',
        lineHeight: 30,
        borderRadius: 30,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
  },
  badge: {
    fontSize: 10,
    marginRight: 5,
    backgroundColor: Colors.acsent,
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 4,
    color: Colors.white
  }
})