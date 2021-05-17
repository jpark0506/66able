
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import ManageRouter from './components/views/ManagePage/ManageRouter';
import PostRouter from './components/views/PostPage/PostRouter';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Auth from './hoc/auth';
import NotFound from './components/views/NotFoundPage/NotFound';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component = {Auth(LandingPage,null)}>
          </Route>
          <Route exact path="/login" component = {Auth(LoginPage,false)}>
          </Route>
          <Route exact path="/register" component = {Auth(RegisterPage,false)}>
          </Route>
          <Route path="/post" component = {Auth(PostRouter,true)}></Route>
          <Route exact path="/manage" component = {Auth(ManageRouter,true)}></Route>
          <Route component = {Auth(NotFound,null)}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
