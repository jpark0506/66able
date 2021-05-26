
import React,{useState} from 'react'
import { Container } from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {registerUser} from '../../../_actions/user_action';
import CustomNavBar from '../NavBar/CustomNavBar';
import { Button ,Form, Col, Row,Image} from 'react-bootstrap';
import Footer from '../Footer/Footer';
const {Kakao} = window;
function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const loginWithKakao = async () => {
        Kakao.Auth.authorize({
            redirectUri:"http://localhost:3000/kakao",
            scope:'profile,account_email,talk_message',
        })
    }

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    }

    const onNameHandler = (e) => {
        setName(e.currentTarget.value);
    }

    const onConfirmPasswordHandler = (e) => {
        setConfirmPassword(e.currentTarget.value);
    }



    const onSubmitHandler = (e)=> {
        e.preventDefault();
        if(Password!==ConfirmPassword){
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }

        let body = {
            email:Email,
            password : Password,
            name : Name
        }

        dispatch(registerUser(body))
        .then(res => {
            if(res.payload.success){
                
                props.history.push("/login")
            }
            else{
                console.log(res);
                alert('Failed!')
            }
        })

    }
    return (
        <Container fluid='true' style={{height:'100vh'}}>
            <CustomNavBar/>
            <Container>
                <Row>
                    <Col>
                        <h1 style = {{marginTop:'100px'}}>
                            Register
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
                            <Form.Group size='lg' controlId="formBasicName">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" onChange={onNameHandler}/>
                            </Form.Group>
                            <Form.Group size='lg' controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={onPasswordHandler}/>
                            </Form.Group>
                            <Form.Group size='lg' controlId="formBasicPasswordCheck">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={onConfirmPasswordHandler}/>
                            </Form.Group>
                            <Button size = 'lg' variant="primary" type="submit" disabled>
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
        </Container>
        
    )
}

export default withRouter(RegisterPage)
