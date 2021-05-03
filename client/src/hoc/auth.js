import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action';
export default function (SpecificComponent, option, adminRoute = null){
    //null  => 아무나 출입
    //true  => 로그인 한 유저만 출입 가능
    //false => 로그인하지 않은 유저만 출입 가능
    function AuthenticationCheck(props){
        const dispatch = useDispatch();
        useEffect(()=> {
            dispatch(auth())
            .then(res=>{
                console.log(res);
                if(!res.payload.isAuth){
                        if(option){
                            props.history.push('./login');
                        }
                }else{
                    if(adminRoute && !res.payload.isAdmin){
                        props.history.push('./');
                    }else{
                        if(option===false){
                            props.history.push('./');
                        }
                    }
                }
            })
            
        },[])
        return <SpecificComponent/>;
    }
   return AuthenticationCheck;
}