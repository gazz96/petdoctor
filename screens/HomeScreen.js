import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Image, TouchableOpacity, Modal, Pressable, Dimensions, ImageBackground, Linking, ActivityIndicator } from 'react-native';
import { TipeBangunan, logoSrc, BASE_URL, UPLOAD_URL, Colors, SAVACONTACT } from '../constant';

// Use prebuilt version of RNVI in dist folder
import Icon from 'react-native-vector-icons/FontAwesome5';

import SquareCard from '../components/SquareCard';
import RecentArticle from '../components/RecentArticle';
import LatestPropertyCardBlock from '../components/LatestPropertyCardBlock';
import RecommendedDoctorCardBlock from '../components/RecommendedDoctorCardBlock';
import { Loading, Gap, BadgeItem, DoctorCardBlock } from '../components';
import { UserContext, ShopContext } from '../context';
import {DoctorAction, SkillAction} from '../actions';
import { Rp } from '../constant';
import Toast from 'react-native-toast-message';

import Slideshow from 'react-native-image-slider-show';

const HomeScreen = ({ route, navigation, props }) => {
    const windowWidth = Dimensions.get('window').width - 32;
    const state = UserContext();
    const [user, setUser] = useState('');
    const shopSearchParams = ShopContext();
    const [isLoadingRelatedProperties, setLoadingRelatedProperties] = useState(true);
    const [relatedProperties, setRelatedProperties] = useState([]);
    const [isOnline, setOnline] = useState(false);
    const [skills, setSkills] = useState([]);
    const [isLoadingSkill, setLoadingSkill] = useState(true);
    const imageSrc = () => {
        let images = [
            'https://plus.unsplash.com/premium_photo-1658506915122-d37e0d173c06?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
            'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1153&q=80',
            'https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80',
            'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
        ];
        let index = Math.floor(Math.random() * (images.length-1));
        return {
            uri :images[index]
        }
    }

    const getRelatedDocters = async () => 
    {
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

    let getImage = (image) => {
        return {
            uri: BASE_URL + '/uploads/' + image
        }
    }

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

    const getSkills = async() => {
        setLoadingSkill(true);
        try {
            const response = await SkillAction.get();
            setSkills(response)
            console.log(response)
        }catch(error)
        {
            console.log('error skill', error);
        }
        finally{
            setLoadingSkill(false);
        }
    }

    const updateActivity = async(status) => {
        try {
            //console.log('status', status);
            const response = await DoctorAction.updateActivity(state.get().id, status);
            state.setUser(response);
            Toast.show({
                type: 'success',
                text1: 'Berhasil',
                text2: `Anda sedang ${status ? 'Online' : 'Offline'}`
            });
        }catch(error) 
        {
            Toast.show({
                type: 'error',
                text1: 'Peringatan',
                text2: 'Something Wrong'
            });
        }
        finally{
        }
    }

    useEffect(() => {
        //getRelatedDocters()
        getSkills();
        if(state.get().role_id == 1) 
        {
            setOnline(state.get().information.is_online)
        }
    }, [route])




    return (
    
        <ScrollView style={{ flex: 1, backgroundColor: '#fff'}}>
            <Gap height={20}/>
            {/* Header */}
            <View style={[styles.container, { justifyContent: 'space-between', flexDirection: 'row'}]}>
                {
                    (state.get().id && state.get().photo_profile) ? 
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between',  width: '100%' }}>
                        <Pressable onPress={()=>navigation.navigate("SettingScreen")} style={{flexDirection: 'row', alignItems: 'center',}}>
                            <Image source={{
                                uri: state.get().photo_profile
                            }} resizeMode="contain" 
                            style={{
                                borderRadius: 10, width: 40, height: 40, borderColor: Colors.muted, borderWidth: 1, backgroundColor: Colors.white,
                                borderWidth: 1, borderColor: Colors.white, marginRight: 8
                            }}/>
                            <View>
                                <Text style={{fontWeight: 'bold', color: Colors.dark}}>{state.get().name}</Text>
                                <Text>{state.get().email}</Text>
                            </View>
                        </Pressable>
                        {
                            state.get().role_id == 1 ? 
                            <View>
                                <Text style={{textAlign: 'right', backgroundColor: Colors.acsent, color: '#fff', borderRadius: 3, paddingHorizontal: 5, paddingVertical: 2}} 
                                onPress={() => {
                                    setOnline(!isOnline);
                                    updateActivity(!isOnline);
                                }}>{isOnline ? 'Online' : 'Offline'} </Text>
                            </View>
                            : <></>
                        }
                        
                    </View> : <TouchableOpacity onPress={ () => {navigation.navigate("Login")}} style={{ 
                        width: 40,
                        height: 40,
                        backgroundColor: Colors.white, 
                        borderRadius: 8, 
                        display: 'flex',
                        alignItems: 'center', 
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}>
                        <Icon name={'user'} color={Colors.primary} size={12} solid/>
                    </TouchableOpacity>
                }
                
            </View>
            
            <Gap height={20}/>
            {/* Search Bar */}
            <View style={styles.container}>
                <TextInput style={styles.inputSearch} placeholder="Cari Dokter" onChangeText={(text) => shopSearchParams.keyword.set(text)}
                onSubmitEditing={() => { 
                    navigation.navigate('ShopScreen')
                }} 
                value={shopSearchParams.keyword.get()}/>
            </View>

            <Gap height={20}/>
            {/* Slidershow */}
            <View style={[styles.container]}>
                <View style={{position: 'relative', overflow: 'hidden', borderRadius: 10, }}>
                    <Slideshow 
                        height={160}
                        containerStyle={{borderRadius: 10}}
                        dataSource={[
                            { url:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' },
                            { url:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1453&q=80' },
                            { url:'https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' }
                        ]}/>
                </View>
            </View>
            <Gap height={20}/>
            <View style={styles.container}>
                <Text style={styles.title}>Keahlian</Text>
                {
                    isLoadingSkill ? <ActivityIndicator/> : 
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            skills.map((skill, index) => {
                                return (<BadgeItem key={index} name={skill.name} onClick={()=>{
                                    shopSearchParams.skill.set(skill)
                                    navigation.navigate('ShopScreen')
                                }}/>)
                            }) 
                        }   
                    </ScrollView>
                }
                
            </View>
            {/* <Gap height={20}/>
            <LatestPropertyCardBlock title={'Baru baru Ditambahkan'} navigation={navigation}/> */}
            <Gap height={20}/>
            <RecommendedDoctorCardBlock title={'Rekomendasi Dokter'} navigation={navigation}/>
            {/* <Gap height={20}/> */}
            {/* <View style={styles.container}>
                <Text style={styles.title}>Rekomendasi Kami</Text>
                <ScrollView showsHorizontalScrollIndicator={false} 
                    horizontal={true} 
                    decelerationRate={0} 
                    snapToInterval={windowWidth} //your element width
                    snapToAlignment={"center"}
                    nestedScrollEnabled={true}>
                    {
                        isLoadingRelatedProperties ? <Loading/> : relatedProperties.map((related, index) => (  
                            <View style={{width: 150, marginRight: 10}} key={index}>
                                <DoctorCardBlock 
                                    title={related.title} 
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
                        ))
                    }
                </ScrollView> 
            </View> */}
            <Gap height={20}/>
            {/* <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={styles.title}>Cari Berdasarkan Kota</Text>
                    <Text style={{ marginBottom: 8 }}  onPress={() => {
                        navigation.navigate('Kota')
                    }}>Lihat Semua</Text>
                </View>
                <Gap height={10}/>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <SquareCard name={'Tangerang'} image={'https://sava.co.id/uploads/kota/tangerang.jpg'} onPress={()=> {
                        shopSearchParams.kota.set('TANGERANG')
                        navigation.navigate('ShopScreen');
                    }}/>
                    <SquareCard name={'Bekasi'} image={'https://sava.co.id/uploads/kota/bekasi.jpg'} onPress={()=> {
                        shopSearchParams.kota.set('BEKASI')
                        navigation.navigate('ShopScreen');
                    }}/>
                    <SquareCard name={'Jakarta'} image={'https://sava.co.id/uploads/kota/jkt.jpg'} onPress={()=> {
                        shopSearchParams.kota.set('JAKARTA')
                        navigation.navigate('ShopScreen');
                    }}/>
                    <SquareCard name={'Bogor'} image={'https://sava.co.id/uploads/kota/BOGOR.jpg'} onPress={()=> {
                        shopSearchParams.kota.set('BOGOR')
                        navigation.navigate('ShopScreen');
                    }}/>
                    <SquareCard name={'Depok'} image={'https://sava.co.id/uploads/kota/depok.jpg'} onPress={()=> {
                        shopSearchParams.kota.set('DEPOK')
                        navigation.navigate('ShopScreen');
                    }}/>
                </ScrollView>
            </View> 
            <Gap height={20}/>
            */}
            <View style={styles.container}>
                <ImageBackground source={require('../assets/images/banner-contact.png')} imageStyle={{borderRadius: 10}} style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent:'center', minHeight: 180, width: '100%', borderRadius: 10, borderWidth: 1, borderColor: Colors.light, paddingBottom: 10}} resizeMode="contain">
                    <TouchableOpacity onPress={() => {
                        openWaUrl('62895401180015', "Saya ingin konsultasi layanan.");
                    }}>
                        <Text style={{ fontWeight: 'bold', color: Colors.white, backgroundColor: Colors.primary, paddingVertical: 8, paddingHorizontal: 18, borderRadius: 8, fontSize: 12}}>Konsultasi seputar layanan</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
            <Gap height={30}/>
            <RecentArticle navigation={navigation}/>
            
            
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    logo: {
        width: 40,
        height: 40
    },
    container: {
        paddingHorizontal: 16
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#000',
        fontSize: 16
    },
    enteredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    inputSearch: { 
        width: '100%', 
        borderWidth: 1, 
        borderColor: Colors.white, 
        borderRadius: 8, 
        paddingHorizontal: 16, 
        paddingVertical: 6,
        backgroundColor: Colors.white,
        color: Colors.dark
    },
    badge: {
        fontSize: 10,
        marginRight: 5,
        backgroundColor: Colors.light,
        paddingVertical: 5,
        paddingHorizontal: 16,
        borderRadius: 8
    }
})

export default HomeScreen;