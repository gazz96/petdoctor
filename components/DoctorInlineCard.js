import { StyleSheet, Text, View, Pressable, Image, ImageBackground, TouchableOpacity, Linking } from 'react-native'
import React from 'react'

// constant
import { Colors, UPLOAD_URL, Rp } from '../constant'

// components
import Gap from './Gap'

// library
import Icon from 'react-native-vector-icons/FontAwesome5';

import moment from 'moment';
const DoctorInlineCard = ( props ) => {

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
    <View>
      <Pressable onPress={props.onPress}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'relative'}}>
          <ImageBackground source={{
            uri: props.doctor.photo_profile
            }} resizeMode="cover" style={{width: 120, height: 120, }} imageStyle={{ borderRadius: 10, backgroundColor: Colors.light }}>
          {
            (props.doctor.information.year_practice) ? <Text style={styles.badge('')}>{moment(props.doctor.information.year_practice, "YYYY").fromNow(true)}</Text> : <></>
          }
          
          
          </ImageBackground>
          <View style={{ paddingLeft: 14, flex: 1, justifyContent: 'space-between'}}>
            <View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.tipeListingBadge}>{props.doctor.information.is_online ? 'Online' : 'Offline'}</Text>

                {
                  props.doctor.sertifikat ? <Text style={styles.tipeListingBadge}>{props.doctor.sertifikat}</Text> : <></>
                }
              </View>
              <Text style={{color: Colors.dark, fontWeight: 'bold', fontSize: 14, lineHeight: 18}} ellipsizeMode={'tail'} numberOfLines={2}>{props.doctor.name}</Text>
              <Gap height={2}/>
              {
                props.doctor.location ? (
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                  <Icon name={'map'} size={12} solid/>
                  <Text style={{ marginLeft: 6, fontSize: 12 }}>{props.doctor.location}</Text>
                </View>) : <></>
              }
              <Gap height={5}/>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {
                  props.doctor.skills ? 
                  props.doctor.skills.map((skill, index) => (
                    <View key={index} style={{ backgroundColor: Colors.primary,  flexDirection: 'row', borderRadius: 3, paddingVertical: 2, paddingHorizontal: 6, marginRight: 3, alignItems: 'center' }}>
                      <Text style={{color: Colors.white, fontSize: 10, marginLeft: 2}}>{skill.skill.name}</Text>
                    </View>
                  ))
                   : <></>
                }

              </View>
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'center',  flexWrap: 'wrap', justifyContent: 'space-between'}}>
              <Text style={{ fontSize: 14, color: Colors.primary, fontWeight: 'bold'}} textBreakStrategy={'simple'}>{Rp(props.doctor.information.price)}</Text>
              {
                props.doctor.review ? 
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                  <Icon name={'star'} color={Colors.yellow} size={14} solid/>
                  <Text style={{ marginLeft: 0, color: Colors.dark, fontWeight: 'bold'}} textBreakStrategy={'simple'}>{props.doctor.review}</Text>
                </View> : <></>
              }
              
            </View>
          </View>
        </View>
        
        
        
        <Gap height={20}/>
      </Pressable>
    </View>
  )
}

export default DoctorInlineCard

const styles = StyleSheet.create({
  badge: (type) => {
    return {
      paddingHorizontal: 12,
      paddingVertical: 4,
      fontSize: 8,
      borderRadius: 5,
      backgroundColor: Colors.acsent,
      color: Colors.white,
      position: 'absolute',
      left: 5,
      bottom: 7
    }
  },
  tipeListingBadge: {
    paddingHorizontal: 12,
      paddingVertical: 4,
      fontSize: 8,
      borderRadius: 5,
      backgroundColor: Colors.light,
      color: Colors.dark,
      display: 'flex',
      marginBottom: 4,
      marginRight: 4
  },
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