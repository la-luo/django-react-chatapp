import SignupForm from './components/signup_form';
import LoginForm from './components/login_form';
import Chatroom from './components/chatroom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
          <div className="App">
            <Switch>
            <Route exact path="/" component={LoginForm}  />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/signup" component={SignupForm} />
            <Route exact path="/chatroom" component={Chatroom} />
            <Redirect to="/login" />
            </Switch>
          </div>
        </BrowserRouter>
  );
}

export default App;
