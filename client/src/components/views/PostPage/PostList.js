import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Container,Spinner,Row,Col } from "react-bootstrap";
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import HorizontalLine from '../../../utils/HorizontalLine';
function PostCard(props){
    return(
        <div style={{width:"100%"}} onClick={props.onClick}>
            <Container>
                <Row>
                    <Col>{props.title}</Col>
                    <Col md="auto">{`Posted By ${props.author}`}</Col>
                    <Col md="auto">{`Created ${props.createdAt}`}</Col>
                </Row>
            </Container>
            <HorizontalLine></HorizontalLine>
        </div>
    )
}
function PostList(props) {
    const [PList, setPList] = useState([])
    useEffect(() => {
        axios.get('/api/post').then(
            res=>{
                if(PList.length===0){
                    setPList(PList.concat(res.data))
                }
                
                
            }
        ).catch(
            err=>console.log(err)
        )
       
    }, [])
    const onClickHandler = (id) =>{
        props.history.push(`${props.match.url}/${id}`)
    }
    if(PList.length===0){
        return(
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        )
    }else{
        
         return PList.map(post=>{
                console.log(post)
                return(
                <PostCard
                    title = {post.title} 
                    content = {post.content} 
                    createdAt={moment(post.createdAt).fromNow()}
                    author = {post.author.name}
                    onClick={()=>onClickHandler(post._id)}
                    >
                </PostCard>)
            }
        )
        
    }
}

export default withRouter(PostList)
