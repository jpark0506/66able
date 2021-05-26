import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom';
import CustomNavBar from '../NavBar/CustomNavBar';
import { Container,Row,Col,Form,FormControl,Button,Image } from 'react-bootstrap';
import {center,backgroundcenter,inputStyle, buttonStyle, formStyle} from '../../../style/style'
import Footer from '../Footer/Footer';
const {Kakao} = window;
function LoginPage(props) {

    
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    }

    const onSubmitHandler = (e)=> {
        e.preventDefault();

        let body = {
            email:Email,
            password : Password
        }

        dispatch(loginUser(body))
        .then(res => {
            if(res.payload.loginSuccess){
                props.history.push('/');
            }else{
                alert("Error")
            }
        })
    }
    const loginWithKakao = async () => {
        Kakao.Auth.authorize({
            redirectUri:"http://localhost:3000/kakao",
            scope:'profile,account_email,talk_message',
        })
    }

    return (
        //object로 바꾸자 
        <Container fluid='true' style={backgroundcenter}>
            <CustomNavBar/>
            <Container>
                <Row>
                    <Col>
                        <h1 style = {{marginTop:'100px'}}>
                            Login
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={onSubmitHandler} >
                            <Form.Group size='lg' controlId="formBasicEmail" >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control autoFocus type="email" placeholder="Enter email" onChange={onEmailHandler}/>
                            </Form.Group>

                            <Form.Group size='lg' controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={onPasswordHandler}/>
                            </Form.Group>
                            <Button size = 'lg' variant="primary" type="submit" >
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col className="mt-3">
                        <Image  src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
                        style={{width:'222px'}}
                        onClick={loginWithKakao}
                        />
                    </Col>
                </Row>
                
            </Container>
            <Footer></Footer>
        </Container>

            
    )
}

export default withRouter(LoginPage);
