import React from 'react'
import {Card, Button} from 'react-bootstrap'

function HabitCard({ creator, subscribed, item, index, onManageClick, onViewClick, onSubscribeClick, onUnSubscribeClick }) {
    

    const onManage = () => {
        onManageClick(index);
    }
    const onUnsub = ()=>{
        onUnSubscribeClick(index);
    }
    const onSub = () => {
        onSubscribeClick(index)
    }
    const onView = () => {
        onViewClick(index)
    }
    
    const buttonHandler = () =>{
        if(creator){
            return (
                <Button variant="primary" onClick={onManage}>관리하기</Button>
            )
        }else if(!creator && subscribed){
            return (
                <div>
                    <Button variant="primary" className = "m-1" onClick = {onUnsub}>구독 취소하기</Button>
                    <Button variant="primary" className = "m-1" onClick = {onManage}>관리하기</Button>
                </div>
            )
        }else{
            return(
                <div>
                    <Button variant="primary" className = "m-1" onClick={onSub}>구독하기</Button>
                    <Button variant="primary" className = "m-1" onClick = {onView}>보기</Button>
                </div>
                
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
