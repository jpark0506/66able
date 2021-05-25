import React, { useEffect, useState } from 'react'
import {withRouter,useParams} from 'react-router-dom'
import {Button,Card,Container,Row,Col} from 'react-bootstrap';
import HorizontalLine from '../../../utils/HorizontalLine';
import axios from 'axios';
function HabitView({history}) {
    //habit 탭에서 creator가 아닐때 이 컴포넌트 사용
    const habitid = useParams();
    const [Item,setItem] = useState({});

    useEffect(()=>{
        const API = axios.create({
            baseURL: `http://localhost:3000/`,
          })
        API.get( `api/habit/${habitid.habitid}`).then(res=>
            setItem(res.data.data))
    },[])

    const onBack = () => {
        history.goBack();
    }

    const renderTags = () => {
        if(Item.tag!==undefined){
            const list = Item.tag.map((item)=>{
                return (
                    <Button className="mr-2">
                        {`#${item}`}
                    </Button>
                )
            })
            return list;
        }else{
            return <div></div>
        }
        
    }

    const renderCards = () => {
        if(Item.tag!==undefined){
            const list = Item.habit.map((item, index)=>{
                return (
                    <div>
                        <Card>
                            <Card style={{ width: '100%', margin:'10px'}}>
                            <Card.Body>
                                <Card.Title>{item.habit}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{item.habit}</Card.Subtitle>
                                <Card.Text>
                                        {item.wronghabit}
                                </Card.Text>
                                <Card.Text>
                                        {item.signal}
                                </Card.Text>
                                <Card.Text>
                                        {item.habittime}
                                </Card.Text>
                                <Card.Text>
                                    {item.before.map(value => {
                                        return `${value}분 전 알림`
                                    })}
                                </Card.Text>
                            </Card.Body>
                            </Card>
                        </Card>
                    </div>
                )
            })
            return list;
        }else{
            return <div></div>
        }
    }
    return (
        <div>
        <div className='m-3'>
        <Button variant="primary" onClick={onBack}>
                Back
        </Button>
        </div>
        <div style={{ width:'100vw', display:'flex', flexDirection:'row', height:'100vh'}}>
        <div style = {{width:'50vw',padding:'20px'}}>      
            
            <div className ="m-1">
                <h1>
                    습관 이름
                </h1>
            </div>
            <HorizontalLine ></HorizontalLine>
            <Container fluid="md">
                <Row>
                    <Col sm={4}>
                    <h4>목표</h4>
                    </Col>
                    <Col sm={8}><h4>{Item.objective}</h4></Col>
                </Row>
                <HorizontalLine ></HorizontalLine>
                <Row>
                    <Col sm={4}>
                        <h4>설명</h4>
                        </Col>
                    <Col sm={8}><h4>{Item.description}</h4></Col>
                </Row>
                <HorizontalLine ></HorizontalLine>
                <Row>
                    <Col sm={4}>
                        <h4>시작일</h4>
                    </Col>
                    <Col sm={8}>
                        <h4>{Item.startdate}</h4>
                    </Col>
                </Row>
                <HorizontalLine ></HorizontalLine>
                <Row>
                    <Col sm={4}>
                        <h4>세부사항</h4>
                    </Col>
                    <Col sm={8}>
                        <h4>{renderCards()}</h4>
                    </Col>
                </Row>
                <HorizontalLine ></HorizontalLine>
                <Row>
                    <Col sm={4}>
                        <h4>태그</h4>
                    </Col>
                    <Col sm={8}>
                        <h4>{renderTags()}</h4>
                    </Col>
                </Row>
            </Container>
            <HorizontalLine ></HorizontalLine>
            
        </div>
        
    </div>
    
    </div>
    )
}

export default withRouter(HabitView)
