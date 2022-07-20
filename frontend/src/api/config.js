import axios from "axios";

//const baseUrl = 'http://localhost:3001/';
const baseUrl = 'https://electricityapp.herokuapp.com/';

const api = axios.create({
    baseURL: baseUrl,
    headers: {
        'Accept': 'application/json',
        'Content-Type' : 'application/json'
    }
})
api.interceptors.response.use(response => response, error => handleFailedApi(error))

const handleFailedApi = (error) => {
    let res = error.response;
    if(res.status == 401)
    {
        console.log(res, res.status)
    }
    return res;
}
export default api;
