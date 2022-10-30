import { axiosRequest } from "../constant"
import Toast from 'react-native-toast-message';

const ChatAction = {
    get: async(order_id, chat_id = '') => {
        const response = await axiosRequest.get('/chats',{
            params: {
                order_id: order_id,
                chat_id: chat_id
            }
        })
        return response.data;
    },
    send: async(data) => {
        const response = await axiosRequest.post('/chats', data);
        return response.data;
    },
    loadNewMessage: async() => {

    }

}

export default ChatAction;