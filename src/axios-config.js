import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-51744.firebaseio.com/'
})

export default instance;