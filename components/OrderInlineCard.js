import { StyleSheet, Text, View, Pressable, Image, ImageBackground } from 'react-native'
import React from 'react'

// constant
import { Colors, Rp } from '../constant'

// components
import Gap from './Gap';

// library
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import { UserContext } from '../context';

const OrderInlineCard = ( props ) => {
  
  const state = UserContext();
  return (
    <View>
      <Pressable onPress={props.onPress}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'relative'}}>
          {
            props.order.doctor.photo_profile ? <ImageBackground source={{
            uri: state.get().role_id == '1' ? props.order.user.photo_profile : props.order.doctor.photo_profile
            }} resizeMode="cover" style={{width: 120, height: 120, backgroundColor: Colors.white, borderRadius: 10}} imageStyle={{ borderRadius: 10 }}>
            {
                (props.order.status) ? <Text style={styles.badge(props.order.badgeType)}>{props.order.status}</Text> : <></>
            }
          </ImageBackground> : <></>
          }
          
          <View style={{ paddingLeft: 14, flex: 1, justifyContent: 'space-between'}}>
            <View>
              <View style={{flexDirection:'row'}}>
                {
                  ((props.order.order_code) ? <Text style={styles.tipeListingBadge}>{(props.order.order_code).toUpperCase()}</Text> : <></>) 
                }
              </View>
              <Text style={{color: Colors.dark, fontWeight: 'bold', fontSize: 14, lineHeight: 18}}>{
                state.get().role_id == '1' ? props.order.user.name : props.order.doctor.name
              }</Text>
              <Gap height={2}/>
               
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    {
                        props.order.order_date ? <Text style={{fontSize: 12}}>{moment(props.order.order_date).format('YYYY MM DD')}</Text> : <></> 
                    }
                    {
                        props.order.status ? <View style={styles.status}>
                            <Icon name={'circle'} color={Colors.primary} size={8} solid/>
                            <Text style={{color: Colors.primary, marginLeft: 2, fontSize: 12}}>{props.order.status}</Text>
                        </View> : <></> 
                    }
                </View>
              
            </View>
            <Gap height={4}/>
            <View style={{ flexDirection: 'row', alignItems: 'center',  flexWrap: 'wrap', justifyContent: 'space-between'}}>
              <Text style={{ fontSize: 14, color: Colors.primary, fontWeight: 'bold'}} textBreakStrategy={'simple'}>{Rp(props.order.amount)}</Text>
            </View>
            <Gap height={8}/>
            {/* <View style={{flexDirection:'row'}}>
                <Text style={styles.btnTimeline} onPress={props.order.timelineOnPress}>Timeline</Text>
            </View> */}
          </View>
        </View>
        <Gap height={20}/>
      </Pressable>
    </View>
  )
}

export default OrderInlineCard

const styles = StyleSheet.create({
  badge: (type) => {
    return {
      paddingHorizontal: 12,
      paddingVertical: 4,
      fontSize: 8,
      borderRadius: 5,
      backgroundColor: Colors.primary,
      color: Colors.white,
      position: 'absolute',
      left: 5,
      top: 7
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
      marginBottom: 4
  },
  status: {
    color: Colors.success,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  colorStatus: (color) => {
    return  {
        color: color
    }
  },
  btnTimeline: {
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
    color: Colors.white,
    backgroundColor: Colors.primary,
    fontWeight: 'bold',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 12
  }

})