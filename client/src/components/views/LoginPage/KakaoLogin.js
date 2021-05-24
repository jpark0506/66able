import React, { useEffect } from 'react'
import axios from 'axios';

//const {Kakao} = window;
function KakaoLogin(props) {
    useEffect(async ()=>{
        const getAccessToken = async authorizationCode => {
            let tokenData = await axios
              .post('/api/kakao', {
                authorizationCode
              })
              .then(res => {
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
