import axios from 'axios';
import React,{useEffect,useState} from 'react';
import {Button} from 'react-bootstrap';
import {withRouter,Link,useParams} from 'react-router-dom';
import HorizontalLine from '../../../utils/HorizontalLine';
function ViewPostPage({match}) {

    const [Title, setTitle] = useState("")
    const [Content, setContent] = useState("")
    let { postid } = useParams();
    useEffect(() => {

        console.log(`/api/post/${postid}`)
        axios.get(`/api/post/${postid}`).then(
            res=>{
                console.log(res);
                setTitle(res.data.data.title)
                setContent(res.data.data.content)
            }
        ).catch(err=>console.error(err));
        
    }, [])
    return (
        <div style = {{height:'100vh',width:"100vw",padding:'30px'}}>
            <div style={{ height:'100%', width:"100%",display:"flex",flexDirection:"column"}}>
                <div style={{display:"inline-flex"}}>
                    <Link to={`/post`} style={{}}>
                        <Button variant="primary" size="lg" >
                            Back
                        </Button>
                    </Link>
                    <Button variant="red" size="lg" >
                            Delete
                    </Button>
                </div>
                    <HorizontalLine></HorizontalLine>
                    <h1>
                        {Title}
                    </h1>
                    <HorizontalLine>
                    </HorizontalLine>
                    <p>
                        {Content}
                    </p>
                </div>
        </div>
    )
}

export default withRouter(ViewPostPage)
