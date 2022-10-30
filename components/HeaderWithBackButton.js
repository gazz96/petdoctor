import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Colors } from '../constant'

// library
import Icon from 'react-native-vector-icons/FontAwesome5';

const HeaderWithBackButton = (props) => {
  return (
    <View style={styles.header}>
        <Pressable  style={styles.backButton} onPress={props.onPress}>
          <Text><Icon name={'arrow-left'} size={12} color="#222" solid/></Text>
        </Pressable>
        <Text style={{fontSize: 16, fontWeight: 'bold', color:'#222'}}>{props.title}</Text>  
    </View>
  )
}

export default HeaderWithBackButton

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
      },
    backButton: { 
        width: 40, 
        height: 40, 
        borderWidth: 1, 
        borderRadius: 10,  
        borderColor: Colors.muted, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'absolute', 
        left: 0 
    },
})