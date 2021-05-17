import {CREATE_POST} from '../_actions/types';

export default function (state = {}, action){
   switch (action.type) {
       case CREATE_POST:
           return { ...state, postSuccess: action.payload}
       default:
           return state;
   }
}