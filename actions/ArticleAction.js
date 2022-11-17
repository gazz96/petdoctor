import { API_URL, axiosRequest } from "../constant"

const ArticleAction = {
    get: async(params={}) => {
        const response = await axiosRequest.get('/articles',{
            params: params
        })
        return response.data;
    },
    find: async(id) => {
        const response = await fetch(API_URL + '/article?id=' + id);
        const json = await response.json();
        return json;
    }
}

export default ArticleAction;