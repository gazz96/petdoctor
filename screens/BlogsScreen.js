import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator, useWindowDimensions  } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Gap, HeaderWithBackButton, Loading } from '../components'
import { BASE_URL, Colors } from '../constant'

import { ArticleAction } from '../actions'

import RenderHtml from 'react-native-render-html';

const BlogsScreen = ({ navigation }) => {

    const [isLoading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);

    const getArticles = async() => {
        try {
            const response = await ArticleAction.get({
                paginate: 20
            });
            console.log('getarticles',response.data);
            setArticles(response.data);
        }catch(error) {
            console.error('error', error);
        }finally{
            setLoading(false)
        }
    }

    useEffect(  () => {
        getArticles();
    }, [])


    let blogImageUrl = (image) => {
        return {
            uri: BASE_URL + '/uploads/' + image
        }
    }

    const { width } = useWindowDimensions();

  return (
    <ScrollView style={styles.container}>
        <Gap height={20}/>
        <HeaderWithBackButton title="Blogs" onPress={() => navigation.goBack()}/>
        <Gap height={40}/>

        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
            { 
                isLoading ? <Loading/> :
                articles.map((article, index) => {
                    return (
                    <View style={styles.col} key={index}>
                            <TouchableOpacity  onPress={() => {navigation.navigate('Detail Article', {
                                article: article
                            })}}>
                            <ImageBackground source={{
                                uri: article.thumbnail
                            }} resizeMode="cover" imageStyle={{borderRadius: 10}} 
                            style={{ 
                                width: '100%', 
                                height: 160,
                                marginBottom: 8
                            }}/>
                            <Text style={{ fontWeight: 'bold', color: '#000', marginBottom: 2, fontSize: 16, color: Colors.dark}}>{article.title}</Text>
                            
                            
                            <Gap height={20}/>
                        </TouchableOpacity>
                    </View>
                    )
                })
            }
        </View>
    </ScrollView>
  )
}

export default BlogsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: '#fff'
    },
    col: {
        width: '48%',
    }
})