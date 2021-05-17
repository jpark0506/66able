import React from 'react'
import {Switch,useRouteMatch,Route,withRouter} from 'react-router-dom';
import Auth from '../../../hoc/auth';
import CreatePage from './CreatePage';
import PostPage from './PostPage';
import CustomNavBar from '../NavBar/CustomNavBar';
import ViewPostPage from './ViewPostPage';
function PostRouter(props) {
    return (
        <div>
            <CustomNavBar history={props.history}></CustomNavBar>
            <Switch>
                    <Route exact path={props.match.path}  component = {Auth(PostPage,true)}>
                    </Route>
                    <Route path={`${props.match.path}/:id/create`} component = {CreatePage}>
                    </Route>
                    <Route path={`${props.match.path}/:postid`} component = {Auth(ViewPostPage,null)}>
                    </Route>
            </Switch>
        </div>
    )
}

export default withRouter(PostRouter)
