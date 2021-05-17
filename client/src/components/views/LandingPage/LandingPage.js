import React, {useEffect} from 'react'
import {withRouter} from 'react-router-dom';
import CustomNavBar from '../NavBar/CustomNavBar';



function LandingPage(props) {
    //CORS Policy 같은 기기 다른 포트 X
    return (
        <div>
            
            <CustomNavBar history = {props.history}></CustomNavBar>
            <h1>LandingPage</h1>
        </div>
    )
}

export default withRouter(LandingPage)
