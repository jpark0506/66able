import React from 'react'
import NavContent from './NavContent';

const NavList = ['User', 'Post'];

function NavPage() {
    return (
        NavList.map(nav => {
            return(
            <NavContent content={nav}>
            </NavContent>
            )
        })
    )
}

export default NavPage
