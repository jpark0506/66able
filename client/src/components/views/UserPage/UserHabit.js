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
            axios.delete(data[index].id)
            .then(res=>console.log(res))
            .catch(err=>{
                console.error(err);
                alert('falied');
            })
        }
        
    }
    
    const renderData = () => {
        const list = data.map((item,index) => {
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
                <Link to={`habit/${id.id}/create`} style={{}}>
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
