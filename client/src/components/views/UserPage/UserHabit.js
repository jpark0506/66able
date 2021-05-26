import React,{useEffect, useState} from 'react'
import {withRouter, Link, useParams} from 'react-router-dom'
import {Button} from 'react-bootstrap';
import HorizontalLine from '../../../utils/HorizontalLine'
import UserCard from '../Card/UserCard';
import axios from 'axios';
import {List} from 'immutable';
function UserHabit({history,userid}) {
    const [page,setPage] = useState(0);
    const [data, setData] = useState(List([]))
    const id = useParams()
    useEffect(()=>{
        console.log(id);
        axios.get(`/api/habit/user/${id.id}/10/${page}`).then(
            res=>setData(res.data.data)
        )
        
    },[])


    const onViewHandler = (index) => {
        // history.push(`habit/${dummyData[index].id}/manage`)
    }

    const onUpdateHandler = (index) => {
        
    }

    const onDeleteHandler = (index) => {
        if(window.confirm("삭제하시겠습니까?")){
            const API = axios.create({
                baseURL: `http://localhost:3000/`,
              })
            API.delete(`api/habit/delete/${data[index]._id}`)
            .then(res=>console.log(res))
            .catch(err=>{
                console.error(err);
                alert('falied');
            })
            window.location.reload();
        }
        
    }
    
    const renderData = () => {
        console.log(data);
        if(data!==undefined){
            if(data.length===0){
                return <div>
                    등록하신 습관이 없네요 새로 추가해보세요!
                </div>
            }else{
                const list = data.map((item,index) => {
                
                    if(item.visibility === 'public'){
                        if(item.creator !== userid){
                            return (
                                <div>
                                    <UserCard 
                                    item={item} 
                                    index={index}
                                    onViewHandler = {onViewHandler}
                                    ></UserCard>
                                </div>
                                )
                        }else{
                            return (
                                <div>
                                    <UserCard 
                                    item={item} 
                                    index={index}
                                    onViewHandler = {onViewHandler}
                                    onDeleteHandler={onDeleteHandler}></UserCard>
                                </div>
                                )
                        }
                        
                        
                    }else if(item.visibility === 'private'){
                        if(item.creator !== userid){
                            return (
                                <div>
                                    <UserCard 
                                    item={item} 
                                    index={index}
                                    onViewHandler = {onViewHandler}
                                    ></UserCard>
                                </div>
                                )
                        }else{
                            return (
                                <div>
                                    <UserCard 
                                    item={item} 
                                    index={index}
                                    onViewHandler = {onViewHandler}
                                    onDeleteHandler={onDeleteHandler}></UserCard>
                                </div>
                                )
                        }
                    }
                })
                return list;
            }
            
        }else{
            return <div></div>
        }
    } 
        
    const push = () => {
        history.replace(`habit/${userid}/create`)
    }
        

        
    
    return (
        
        <div style={{marginLeft:'200px', marginRight:'200px', marginTop:'20px'}}>
            <div style ={{height:'100%', width:"100%", display:'inline-flex' ,flexdirection:'row', justifyContent:'space-between',}}>
                <h1>
                    내 습관
                </h1>  
                            <Button variant="primary" size="lg" onClick={push}>
                                Create Habit
                            </Button>
                
            </div>
            
            <HorizontalLine></HorizontalLine>   
            {renderData()}
        </div>
    )
}

export default withRouter(UserHabit)
