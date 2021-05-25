import React,{useState,useEffect} from 'react'
import {Card, Button} from 'react-bootstrap';
import CreateHabitModal from './CreateHabitModal';
import {Map,get,update,List,push} from 'immutable';
function HabitList({list, handleHabitDelete}) {
    const [show, setShow] = useState(false);
    const [idx, setIdx] = useState(0);



    const handleClose = () => setShow(false);
    
    const handleDelete = (event) => {
        
        handleHabitDelete(event.target.value);
        
    }
    //아주 만족스러운 코드입니다
    const handleShow = (event) => {
        setIdx(event.target.value)
        setShow(true);       
    };
    const returnList = () => {
        
        if(list!==undefined){
            if(list.size!==0){
                
                return list.get(idx)
            }else{
                return undefined;
            }
        }else{
            return undefined;
        }
        
    }
    

    const renderList = () => {
        
        if(list!==undefined){
            const cards = list.map((item,index)=> {
                
                return(<>
                       <Card>
                           <Card style={{ width: '100%', margin:'10px'}}>
                           <Card.Body>
                               <Card.Title>{item.get('habit')}</Card.Title>
                               <Card.Subtitle className="mb-2 text-muted">{item.habit}</Card.Subtitle>
                               <Card.Text>
                                    {`잘못된 습관 : ${item.get('wronghabit')}`}
                               </Card.Text>
                               <Card.Text>
                                    {`신호 : ${item.get('signal')}`}
                               </Card.Text>
                               <Card.Text>
                                    {`습관 시간 : ${item.get('habittime')}`}
                               </Card.Text>
                               <Card.Text>
                                   {item.get('before').map(value=>{
                                       return `${value}분전 알림 `
                                   })}
                               </Card.Text>
                               <Button variant="info" className='mr-1'value={index} onClick={handleShow} disabled>
                                  수정
                                </Button>
                               <Button  variant="info" value={index} onClick={handleDelete}>삭제</Button>
                           </Card.Body>
                           </Card>
                       </Card>
                   </>
               )
           })
           return cards;
        }
         else{
             return<div></div>
         }
    }
    return (
        <div>
            {renderList()}
            
            <CreateHabitModal item={returnList()} show={show} handleClose={handleClose}></CreateHabitModal>
        </div>
    )
}

export default HabitList
