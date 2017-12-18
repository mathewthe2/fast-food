import axios from 'axios';
import {DEFAULT_API_SERVER_URL} from  './Config';

let client = axios.create({
        baseURL: DEFAULT_API_SERVER_URL,
        timeout: 1000,
        // headers: {'X-Custom-Header': 'foobar'}        
});

export default client;