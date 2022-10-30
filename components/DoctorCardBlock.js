import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Image, Linking, ScrollView } from 'react-native';

// Use prebuilt version of RNVI in dist folder
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, UPLOAD_URL, Rp } from '../constant';
import Gap from './Gap';
const DoctorCardBlock = (props) => {

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

    return (
        <TouchableOpacity style={{ marginBottom: 25 }} onPress={props.onPress}>
            <ImageBackground source={{
                uri: props.doctor.photo_profile
            }} resizeMode="cover" 
                imageStyle={{borderRadius: 10, flexDirection: 'row'}} 
                style={{ 
                    width: '100%', 
                    height: 160,
                    marginBottom: 8,
                    backgroundColor: Colors.light,
                    borderRadius: 10
                }}>

            </ImageBackground>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}} nestedScrollEnabled={true}>
                {
                    props.doctor.skills ? 
                        props.doctor.skills.map((skill, index) => (
                            <Text style={{
                                backgroundColor: Colors.white, 
                                color: Colors.primary, 
                                paddingVertical: 3, 
                                paddingHorizontal: 8, 
                                borderRadius: 3, 
                                fontSize: 12, 
                                marginRight: 8, 
                                marginBottom: 5
                            }}>{skill.skill.name}</Text>
                        )) : <></> 
                }
                {
                    props.doctor.information.year_practice ? 
                    <Text style={{
                                backgroundColor: Colors.white, 
                                color: Colors.primary, 
                                paddingVertical: 3, 
                                paddingHorizontal: 8, 
                                borderRadius: 3, 
                                fontSize: 12, 
                                marginRight: 8, 
                                marginBottom: 5
                            }}>{props.doctor.information.year_practice}</Text> : <></>
                }
            
                
            </View>
            <Text style={{ fontWeight: 'bold', color: Colors.dark, fontSize: 14}} numberOfLines={2}>{props.doctor.name}</Text>
            

            {/* <View style={{flexDirection:'row'}}>
        
                
                {
                    props.doctor.jumlah_kamar ?
                    <View style={{ backgroundColor: Colors.acsent,  flexDirection: 'row', borderRadius: 3, paddingVertical: 2, paddingHorizontal: 6, marginRight: 3, alignItems: 'center' }}>
                        <Icon name={'bed'} size={10} solid  color={Colors.white}/>
                        <Text style={{color: Colors.white, fontSize: 10, marginLeft: 2}}>{props.doctor.jumlah_kamar}</Text>
                    </View> : <></>
                }
                
                {
                    props.doctor.jumlah_kamar_mandi ? 
                    <View style={{ backgroundColor: Colors.acsent,  flexDirection: 'row', borderRadius: 3, paddingVertical: 2, paddingHorizontal: 6, marginRight: 3, alignItems: 'center' }}>
                        <Icon name={'bath'} size={10} solid  color={Colors.white}/>
                        <Text style={{color: Colors.white, fontSize: 10, marginLeft: 2}}>{props.doctor.jumlah_kamar_mandi}</Text>
                    </View> : <></>
                }
                
                {
                    props.doctor.listrik ? 
                    <View style={{ backgroundColor: Colors.acsent,  flexDirection: 'row', borderRadius: 3, paddingVertical: 2, paddingHorizontal: 6, marginRight: 3, alignItems: 'center' }}>
                        <Icon name={'bolt'} size={10} solid  color={Colors.white}/>
                        <Text style={{color: Colors.white, fontSize: 10, marginLeft: 2}}>{props.doctor.listrik}</Text>
                    </View> : <></>
                }
                
            </View>   */}
            <Gap height={2}/>
            <Text style={{color: Colors.primary, fontWeight:'bold', fontSize: 14 }}>{Rp(props.doctor.information.price)}</Text>
            <Gap height={5}/>
            
            
        </TouchableOpacity>
    )
}


export default DoctorCardBlock;

const styles = StyleSheet.create({
    btnContact: (color) =>  {
        return {
            flexDirection:'row',
            backgroundColor: color,
            width: 30,
            height: 30,
            textAlign: 'center',
            lineHeight: 30,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center'
        } 
      },
})