import React, { useEffect,useState } from 'react'
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import { Nav ,Button, Navbar} from 'react-bootstrap';
import {auth} from '../../../_actions/user_action';
const {Kakao} = window;
function RenderButton({AuthInfo,history, Auth, NickName,Provider}){
    //React Component는 항상 대문자로
    //props {history, Auth}
    const onClickHandler = () => {
        if(Provider==="kakao"){
            axios.get(`/api/kakao/logout/${AuthInfo.id}`).then(res=>{
                if(res.data.success){
                    localStorage.clear();
                    Kakao.Auth.logout(()=>{
                        console.log("Deleted Token from Kakao Server");
                    });
                    history.push('/login')
                }else{
                    alert('로그아웃 실패');
                }
            })
        }else{
            axios.get('/api/users/logout').then(res=>{
                if(res.data.success){
                    history.push('/login')
                }else{
                    alert('로그아웃 실패');
                }
            });
        }
        

    }
    if(!Auth){
        return(
        <>
            <Link to="/register">
                <Button className = "mt-1 mr-3" variant="light" style={{marginRight:'10px'}}>
                    Register
                </Button>
            </Link>
            <Link to="/login">
                <Button className = "mt-1 mr-3" variant="light" style={{marginRight:'10px'}}>
                    Login
                </Button>
            </Link>
        </>
        )
    }else{
        return(
            <>
                <Nav className="mr-auto" style={{ color:"white", fontWeight:"400"}}>
                    <Nav.Link href="/user" active="true">
                        Hello {NickName}
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Button variant="primary" onClick={onClickHandler}>
                        Logout
                    </Button>
                </Nav>
            </>
        
         )
    }   
    
}
function CustomNavBar(props) {
    //props {history}
    const dispatch = useDispatch();
    const [Auth, setAuth] = useState(false)
    const [AuthInfo, setAuthInfo] = useState({});
    const [NickName, setNickName] = useState("");
    const [Provider, setProvider] = useState("");
    //useEffect는 최대한 상위객체로 올리자
    useEffect(() => {
        dispatch(auth()).then(
            res=>{
                console.log("NAV")
                if(localStorage.getItem('isAuth')){
                    setAuth(localStorage.getItem('isAuth'))
                    setAuthInfo(JSON.parse(localStorage.getItem('profile')))
                    setNickName(JSON.parse(localStorage.getItem('profile')).properties.nickname);
                    setProvider(localStorage.getItem('provider'))
                    console.log(Provider)
                }else{
                    setAuth(res.payload.isAuth);
                    setAuthInfo(res.payload);
                    setNickName(res.payload.isAuth.name);
                }
                
            }
            
        )
    }, [])
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand style={{fontSize:'1.5em', fontWeight:"600"}} href="/">66able</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/post">Post</Nav.Link>
                <Nav.Link href="/habits">Habits</Nav.Link>
                </Nav>
                
                <Nav>
                    <RenderButton 
                    Provider={Provider}
                    AuthInfo={AuthInfo}
                    Auth={Auth} 
                    NickName = {NickName} 
                    history = {props.history}/>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}


export default CustomNavBar
