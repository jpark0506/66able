import React, {useEffect} from 'react'
import {withRouter} from 'react-router-dom';
import Footer from '../Footer/Footer';
import CustomNavBar from '../NavBar/CustomNavBar';




function LandingPage(props) {
    //CORS Policy 같은 기기 다른 포트 X
    return (
        <div style={{height:'100vh',width:'100vw',display: 'flex',flexDirection: 'column'}}>
            
            <CustomNavBar history = {props.history} userid = {props.userid}></CustomNavBar>
            <div style ={{height:'80%',width:'100%',display:'flex', flexDirection:'column', color:"#FFFFFF"}}>
                <div style ={{height:'30%',width:'100%', display:'flex',justifyContent:'center',alignItems:'center', backgroundColor:"#343A40", color:"#FFFFFF"}}>
                    <h1>일상이 무기력한데 뭐라도 하고 싶으신가요?</h1>
                </div>
                <div style ={{height:'30%',width:'100%', display:'flex',justifyContent:'center',alignItems:'center', backgroundColor:"#78909c", color:"#FFFFFF"}}>
                    <h1>매일 발전하는 자신을 느끼고 싶으신가요?</h1>
                </div>
                <div style ={{height:'30%',width:'100%', display:'flex',justifyContent:'center',alignItems:'center', backgroundColor:"#a7c0cd", color:"#FFFFFF"}}>
                    <h1>66able, 당신의 삶의 질을 여기서 바꾸어보세요</h1>
                </div>
            </div>
            
            <Footer style={{height:'20%'}}></Footer>
        </div>
    )
}

export default withRouter(LandingPage)
