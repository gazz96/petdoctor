import { API_URL, axiosRequest } from "../constant"


const DoctorAction = {
    get: async(params={}) => {
        const response = await axiosRequest.get('/doctors',{
            params: params
        })
        return (response).data;
    },
    find: async(id) => 
    {
        const response = await fetch(API_URL + '/property?id=' + id);
        const json = await response.json();
        return json;
    },
    getGallery: async(media_ids) => 
    {
        try{
            const response = await axiosRequest.get('/property-gallery',{
                params: {
                    media_ids: media_ids
                }
            })
            return (response).data;
        }
        catch(error)
        {
            console.log(err);
        }
    },
    getCities: async(nama = '') => {
        const response = await axiosRequest.get('/kota', {
            params: {
                nama: nama
            }
        })
        return response.data;
    },
    create: async(data) => {
        const response = await axiosRequest.post('create-property', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        });    
        return response.data;
    },
    update: async(data) => {
        const response = await axiosRequest.post('update-property', data);
        return response.data;
    },
    uploadThumbnail: async(data) => {
        const response = await axiosRequest.post('upload-thumbnail', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },
    uploadGallery: async(data) => {
        const response = await axiosRequest.post('upload-gallery', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },
    relatedProperties: async(data = {}) => 
    {
        const response = await axiosRequest.get('/related-properties', {
            params: data
        })
        return response.data;
    },
    updateActivity: async(id, status) => {
        const response = await axiosRequest.post('/update-activity', {
            id: id,
            status: status
        })

        return response.data;
    }

}

export default DoctorAction;