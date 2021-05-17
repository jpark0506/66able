import React,{useEffect} from 'react'
import {withRouter,Link} from 'react-router-dom';
import {Button, CardColumns} from 'react-bootstrap';
import PostList from './PostList';
import HorizontalLine from '../../../utils/HorizontalLine';
function PostPage({match,id}) {
    
    return (
        <div style = {{height:'100vh',width:"100vw",padding:'30px',paddingInline:'200px'}}>
            <div>
                <div style={{ height:'100%', width:"100%",display:"inline-flex", justifyContent:"space-between"}}>
                    <h1>Post</h1>
                    <Link to={`${match.url}/${id}/create`} style={{}}>
                        <Button variant="primary" size="lg" >
                            Create Post
                        </Button>
                    </Link>
                </div>
                <HorizontalLine></HorizontalLine>
                <div style={{display:'flex',height:'100%', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                        <PostList>
                        </PostList>
                </div>
                
                
            </div>
        </div>
    )
}

export default withRouter(PostPage)
