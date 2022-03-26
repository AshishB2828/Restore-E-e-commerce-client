import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://localhost:44321/api/';
axios.defaults.withCredentials = true;

const responseBody = (response) => response.data;

axios.interceptors.request.use(config =>{

    const token = JSON.parse(localStorage.getItem('user'))?.token;
    
    config.headers.Authorization = `Bearer ${token}`;

    return config;
})

axios.interceptors.response.use(res=>{

    const pagination = res.headers['pagination'];

    if(pagination){
        res.data = {
            items: res.data, metaData: JSON.parse(pagination)
        };
        return res;
    }
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
    get: (url, params) => axios.get(url, {params}).then(responseBody),
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
    list: (params) => requests.get('product', params),
    details: (id) => requests.get(`product/${id}`),
    fetchFilters: ()=> requests.get("product/filters")

}


const Account = {
    login: (values) => requests.post('account/login', values),
    register: (values) => requests.post('account/register', values),
    currentUser: () => requests.get('account/currentUser'),
    fetchAddress: () => requests.get('account/savedAddress')
}

const Order = {
    list: () => requests.get('order'),
    fetch:(id) => requests.get(`order/${id}`),
    create:(values) => requests.post('order', values),

}

const Payments = {
    createPaymentIntent: () => requests.post("payment", {}),

}

const agent ={
    Catalog,Basket, Account, Order, Payments
}

export default agent ;