import { API_URL } from "../constant"



const ArticleAction = {
    get: async(params={}) => {
        let paramsFormat = new URLSearchParams(params);
        let url = API_URL + '/articles';
        if(paramsFormat) {
            url += '?' + paramsFormat.toString();
        }
        const response = await fetch(url);
        const json = await response.json();
        return json;
    },
    find: async(id) => {
        const response = await fetch(API_URL + '/article?id=' + id);
        const json = await response.json();
        return json;
    }
}

export default ArticleAction;