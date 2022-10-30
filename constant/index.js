import TipeBangunan from "./TipeBangunan";
import Colors from "./Colors";
import currency from "currency.js";
import JenisFasilitas from "./JenisFasilitas";
import axios from "axios";

import { useState } from "react"


const logoSrc = {
    uri: 'https://sava.co.id/uploads/settings/logo.png'
}





//const BASE_URL = 'http://192.168.1.7/petcare/public';
//const BASE_URL = 'http://192.168.100.6/petcare/public';
//const BASE_URL = 'http://172.20.10.6/petcare/public';
const BASE_URL = 'https://bagistudio.com/petcare/public';
const API_URL = BASE_URL + '/api';
const UPLOAD_URL =  BASE_URL + '/uploads';

const Rp = (nominal) => {
    return currency(nominal, {
        separator: ',',
        precision: 0,
        symbol: 'Rp'
    }).format();
}

const axiosRequest = axios.create({
    baseURL: API_URL
})

const SAVACONTACT = {
    wa: '6281804600069'
}

const useForm  = (initialValues) => {
    const [values, setValues] = useState(initialValues)
    return [
        values, 
        (type, params) => {
            return setValues({...values, [type]: params})
        }
    ]
}

const isAdmin = (role) => {
    return true;
}

const isSubscriber = (role) => {
    return true;
}




export { TipeBangunan, logoSrc, Colors, BASE_URL, API_URL, UPLOAD_URL, Rp, axiosRequest, SAVACONTACT, useForm, isAdmin, isSubscriber, JenisFasilitas };