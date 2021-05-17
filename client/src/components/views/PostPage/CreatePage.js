import React,{useState, useEffect} from 'react'
import {withRouter, useParams,Link} from 'react-router-dom';
import {useDispatch } from 'react-redux';
import {Form, FormControl, InputGroup, Button} from 'react-bootstrap';
import { createPost }from '../../../_actions/post_action'
function CreatePage(props) {
    const dispatch = useDispatch();
    let { id } = useParams();
    const [Author, setAuthor] = useState("")
    
    const [Title, setTitle] = useState("");
    const [Content, setContent] = useState("initialState")
    
    useEffect(() => {
        setAuthor(id);
    }, [])
    const onTitleHandler = (e) => {
        setTitle(e.currentTarget.value);
    }
    const onContentHandler = (e) => {
        setContent(e.currentTarget.value);
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        let body = {
            author:Author,
            title:Title,
            content:Content,
            createdAt: Date.now(),
            savedAt: Date.now(),
            isTemp: false
        }
        dispatch(createPost(body))
        .then(
            res=> {
                if(res.payload.postSuccess){
                    alert("Post Success")
                    props.history.goBack();
                }else{
                    alert("Post Failed");
                    props.history.goBack();
                }
            }
        )
    }

    return (
        <div style={{margin:'50px'}}> 
            <Link to={`/post`} style={{}}>
                <Button variant="primary" size="lg" >
                    Back
                </Button>
            </Link>
            <h1>
                Create Post
            </h1>
            <Form onSubmit = {onSubmitHandler}>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">Title</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    aria-label="Title"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={onTitleHandler}
                    />
                </InputGroup>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Context</Form.Label>
                    <Form.Control as="textarea" rows={8} onChange={onContentHandler}/>
                </Form.Group>
                <Button size = 'lg' variant="primary" type="submit" value="publish">
                    Publish
                </Button>
            </Form>
        </div>
    )
}

export default withRouter(CreatePage);
