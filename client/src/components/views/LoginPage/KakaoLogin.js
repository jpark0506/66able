import React, { useEffect } from 'react'
import axios from 'axios';
import firebase from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

//const {Kakao} = window;
function KakaoLogin(props) {
    
    const getFCMToken = () => {
        const messaging = firebase.messaging();

        messaging.requestPermission()
        .then(function() {
            console.log('허가!');
            return messaging.getToken(); //토큰을 받는 함수를 추가!
        })
        .then(function(token) {
            axios.post(`/api/fcm/${token}`).then(res=>console.log(res));            console.log(token); //토큰을 출력!
        })
        .catch(function(err) {
            console.log('fcm에러 : ', err);
        })
    }

    useEffect(async ()=>{
        
        const getAccessToken = async authorizationCode => {
            let tokenData = await axios
              .post('/api/kakao', {
                authorizationCode
              })
              .then(res => {
                getFCMToken();
                console.log('------client------')
                console.log(res.data);
                localStorage.setItem('provider', res.data.provider);
                console.log(res.data.provider)
                localStorage.setItem('isAuth', res.data.isAuth);
                localStorage.setItem('AC_Token', res.data.accesstoken)
                localStorage.setItem('profile', JSON.stringify(res.data.profile));
                localStorage.getItem('AC_Token');
                console.log("LoginSuccess");
                props.history.push(`/`);
              })
        }
        let authorizationcode = new URL(window.location.href).searchParams.get('code')
        if(authorizationcode){
            try{
                await getAccessToken(authorizationcode)
            }catch(err){
                console.error(err);
            }
            
        }
    },[])
    return (
        <div>
            
        </div>
    )
}

export default KakaoLogin
