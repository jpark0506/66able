import React from 'react'
import {Button} from 'react-bootstrap'
import { Link } from "react-router-dom";
import {navcontent} from '../../../style/managestyle'
function NavContent({content}) {
    return (
            <Link to={`#`} style={navcontent} >
                <div>
                    {content}
                </div>
                    
            </Link>
    )
}

export default NavContent
