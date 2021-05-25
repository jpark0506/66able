import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action';
const ACCESS_DENIED1 = "Access Denied1, No Permission";
const ACCESS_DENIED2 = "Access Denied2, No Permission";
const LOGIN_NEEDED = "Login needed"
 
export default function (SpecificComponent, option, adminRoute = null){
    //null  => 아무나 출입
    //true  => 로그인 한 유저만 출입 가능
    //false => 로그인하지 않은 유저만 출입 가능
    function AuthenticationCheck(props){
        const dispatch = useDispatch();

        const [Name, setName] = useState("")

        const [Id, setId] = useState("")

        const [KakaoId, setKakaoId] = useState("")

        const [Email, setEmail] = useState("")

        useEffect(()=> {
            {
                const body = {token:localStorage.getItem('AC_Token')}
                
                dispatch(auth(body))
                .then(res=>{
                    //console.log(res);
                    if(!res.payload.isAuth){
                        if(localStorage.getItem('isAuth')){
                            setName(JSON.parse(localStorage.getItem('profile')).properties.nickname)
                            setKakaoId(JSON.parse(localStorage.getItem('profile')).id)
                            res.payload.isAuth = true
                            res.payload.error = false
                            res.payload.kakao = true
                        }
                        else if(option){
                            alert(LOGIN_NEEDED)
                            props.history.push('./login');
                        }
                    }else{
                        if(adminRoute && !res.payload.isAdmin){
                            alert(ACCESS_DENIED1)
                            props.history.push('./');
                        }else{
                            if(option===false){
                            alert(ACCESS_DENIED2)
                                props.history.push('./');
                            }
                            
                            setId(res.payload._id);
                            setEmail(res.payload.email);
                            setName(JSON.parse(localStorage.getItem('profile')).properties.nickname)
                            setKakaoId(JSON.parse(localStorage.getItem('profile')).id)
                        }
                    }
                })
            }


        },[])
        //console.log(Email);
        //console.log(Id);
        return <SpecificComponent history = {props.history} userid = {Id} name = {Name} kakaoid = {KakaoId}/>;
    }
   return AuthenticationCheck;
}