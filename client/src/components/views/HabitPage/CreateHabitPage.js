
import React,{useState,useEffect} from 'react'
import {Form, Col,Button,Modal} from 'react-bootstrap';
import HorizontalLine from '../../../utils/HorizontalLine';
import CreateHabitModal from './CreateHabitModal';
import CreateTagModal from './CreateTagModal';
import HabitList from './HabitList';
import {Map,get,update,List} from 'immutable';
import {withRouter, useParams,Link} from 'react-router-dom';
import TagList from './TagList';
import axios from 'axios';
function CreateHabitPage(props) {
    const id = useParams();
    const habitInitialState = Map({
        "creator":id.id,
        "name":"",
        "users":List([]),
        "startdate":"",
        "objective":"",
        "description":"",
        "visibility":"private",
        "habit":List([]),
        "tag":List([]),
        "achievement":List([Map({
            [id.id]:List(Array.from({length:66}, ()=>0))
        })]),
    })
    
     //immutability
    const [habit, setHabit] = useState(habitInitialState);
    const [showHabit, setShowHabit] = useState(false);
    const [showTag, setShowTag] = useState(false);

    const handleHabitClose = () => setShowHabit(false);
    const handleHabitShow = () => setShowHabit(true);
    const handleTagClose = () => setShowTag(false);
    const handleTagShow = () => setShowTag(true);

    const handleSubmit = () => {
        if(habit.get('wronghabit')!="" && habit.get('objective')!="" && habit.get('description')!=""&& habit.get("habit").size!=0&&habit.get("tag").size!=0){
            console.log(habit.toJS())
            if(confirm("등록하시겠습니까?")){
                axios.post('/api/habit/create', habit).then(res=>
                    {
                        if(res.habitSuccess){
                            alert("등록되었습니다");
                            props.history.goBack();
                        }else{
                            alert("등록 실패");
                            
                        }
                    }
                ).catch(err=>{
                    console.log(err);
                    alert("오류");
                })
            }else{
                alert('취소되었습니다')
            }
            console.log(habit.toJS());
            alert(habit.toJS());

            
        }else{
            alert("빈칸을 모두 채우세요!")
        }
        
    }

    const handleTextInput = (event) =>{
        const {name, value} = event.target;
        setHabit(habit.update(`${name}`,()=>value));
       
    }
    

    const handleCreateTag = (data) => {
        setTimeout(()=>{
            setHabit(habit.update("tag", value => {
                return value.push(data)
                
            }))
        },250)
        //얘는 일단은 구현은 했는데 프로미스 형태로 바꾸자
       
    }

    const handleCreateHabit = (data) => {
       
        setTimeout(()=>{
            setHabit(habit.update("habit", value => 
            {
                return value.push(data)
            }))
        }, 250)
        
       
    }
    const handleHabitDelete = (index) =>{
        console.log(`index:${index}`);
        setHabit(habit.update("habit", value=> {
            return value.delete(index)
        }))

        
        
    }
    const handleTagDelete = (index) => {
        setHabit(habit.update("tag", value => {
            return value.delete(index)
        }))
        
    }
    const handleUpdateHabit = (data, index) => {
        setHabit(habit.update("habit", value => {
            value.get(index).merge(data)} ))
    }

    const onBackHandler = () => {
        props.history.goBack();
    }
    return (
        <div style = {{marginLeft:'200px',marginRight:'200px'}}>
            
                <Button className="mt-3" variant="primary" size="lg" onClick={onBackHandler}>
                    Back
                </Button>
            
            <div className ="m-3">
                <h1>
                    습관 만들기
                </h1>
            </div>
            <HorizontalLine ></HorizontalLine>
            <div>
            <Form>
                <Form.Group className="m-2">
                    <Form.Row>
                        <Form.Label column="lg" lg={1}>
                        이름
                        </Form.Label>
                        <Col>
                        <Form.Control name="name" size="lg" type="text" placeholder="습관 이름" onChange={handleTextInput}/>
                        </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Form.Label column="lg" lg={1}>
                        목표
                        </Form.Label>
                        <Col>
                        <Form.Control name="objective" size="lg" type="text" placeholder="목표" onChange={handleTextInput}/>
                        </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Form.Label column="lg" lg={1}>
                        설명
                        </Form.Label>
                        <Col>
                        <Form.Control name="description" size="lg" type="text" placeholder="설명" onChange={handleTextInput}/>
                        </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Form.Label column="lg" lg={1}>
                        시작일
                        </Form.Label>
                        <Col>
                        <Form.Control name="startdate" size="lg" type="date" placeholder="설명" onChange={handleTextInput}/>
                        </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Form.Label column="lg" lg={1}>
                        세부항목
                        </Form.Label>
                        <Col>
                        <HabitList list={habit.get("habit")} handleHabitDelete={handleHabitDelete}>
                        </HabitList>
                        <br/>
                        <Button onClick={handleHabitShow}>추가하기</Button>
                        </Col>
                    </Form.Row>
                    <br/>
                    <Form.Row>
                        <Form.Label column="lg" lg={1}>
                        태그추가
                        </Form.Label>
                        <Col>
                        <TagList list={habit.get("tag")} handleTagDelete={handleTagDelete}></TagList>
                        <Button onClick={handleTagShow}>태그 추가하기</Button>
                        </Col>
                    </Form.Row>
                    <br/>
                    <Form.Row>
                        <Form.Label column="lg" lg={1}>
                        공개범위
                        </Form.Label>
                        <Form.Control name="visibility" as="select" size="lg" onChange={handleTextInput}>
                            <option>private</option>
                            <option>public</option>
                        </Form.Control>
                    </Form.Row>
                    <br/>
                    <Button onClick={handleSubmit}>
                        습관 등록하기
                    </Button>
                </Form.Group>
            </Form>
            </div>
            <CreateHabitModal 
                show={showHabit} 
                handleCreateHabit={handleCreateHabit}
                handleUpdateHabit={handleUpdateHabit}
                handleClose={handleHabitClose}>
            </CreateHabitModal>
            <CreateTagModal 
                show={showTag} 
                handleCreateTag={handleCreateTag}
                handleClose={handleTagClose}>
            </CreateTagModal>
        </div>
    )
}

export default withRouter(CreateHabitPage)
