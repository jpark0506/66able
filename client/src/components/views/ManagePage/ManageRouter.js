import React from 'react'
import {withRouter} from 'react-router-dom';
import CustomNavBar from '../NavBar/CustomNavBar';
import Auth from '../../../hoc/auth';
function ManageRouter() {
    return (
        <div>
            <CustomNavBar history={props.history}></CustomNavBar>
            <div style = {navpage}>
                <NavPage className="NavPage">
                </NavPage>
            </div>
            <Switch>
                    <Route path={`${props.match.path}/users`} component = {Auth()}>
                    </Route>
                    <Route path={`${props.match.path}/posts`} component = {Auth()}>
                    </Route>
            </Switch>
        </div>
    )
}
function DataPage(){
    return(
        
    )
}

export default withRouter(ManageRouter)
