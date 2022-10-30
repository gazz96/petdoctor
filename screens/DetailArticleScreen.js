import { StyleSheet, Text, View, ScrollView, ImageBackground, useWindowDimensions } from 'react-native'
import React, { useEffect, useState  } from 'react'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { BASE_URL, Colors } from '../constant'
import { ArticleAction } from '../actions'
import Gap from '../components/Gap'
//import HTMLView from 'react-native-htmlview'

// Use prebuilt version of RNVI in dist folder
import Icon from 'react-native-vector-icons/FontAwesome5';
import RenderHtml from 'react-native-render-html';

const DetailArticleScreen = ({route, navigation}) => {
    const { article } = route.params;
    let getImage = (image) => {
        return {
            uri: BASE_URL + '/uploads/' + image
        }
    }

    const { width } = useWindowDimensions();
    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'red'}} contentContainerStyle={{flexGrow: 1}}>
            <ImageBackground source={{
                uri: article.thumbnail
            }} imageStyle={{borderBottomLeftRadius: 15, borderBottomRightRadius: 15}} style={styles.hero}>
                <Pressable style={{ paddingHorizontal:  20, paddingVertical: 20}} onPress={() => navigation.goBack()}>
                    <Text style={{ width: 40, height: 40, backgroundColor: '#fff', borderRadius: 40, justifyContent: 'center', textAlign: 'center', lineHeight: 40 }}>
                        <Icon name={'arrow-left'} color={Colors.dark} size={14} solid/>
                    </Text>
                </Pressable>
            </ImageBackground>
            <View style={styles.container}>
                <Gap height={25}/>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 14, color: '#828282'}}>{article.post_date}</Text>
                </View>
                <Gap height={8}/>
                <Text style={styles.title}>{article.title}</Text>
                <Gap height={20}/>
            </View>
            <View style={styles.contentContainer}>
                {/* <HTMLView value={ article.post_content}/> */}
                <RenderHtml
                    contentWidth={width}
                    source={{
                        html: article.content
                    }}
                    enableExperimentalMarginCollapsing={true}
                    renderersProps={{
                        img: {
                            enableExperimentalPercentWidth: true
                        }
                    }}/>
        
            </View>
            
        </ScrollView>
    )
}

export default DetailArticleScreen

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
        paddingHorizontal: 28,
        width: '100%',
    },
    contentContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        width: '100%',
        flex: 1,
        flexGrow: 1,
    }
})