import React from 'react'
import {Switch,useRouteMatch,Route,withRouter} from 'react-router-dom';
import Auth from '../../../hoc/auth';

import CustomNavBar from '../NavBar/CustomNavBar';
import UserHabit from './UserHabit';
function UserRouter(props) {
    return (
        <div>
            <CustomNavBar history={props.history} userid = {props.userid}></CustomNavBar>
            <Switch>
                    <Route exact path={props.match.path}  component = {Auth(UserHabit,true)}>
                    </Route>
            </Switch>
        </div>
    )
}

export default withRouter(UserRouter)
