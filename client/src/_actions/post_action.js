import axios from 'axios';
import {CREATE_POST} from './types';
export function createPost(data){

    const request = axios.post('/api/post/create',data)
    .then(
        res=> res.data
    )
    return {
        type: CREATE_POST,
        payload: request
    }
}