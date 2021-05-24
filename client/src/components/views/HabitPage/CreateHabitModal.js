import React,{useState,useEffect} from 'react'
import {Form, Col,Button,Modal, PageItem} from 'react-bootstrap';
import {Map,get,update,List,push} from 'immutable';
function CreateHabitModal({item,show, handleClose, handleCreateHabit,handleUpdateHabit}) {
    const onSubmitHandler = () => {
        if(specific.get('signal')!="" && specific.get('wronghabit')!=""&&specific.get('habit')!=""&&specific.get('habittime')!=""&&specific.get('habittype')!=""){
            console.log(`Submit Habit Modal with ${specific}`)
            handleCreateHabit(specific);
            handleClose();
        }else{
            alert('빈칸이나 빈 체크를 모두 채워줘세요!')
        }
        
    }

    const onUpdateHandler = () => {
        if(specific.get('signal')!="" && specific.get('wronghabit')!=""&&specific.get('habit')!=""&&specific.get('habittime')!=""&&specific.get('habittype')!=""){
            handleUpdateHabit(specific);
            handleClose();
        }else{
            alert('빈칸이나 빈 체크를 모두 채워줘세요!')
        }
        
    }

    const specificInitialState = Map({
        "signal":"",
        "wronghabit":"",
        "habit":"",
        "habittime":"",
        "before":List([]),
        "success":List([]),
        "habittype":""
    })

   
    const [specific, setSpecific] = useState(specificInitialState);

    
    const handleInputText = (event) => {
        const {name, value} = event.target;
        setSpecific(specific.update(`${name}`,()=>value));
        
    }

    const handleInputCheck = (event) => {
        const {name, value, checked} = event.target;
        if(checked){
            setSpecific(specific.update(`${name}`,()=>value))
        }
        
    }

    const handleCheck = (event) => {
        const {name, value, checked} = event.target;
        if(checked){
            setSpecific(specific.update(`${name}`,val=>val.push(value)))
        }else{
            setSpecific(specific.update(`${name}`,val=>{
                let idx = val.indexOf(value);
                return val.splice(idx, 1);
            }))
        }
    }

    if(item===undefined){
        return (
            <Modal size="lg" show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                    <Modal.Title>반응 및 알림 설정</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={onSubmitHandler}>
                            <Form.Group className="m-2">
                            <Form.Row>
                                <Form.Label column="lg" lg={2}>
                                    신호
                                </Form.Label>
                                <Col>
                                <Form.Control name="signal" size="lg" type="text" placeholder="ex)점심 먹은 후 피로할 때" onChange={handleInputText}/>
                                </Col>
                            </Form.Row>
                            <br/>
                            <Form.Row>
                                <Form.Label column="lg" lg={2}>
                                    경우
                                </Form.Label>
                                <Col>
                                    <Form.Check
                                            name="habittype"
                                            type={'radio'}
                                            value={0}
                                            onChange={handleInputCheck}
                                            label={`하나의 습관을 끊거나 다른 습관으로 고치고 싶은 경우`}
                                            id={`disabled-default-checkbox`}
                                        />
                                        <Form.Check
                                            name="habittype"
                                            type={'radio'}
                                            value={1}
                                            onChange={handleInputCheck}
                                            label={`새로운 습관을 만들고 싶은 경우`}
                                            id={`disabled-default-checkbox`}
                                        />
                                    </Col>
                                </Form.Row>
                                <br />
                                <Form.Row>
                                    <Form.Label column="lg" lg={2}>
                                    잘못된 습관
                                    </Form.Label>
                                    <Col>
                                    <Form.Control name="wronghabit" size="lg" type="text" placeholder="고치고 싶은 습관을 적어주세요 ex)담배" onChange={handleInputText} />
                                    </Col>
                                </Form.Row>
                                <br />
                                <Form.Row>
                                    <Form.Label column="lg" lg={2}>
                                    만들 습관
                                    </Form.Label>
                                    <Col>
                                    <Form.Control name="habit" size="lg" type="text" placeholder="만들고 싶은 습관을 적어주세요 ex)산책" onChange={handleInputText}/>
                                    </Col>
                                </Form.Row>
                                <br />
                                <Form.Row>
                                    <Form.Label column="lg" lg={2}>
                                        습관 실행 시간
                                    </Form.Label>
                                    <Col>
                                    <Form.Control name="habittime" size="lg" type="time" placeholder="만들고 싶은 습관을 적어주세요 ex)산책" onChange={handleInputText}/>
                                    </Col>
                                </Form.Row>
                                <br/>
                                <Form.Row>
                                    <Form.Label column="lg" lg={2}>
                                        알림 시간
                                    </Form.Label>
                                    <Col>
                                        <Form.Check
                                            name="before"
                                            type={'checkbox'}
                                            value='1'
                                            onChange={handleCheck}
                                            label={`1분전`}
                                            id={`disabled-default-checkbox`}
                                        />
                                        <Form.Check
                                            name="before"
                                            type={'checkbox'}
                                            value='5'
                                            onChange={handleCheck}
                                            label={`5분전`}
                                            id={`disabled-default-checkbox`}
                                        />
                                        <Form.Check
                                            name="before"
                                            type={'checkbox'}
                                            value='10'
                                            onChange={handleCheck}
                                            label={`10분전`}
                                            id={`disabled-default-checkbox`}
                                        />
                                        <Form.Check
                                            name="before"
                                            type={'checkbox'}
                                            value = '15'
                                            onChange={handleCheck}
                                            label={`15분전`}
                                            id={`disabled-default-checkbox`}
                                        />
                                        <Form.Check
                                            name="before"
                                            type={'checkbox'}
                                            value = '30'
                                            onChange={handleCheck}
                                            label={`30분전`}
                                            id={`disabled-default-checkbox`}
                                        />
                                    </Col>
                                </Form.Row>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                    <Button variant="primary" type="submit" onClick={onSubmitHandler}>
                        등록하기
                    </Button>
                    </Modal.Footer>
                </Modal>)
    }
    else{
        return (
            <Modal size="lg" show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                    <Modal.Title>반응 및 알림 설정</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="m-2">
                            <Form.Row>
                                <Form.Label column="lg" lg={2}>
                                    신호
                                </Form.Label>
                                <Col>
                                <Form.Control 
                                name="signal" 
                                size="lg" 
                                type="text" 
                                placeholder="ex)점심 먹은 후 피로할 때" 
                                defaultValue = {item.get('signal')} 
                                onChange={handleInputText}/>
                                </Col>
                            </Form.Row>
                            <br/>
                            <Form.Row>
                                <Form.Label column="lg" lg={2}>
                                    경우
                                </Form.Label>
                                <Col>
                                    <Form.Check
                                        checked={item.get("habittype")}
                                        name="type"
                                        type={'radio'}
                                        onChange={handleInputCheck}
                                        label={`하나의 습관을 끊거나 다른 습관으로 고치고 싶은 경우`}
                                        id={`disabled-default-checkbox`}
                                    />
                                    <Form.Check
                                        checked={!item.get("habittype")}
                                        name="type"
                                        type={'radio'}
                                        onChange={handleInputCheck}
                                        label={`새로운 습관을 만들고 싶은 경우`}
                                        id={`disabled-default-checkbox`}
                                    />
                                </Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Form.Label column="lg" lg={2}>
                                    잘못된 습관
                                </Form.Label>
                                <Col>
                                <Form.Control size="lg" 
                                type="text" 
                                placeholder="고치고 싶은 습관을 적어주세요 ex)담배" 
                                defaultValue={item.get('wronghabit')}
                                onChange={handleInputText} />
                                </Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Form.Label column="lg" lg={2}>
                                    만들 습관
                                </Form.Label>
                                <Col>
                                <Form.Control size="lg" 
                                type="text" 
                                placeholder="만들고 싶은 습관을 적어주세요 ex)산책" 
                                defaultValue={item.get('habit')} 
                                onChange={handleInputText}/>
                                </Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Form.Label column="lg" lg={2} >
                                    습관 실행 시간
                                </Form.Label>
                                <Col>
                                <Form.Control size="lg" 
                                type="time" 
                                placeholder="만들고 싶은 습관을 적어주세요 ex)산책" 
                                defaultValue={item.get('habittime')}
                                onChange={handleInputText}/>
                                </Col>
                            </Form.Row>
                            <br/>
                            <Form.Row>
                                <Form.Label column="lg" lg={2}>
                                    알림 시간
                                </Form.Label>
                                <Col>
                                    <Form.Check
                                        name="type"
                                        value='1'
                                        checked={item.get('before').includes("1")}
                                        type={'checkbox'}
                                        onChange={handleCheck}
                                        label={`1분전`}
                                        id={`disabled-default-checkbox`}
                                    />
                                    <Form.Check
                                        name="type"
                                        value='5'
                                        checked={item.get('before').includes("5")}
                                        type={'checkbox'}
                                        onChange={handleCheck}
                                        label={`5분전`}
                                        id={`disabled-default-checkbox`}
                                    />
                                    <Form.Check
                                        name="type"
                                        value='10'
                                        checked={item.get('before').includes("10")}
                                        type={'checkbox'}
                                        onChange={handleCheck}
                                        label={`10분전`}
                                        id={`disabled-default-checkbox`}
                                    />
                                    <Form.Check
                                        value='15'
                                        name="type"
                                        checked={item.get('before').includes("15")}
                                        type={'checkbox'}
                                        onChange={handleCheck}
                                        label={`15분전`}
                                        id={`disabled-default-checkbox`}
                                    />
                                   <Form.Check
                                        value='30'
                                        name="type"
                                        checked={item.get('before').includes("30")}
                                        type={'checkbox'}
                                        onChange={handleCheck}
                                        label={`30분전`}
                                        id={`disabled-default-checkbox`}
                                    />
                                </Col>
                            </Form.Row>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                    <Button variant="primary" type="submit" onClick={onUpdateHandler}>
                        등록하기
                    </Button>
                    </Modal.Footer>
                </Modal>)
    }
    
}

export default CreateHabitModal
