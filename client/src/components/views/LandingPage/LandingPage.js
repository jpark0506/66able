import React, {useEffect} from 'react'
import {withRouter} from 'react-router-dom';
import CustomNavBar from '../NavBar/CustomNavBar';




function LandingPage(props) {
    //CORS Policy 같은 기기 다른 포트 X
    return (
        <div style={{height:'100vh'}}>
            
            <CustomNavBar history = {props.history} userid = {props.userid}></CustomNavBar>
            <h1 style ={{height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                LandingPage
            </h1>
        </div>
    )
}

export default withRouter(LandingPage)
