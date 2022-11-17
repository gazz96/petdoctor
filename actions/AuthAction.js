import { axiosRequest } from "../constant"
import Toast from 'react-native-toast-message';

const AuthAction = {
    attempt: async(email, password) => {
        const response = await axiosRequest.post('/login',{
            email: email,
            password: password
        })
        return response.data;
    },
    register: async(data={}) => {
        const response = await axiosRequest.post('/register',data)
        return response.data;
       
    },
    validate: async(token) => {
        return true
    },
}

export default AuthAction;