import React from 'react'
import {Button} from 'react-bootstrap';
import {withRouter,Link} from 'react-router-dom';
import HorizontalLine from '../../../utils/HorizontalLine'
import HabitCard from '../Card/HabitCard';
function HabitMainPage({match,userid,history}) {

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
    const onManageClick = (index) => {
        history.push(`habit/${dummyData[index].id}/manage`)
        
    }
    const renderData = () => {
        const list = dummyData.map((item,index) => {
            if(item.visibility === 'public'){
                if(item.creator === userid){
                    return (
                    <div>
                        <HabitCard 
                        creator={true}
                        subscribed = {true} 
                        item={item} 
                        index={index}
                        onManageClick={onManageClick}>   
                        </HabitCard>
                    </div>)
                }else if(item.users.includes(userid) && item.creator !== userid){
                    return (
                        <div>
                        <HabitCard
                        creator={false}
                        subscribed = {true} 
                        item={item} 
                        index={index}
                        >
                        </HabitCard>
                        </div>
                    )
                }else{
                    return(
                        <div>
                            <HabitCard 
                            creator={false} 
                            subscribed={true} 
                            item={item} 
                            index={index}>
                                
                            </HabitCard>
                        </div>
                    )
                }
                
                
            }
            
        })

        return list;
    }    



    return (
          
        <div style = {{height:'100vh',width:"100vw",padding:'30px',paddingInline:'200px'}}>
            <div>
                <div style={{ height:'100%', width:"100%",display:"inline-flex", justifyContent:"space-between"}}>
                    <h1>Habit</h1>
                    <Link to={`${match.url}/${userid}/create`} style={{}}>
                        <Button variant="primary" size="lg" >
                            Create Habit
                        </Button>
                    </Link>
                </div>
                <HorizontalLine></HorizontalLine>
                <div style={{display:'flex', width:'100%',height:'100%', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>       
                    {renderData()}
                </div>
            </div>
        </div>
        
        
    )
}

export default withRouter(HabitMainPage)
