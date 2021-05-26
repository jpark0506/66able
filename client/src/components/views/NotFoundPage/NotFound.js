import React from 'react'
import CustomNavBar from '../NavBar/CustomNavBar'
import {withRouter} from 'react-router-dom'
function NotFound() {
    return (
        <div>
            <CustomNavBar></CustomNavBar>
            <div style={{width:'100vw', height:'100wh', display:'flex',alignItems:'center',justifyContent:'center'}}>
                <h1>404 Not Found</h1>
            </div>
        </div>
        
    )
}

export default withRouter(NotFound)
