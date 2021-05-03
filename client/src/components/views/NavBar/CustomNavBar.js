import React, { useEffect,useState } from 'react'
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import { Nav ,Button, Navbar} from 'react-bootstrap';
import {auth} from '../../../_actions/user_action';
function RenderButton({history, Auth}){
    //React Component는 항상 대문자로
    //props {history, Auth}
    const onClickHandler = () => {
        axios.get('/api/users/logout').then(res=>{
            if(res.data.success){
                history.push('/login')
            }else{
                alert('로그아웃 실패');
            }
        });

    }
    if(!Auth){
        return(
        <>
            <Link to="/register">
                <Button variant="light" style={{marginRight:'10px'}}>
                    Register
                </Button>
            </Link>
            <Link to="/login">
                <Button variant="light" style={{marginRight:'10px'}}>
                    Login
                </Button>
            </Link>
        </>
        )
    }else{
        return(
        <Button variant="primary" onClick={onClickHandler}>
            Logout
         </Button>
         )
    }   
    
}
function CustomNavBar(props) {
    //props {history}
    const dispatch = useDispatch();
    const [Auth, setAuth] = useState(false)
    //useEffect는 최대한 상위객체로 올리자
    useEffect(() => {
        dispatch(auth()).then(
            res=>{
                setAuth(res.payload.isAuth);
            }
            
        )
    }, [])
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">Postable</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                </Nav>
                <Nav>
                    
                    <RenderButton Auth={Auth} history = {props.history}/>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}


export default CustomNavBar
