import React,{useState} from 'react'
import{Modal, Form, Button,Col} from 'react-bootstrap';
import {Map,get,update,List} from 'immutable';
function CreateTagModal({show, handleClose,handleCreateTag}) {

    const [tag, setTag] = useState("");

    const handleTag = (e) => {
        setTag(e.target.value)
    }

    const handleSubmit = () => {
        handleCreateTag(tag);
        handleClose();
    }

    return (
        <Modal size="lg" show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                    <Modal.Title>태그 추가하기</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="m-2">
                            <Form.Row>
                                <Form.Label column="lg" lg={2}>
                                    태그 이름
                                </Form.Label>
                                <Col>
                                <Form.Control size="lg" type="text" placeholder="ex)저녁" onChange ={handleTag} />
                                </Col>
                            </Form.Row>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        등록하기
                    </Button>
                    </Modal.Footer>
                </Modal>
    )
}

export default CreateTagModal
