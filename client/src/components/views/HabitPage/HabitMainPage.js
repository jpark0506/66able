import React,{useEffect,useState} from 'react'
import {Button,Pagination} from 'react-bootstrap';
import {withRouter,Link} from 'react-router-dom';
import HorizontalLine from '../../../utils/HorizontalLine'
import HabitCard from '../Card/HabitCard';
import axios from 'axios';
import {List} from 'immutable';
function HabitMainPage({match,userid,history}) {

    const [page,setPage] = useState(0);
    const [total,setTotal] = useState(0);
    const [pagination, setPagination] = useState(List([]))
    const [tpage, setTPage] = useState(0);
    const [items, setItems] = useState(List([]));
    useEffect(()=>{
        axios.get(`/api/habit/10/${page}`).then
        (res=>{
            setItems(res.data.data)
            setTotal(res.data.total)
            setTPage(parseInt(res.data.total/10+1));
        })
    },[])
    const onUnSubscribeClick = (index) => {

    }

    const onSubscribeClick = async (index) =>{
         
    }

    const onViewClick = (index) =>{
        history.push(`habit/${items[index]._id}/view`)
    }

    const onManageClick = (index) => {
        // console.log(index)
        history.push(`habit/${items[index]._id}/manage`)
        
    }
    const renderData = () => {
        //console.log(items);
        const list = items.map((item,index) => {
            if(item.visibility === "public"){
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
                        onViewClick={onViewClick}
                        onSubscribeClick={onSubscribeClick}
                        onUnSubscribeClick={onUnSubscribeClick}
                        >
                        </HabitCard>
                        </div>
                    )
                }else{
                    return(
                        <div>
                            <HabitCard 
                            creator={false} 
                            subscribed={false} 
                            onViewClick={onViewClick}
                            onSubscribeClick={onSubscribeClick}
                            onUnSubscribeClick={onUnSubscribeClick}
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
