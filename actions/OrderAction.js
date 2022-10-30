import { axiosRequest } from "../constant";

const OrderAction = {
    get: async(options={}) => {
        try{
            const response = await axiosRequest.get('orders', {
                params: options
            })
            console.log(response.data);
            return response.data;
        }
        catch(error)
        {
            console.log(error);
            return false;
        }
    },
    getTimeline: async(order_id) => {
        try {
            const response = await axiosRequest.get('user/order/timelines', {
                params: {
                    order_id: order_id
                }
            })
            return response.data;
        }
        catch(error)
        {
            console.log(error);
            return false;
        }
    },
    create: async(data) => {
        const response = await axiosRequest.post('/orders', data);
        return response.data;
    }
}

export default OrderAction;