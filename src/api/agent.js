import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://localhost:44321/api/';
axios.defaults.withCredentials = true;

const responseBody = (response) => response.data;

axios.interceptors.response.use(res=>{
    return res;
},(error)=>{
    const {data, status} = error.response;
    switch (status) {
        case 400:
        case 401:
        case 500:
                toast.error(data.title);
            break;
    
        default:
            break;
    }
    return Promise.reject(error);
})

const requests = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody),
    put: (url, body) => axios.put(url, body).then(responseBody),
    delete: (url) => axios.delete(url).then(responseBody),
}

const Basket ={
    get:()=>requests.get('Basket'),
    addItem:(productId, quantity=1)=> requests.post(`Basket?productId=${productId}&quantity=${quantity}`,{}),
    removeItem:(productId, quantity=1)=> requests.delete(`Basket?productId=${productId}&quantity=${quantity}`),

}


const Catalog = {
    list: () => requests.get('product'),
    details: (id) => requests.get(`product/${id}`),

}

const agent ={
    Catalog,Basket
}

export default agent ;