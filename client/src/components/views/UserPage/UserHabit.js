import React,{useEffect} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {Button} from 'react-bootstrap';
import HorizontalLine from '../../../utils/HorizontalLine'
import UserCard from '../Card/UserCard';
import axios from 'axios';
function UserHabit({userid,history}) {
    useEffect(()=>{

    },[])
    const dummyData = [
        {
            "users": [],
            "name": "금연",
            "startdate": "2021-05-23",
            "visibility": "private",
            "habit": [
                {
                    "signal": "점심 먹은 후 피로할 때",
                    "wronghabit": "담배",
                    "habit": "산책",
                    "habittime": "18:00",
                    "before": [
                        "1",
                        "5"
                    ],
                    "success": [],
                    "habittype": "0"
                }
            ],
            "objective": "목표",
            "tag": [
                "건강",
                "담배"
            ],
            "id":"60a0",
            "creator": "60a3c224d22fc84c580872a1",
            "description": "설명"
        },
        {
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
            "id":"60a1",
            "creator": "60a3c224d22fc84c580872a1",
            "description": "설명"
        }
    ]


    const onViewHandler = (index) => {
        history.push(`habit/${dummyData[index].id}/manage`)
    }

    const onUpdateHandler = (index) => {
        
    }

    const onDeleteHandler = (index) => {
        if(window.confirm("삭제하시겠습니까?")){
            // axios.delete(dummyData[index].id)
            // .then(res=>alert('success'))
            // .catch(err=>{
            //     console.error(err);
            //     alert('falied');
            // })
        }
        
    }
    
    const renderData = () => {
        const list = dummyData.map((item,index) => {
            if(item.visibility === 'public'){
                return (
                <div>
                    <UserCard 
                    item={item} 
                    index={index}
                    onViewHandler = {onViewHandler}
                    onDeleteHandler={onDeleteHandler}></UserCard>
                </div>
                )
                
            }else if(item.visibility === 'private'){
                return(
                <div>
                     <UserCard 
                     item={item} 
                     index={index}
                     onViewHandler = {onViewHandler}
                     onDeleteHandler={onDeleteHandler}></UserCard>
                </div>
                )
            }
            
        })

        return list;
    }  
    return (
        <div style={{marginLeft:'200px', marginRight:'200px', marginTop:'20px'}}>
            <div style ={{height:'100%', width:"100%", display:'inline-flex' ,flexdirection:'row', justifyContent:'space-between',}}>
                <h1>
                    내 습관
                </h1>  
                <Link to={`habit/${userid}/create`} style={{}}>
                            <Button variant="primary" size="lg" >
                                Create Habit
                            </Button>
                </Link>
            </div>
            
            <HorizontalLine></HorizontalLine>   
            {renderData()}
        </div>
    )
}

export default withRouter(UserHabit)
