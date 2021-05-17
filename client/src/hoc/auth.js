import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action';
const ACCESS_DENIED = "Access Denied, No Permission";
const LOGIN_NEEDED = "Login needed"
export default function (SpecificComponent, option, adminRoute = null){
    //null  => 아무나 출입
    //true  => 로그인 한 유저만 출입 가능
    //false => 로그인하지 않은 유저만 출입 가능
    function AuthenticationCheck(props){
        const dispatch = useDispatch();

        const [Name, setName] = useState("")

        const [Id, setId] = useState("")
        
        useEffect(()=> {
            dispatch(auth())
            .then(res=>{
                console.log(res);
                if(!res.payload.isAuth){
                        if(option){
                            alert(LOGIN_NEEDED)
                            props.history.push('./login');
                        }
                }else{
                    if(adminRoute && !res.payload.isAdmin){
                        alert(ACCESS_DENIED)
                        props.history.push('./');
                    }else{
                        if(option===false){
                        alert(ACCESS_DENIED)
                            props.history.push('./');
                        }
                        setName(res.payload.name);
                        setId(res.payload._id);
                    }
                }
            })
            
        },[])
        return <SpecificComponent id = {Id} name = {Name}/>;
    }
   return AuthenticationCheck;
}