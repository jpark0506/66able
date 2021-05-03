
import React,{useState} from 'react'
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {registerUser} from '../../../_actions/user_action';
import CustomNavBar from '../NavBar/CustomNavBar';
import { Button} from 'react-bootstrap';
function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")
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
                alert('Failed!')
            }
        })

    }
    return (
        <Container fluid='true' style={{height:'100vh'}}>
            <CustomNavBar/>
            <Container fluid='true'>
            
            
            <div style = {{display:'flex', justifyContent:'center', alignItems:'center' }}>
                
                <form style={{display:'flex', flexDirection:'column'}}
                    onSubmit={onSubmitHandler}
                >
                    <label>Email</label>
                    <input type="email" value={Email} onChange={onEmailHandler} ></input>
                    <label>Name</label>
                    <input type="text" value={Name} onChange={onNameHandler} ></input>
                    <label>Password</label>
                    <input type="password" value={Password} onChange={onPasswordHandler} ></input>
                    <label>Confirm Password</label>
                    <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} ></input>
                    <br/>
                    <Button type = "submit">
                        회원 가입
                    </Button>
                </form>
            </div>
        </Container>
        </Container>
        
    )
}

export default RegisterPage
