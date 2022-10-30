import { API_URL, axiosRequest } from "../constant"
import Toast from 'react-native-toast-message';
import axios from "axios";

const UserAction = {
    get: async(params={}) => 
    {
        let paramsFormat = new URLSearchParams(params);
        let url = API_URL + '/properties';
        if(paramsFormat) {
            url += '?' + paramsFormat.toString();
        }
        const response = await fetch(url);
        const json = await response.json();
        return json;
    },
    find: async(id) => 
    {
        const response = await fetch(API_URL + '/property?id=' + id);
        const json = await response.json();
        return json;
    },
    me: async(id) => {
        try 
        {
            const response = await axiosRequest.get('/user/me',{
                params: {
                    user_id: id
                }
            })
            return response.data;
        }
        catch(error)
        {
            console.log(error.response);
            Toast.show({
                type: 'error',
                text1: 'Peringatan',
                text2: 'Terjadi Kesalahan'
            });
            return error;
        }
        
    },
    update: async(data) => {
        const response = await axiosRequest.post('/user',data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data;
    },
    getProperty: async(user_id) => 
    {
        try{
            const response = await axiosRequest.get('/user/property',{
                params: {
                    user_id: user_id
                }
            })
            return (response).data;
        }
        catch(error)
        {
            console.log(error);
            return false;
        }
    },
    getIncome: async(user_id) => 
    {
        try{
            const response = await axiosRequest.get('/user/income',{
                params: {
                    user_id: user_id
                }
            })
            return (response).data;
        }
        catch(error)
        {
            return false;
        }
    },
    getTotalIncome: async(user_id) => {
        try{
            const response = await axiosRequest.get('/user/total-income',{
                params: {
                    user_id: user_id
                }
            })
            return (response).data;
        }
        catch(error)
        {
            console.log(error);
            return false;
        }
    },
    getOrders: async(options={}) => {
        try{
            const response = await axiosRequest.get('/user/orders',{
                params: options
            })
            console.log(response.data);
            return (response).data;
        }
        catch(error) 
        {
            console.log(error);
            return false;
        }
    },
    changePassword: async(data) => {
        const response = await axiosRequest.post('/user/password',data);
        return response.data;
    },
    banks: async() => {
        const response = await axiosRequest.get('/banks');
        return response.data;
    },
    me: async(id) => {
        const response = await axiosRequest.get('/me', {
            params: {
                id: id
            }
        })
        return response.data;
    }
}

export default UserAction;