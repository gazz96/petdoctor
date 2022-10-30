import { axiosRequest } from "../constant"


const SkillAction = {
    get: async(params={}) => {
        
        const response = await axiosRequest.get('/skills', {
            params: params
        })
        return response.data;
    },


}

export default SkillAction;