import React,{useState, useEffect} from 'react'
import {withRouter,useParams} from 'react-router-dom'
import {Col,Button,Container,Row, Card} from 'react-bootstrap';
import HorizontalLine from '../../../utils/HorizontalLine';
import { Circle } from 'rc-progress';
function HabitManage(props) {
     //habit 탭에서 creator가 맞을때 이 컴포넌트 사용
     const habitid = useParams();
     const [percent,setPercent] = useState(0);
     const [remain, setRemain] = useState(0);
     useEffect(()=> {
        let data = DummyData.achievement;
        let array = Object.values(data[0])
        for(let i=0; i<=32; i++){
            array[0][i] = 1;
        }
        setPercent((array[0].indexOf(0)/array[0].length*100).toFixed(1));
        setRemain(array[0].length-array[0].indexOf(0));
     },[])
     const onBack = () => {
         props.history.goBack();
     }
     const DummyData = {
        "users": [],
        "name": "산책",
        "startdate": "2021-05-23",
        "visibility": "public",
        "habit": [
            {
                "signal": "퇴근한 후 게임을 하고 싶을 때",
                "wronghabit": "게임",
                "habit": "산책",
                "habittime": "18:00",
                "before": [
                    "10",
                    "5"
                ],
                "success": [],
                "habittype": "0"
            }
        ],
        "objective": "건강한 몸, 게임하는 습관 버리기",
        "tag": [
            "건강",
            "게임",
            "산책"
        ],
        "creator": "60a3c224d22fc84c580872a1",
        "description": "설명",
        "achievement":[{
                "60a3c224d22fc84c580872a1": Array.from({length:66}, ()=>0)
        }]
        }
    
    const renderTags = () => {
        const list = DummyData.tag.map((item)=>{
            return (
                <Button className="mr-2">
                    {`#${item}`}
                </Button>
            )
        })
        return list;
    }

    const renderCards = () => {
        const list = DummyData.habit.map((item, index)=>{
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
                        <Col sm={8}><h4>{DummyData.objective}</h4></Col>
                    </Row>
                    <HorizontalLine ></HorizontalLine>
                    <Row>
                        <Col sm={4}>
                            <h4>설명</h4>
                            </Col>
                        <Col sm={8}><h4>{DummyData.description}</h4></Col>
                    </Row>
                    <HorizontalLine ></HorizontalLine>
                    <Row>
                        <Col sm={4}>
                            <h4>시작일</h4>
                        </Col>
                        <Col sm={8}>
                            <h4>{DummyData.startdate}</h4>
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
            <div style = {{width:'50vw', padding:'20px'}}>
    
                <div className ="m-1">
                    <h1>
                         진행도
                    </h1>

                </div>
                <HorizontalLine ></HorizontalLine>
                <div>
                    <h1>
                        {`${percent}% 진행`}
                    </h1>
                    <h1>
                        {`${remain}일 남음`}
                    </h1>
                </div>
            </div>  
        </div>
        
        </div>
        
    )
}

export default withRouter(HabitManage)
