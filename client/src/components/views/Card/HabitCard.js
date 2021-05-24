import React from 'react'
import {Card, Button} from 'react-bootstrap'

function HabitCard({ creator, subscribed, item, index, onManageClick }) {
    

    const onManage = () => {
        onManageClick(index);
    }
    
    const buttonHandler = () =>{
        if(creator){
            return (
                <Button variant="primary" onClick={onManage}>관리하기</Button>
            )
        }else if(!creator && subscribed){
            return (
                <Button variant="primary">구독 취소하기</Button>
            )
        }else{
            return(
                <Button variant="primary">구독하기</Button>
            )
        }
            

    }
    return (
        <Card style={{ width:"60vw",marginBottom:'10px'}}>
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                    {item.description}
                </Card.Text>
                {buttonHandler()}
            </Card.Body>
        </Card>
    )
}

export default HabitCard
