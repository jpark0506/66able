import React from 'react'
import {Switch,useRouteMatch,Route,withRouter} from 'react-router-dom';
import Auth from '../../../hoc/auth';
import CreateHabitPage from './CreateHabitPage';
import HabitMainPage from './HabitMainPage';
import CustomNavBar from '../NavBar/CustomNavBar';
import HabitManage from './HabitManage';


function HabitRouter(props) {
    return (
        <div>
            <CustomNavBar history={props.history} userid = {props.userid}></CustomNavBar>
            <Switch>
                    <Route exact path={props.match.path}  component = {Auth(HabitMainPage,true)}>
                    </Route>
                    <Route path={props.match.path+'/:id/create'}  component = {Auth(CreateHabitPage,true)}>
                    </Route>
                    <Route path={props.match.path+'/:habitid/manage'}  component = {Auth(HabitManage,true)}>
                    </Route>
            </Switch>
        </div>
    )
}

export default withRouter(HabitRouter)
