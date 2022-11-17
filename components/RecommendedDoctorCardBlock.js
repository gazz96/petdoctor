import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState} from 'react'
import { DoctorAction } from '../actions';
import DoctorCardBlock from './DoctorCardBlock';
import { UPLOAD_URL, Rp } from '../constant';


const RecommendedDoctorCardBlock = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [doctors, setDoctors] = useState([]);

    const getDoctors = async() => {
        try {
            const response = await DoctorAction.get({
                paginate: 2,
                kategori: 2
            });
            setDoctors(response);
        }catch(error) {
            console.error(error);
        }finally{
            setLoading(false)
        }
    }

    useEffect(  () => {
        getDoctors();
    }, [])

    const propertyThumbnail = (image) => {
        return {
            uri: UPLOAD_URL + '/' + image
        }
    }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
        {
            isLoading ? <ActivityIndicator/> : doctors.map((doctor, index) => {
                return (
                    <View style={{width: '50%', paddingHorizontal: 3}} key={index}>
                        <DoctorCardBlock 
                            doctor={doctor}
                            onPress={() => props.navigation.navigate("Detail Doctor", {
                                doctor: doctor
                            })}
                        />
                   </View>)
            })
        }
        </View>
            
    </View>
  )
}

export default RecommendedDoctorCardBlock

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#000',
        fontSize: 16
    }
})