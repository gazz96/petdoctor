import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { Gap, HeaderWithBackButton } from '../components'
import ChatAction from '../actions/ChatAction'
import { UserContext } from '../context'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
const ChatScreen = ({route, navigation}) => {
    const state = UserContext();
    const {user, order} = route.params;
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [lastestMessageId, setlastestMessageId] = useState(0);
    const [tempMessages, setTempMessages] = useState([]);
    const getMessages = async() => {
        setLoading(true)
        try {
            const response = await ChatAction.get(order.id);
            console.log('response', response);
            let temps = [];
            response.map((chat, index) => {
                let temp = {
                    _id: chat.id,
                    text: chat.message,
                    createdAt: chat.created_at,
                    user: {
                      _id: chat.user.id,
                      name: chat.user.name,
                      avatar: chat.user.photo_profile,
                    },
                };
                temps.push(temp);
            })
            
            setTempMessages(temps); 
            // if(tempMessages.length > 0)
            // {
            //     setlastestMessageId(tempMessages[tempMessages.length-1]._id);
            // }
        }catch(error) {
            console.log('erros', error.response);
        }finally{
            setLoading(false)
        }
    }

    const sendMessage = async(message) => {
        console.log('message', message);
        try{
            const response = await ChatAction.send({
                order_id: order.id,
                user_id: user.id,
                message: message,
                send_date: new Date()
            })

            console.log('send message', response)
        }catch(error) {
            console.log('message', message)
            console.log('error', error.response)
        }finally{

        }
    }

    const getMessageByInterval = async() => {
        try {
            console.log('latstmessageid', lastestMessageId);
            const response = await ChatAction.get(order.id);
            console.log('response', response);
            let temps = [];
            response.map((chat, index) => {
                let temp = {
                    _id: chat.id,
                    text: chat.message,
                    createdAt: chat.created_at,
                    user: {
                      _id: chat.user.id,
                      name: chat.user.name,
                      avatar: chat.user.photo_profile,
                    },
                };
                temps.push(temp);
            })
            
            setTempMessages(temps);
            
            // if(tempMessages.length > 0)
            // {
            //     setlastestMessageId(tempMessages[tempMessages.length-1].id);
            // }

        }catch(error) {
            console.log('erros', error.response);
        }finally{
        }
    }

    useEffect(() => {
      getMessages();
      const intervalid = setInterval(() => {
        getMessageByInterval()
      }, 3000);

      return () => clearInterval(intervalid);
    }, [])
  
    const onSend = useCallback((messages = []) => {
      setTempMessages(previousMessages => 
        GiftedChat.append(previousMessages, messages))
        sendMessage(messages[0].text);
    }, [])
  
    return (
        <View style={{flex:1}}>
            <View style={{paddingHorizontal: 20}}>
            <Gap height={25}/>
            <HeaderWithBackButton title={user.name} onPress={() => navigation.goBack()}/>
            <Gap height={20}/>
            </View>
            {
                (isLoading) ? <ActivityIndicator/> : 
                <GiftedChat
                    onInputTextChanged={(text) => {
                        setMessage(text) 
                    }}
                    messages={tempMessages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: user.id,
                    }}
                />
            }
            
        </View>
      
    )
}

export default ChatScreen

const styles = StyleSheet.create({})