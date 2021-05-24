import React from 'react'
import {Card, Button} from 'react-bootstrap'
function UserCard({item, index, onDeleteHandler, onViewHandler}) {

    const onDelete = () =>{
        onDeleteHandler(index);
    }
    const onView = () => {
        onViewHandler(index);
    }
    return (
        <div>
            <Card style={{ width:"60vw",marginBottom:'10px'}}>
                <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                        {item.description}
                    </Card.Text>
                    <Button className='mr-1' onClick={onView}>
                        관리하기
                    </Button>
                    <Button className='mr-1'>
                        수정
                    </Button>
                    <Button onClick={onDelete}>
                        삭제
                    </Button>
                </Card.Body>
            </Card> 
        </div>
    )
}

export default UserCard
