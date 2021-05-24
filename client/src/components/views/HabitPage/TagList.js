import React from 'react'
import {Button} from 'react-bootstrap';
function TagList({list,handleTagDelete}) {

    const onTagDelete = (event) => {
        handleTagDelete(event.target.value);
    }

    

    const renderTags = () => {
        if(list!=undefined){
            const tags = list.map((item,index)=>{
                return(<>
                    <Button variant="info" className="m-1" >
                       {`#${item}`}
                        <Button className="ml-2" variant="danger" value = {index} onClick={onTagDelete}>
                            X
                        </Button>
                    </Button>
                </>)
            })
            return tags;
        }
        else return <div></div>
        
        
    }
    return (
        <div>
            {renderTags()}
        </div>
    )
}

export default TagList
