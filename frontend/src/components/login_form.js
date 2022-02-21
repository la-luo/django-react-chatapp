import React from 'react';
import { withRouter, Link} from 'react-router-dom';


class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: ''
        };

        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.guestLogin = this.guestLogin.bind(this);
    }


    handleSubmit(e) {
        e.preventDefault();

        const user = Object.assign({}, this.state);
        fetch('http://127.0.0.1:8000/auth/login/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          })
            .then(res => res.json())
            .then(data => {
              if (data.key) {
                localStorage.clear();
                localStorage.setItem('token', data.key);
                window.location.replace('http://localhost:3000/chatroom');
              } else {
                this.setState({
                    email: '',
                    password: '',
                    errors: 'Invalid password or username'
                });
                localStorage.clear();
              }
            });
    };

    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    guestLogin(e){
        e.preventDefault();
        this.setState({
            email: 'demouser@gmail.com',
            password: 'demo123123',
        }, () => this.handleSubmit(e));
    }


    render() {
        return (
        <div>
            <nav className="navbar navbar-default navbar-expand-lg navbar-light">
                <div className="navbar-header d-flex col">
                    <a className="navbar-brand" href="/">Django React Chatroom</a>  		
                    <button type="button" data-target="#navbarCollapse" data-toggle="collapse" className="navbar-toggle navbar-toggler ml-auto">
                        <span className="navbar-toggler-icon"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                </div>
                <div id="navbarCollapse" className="collapse navbar-collapse justify-content-start">
                    <ul className="nav navbar-nav navbar-right ml-auto">
                    <li className="nav-item"><Link className="nav-link btn" to='/login'>Sign In</Link></li>
                    <li className="nav-item"><Link className="nav-link btn" to='/signup'>Sign Up</Link></li>
                    </ul>	
                </div>
            </nav>

            <div className="signup-form">
                <form onSubmit={this.handleSubmit}>
                    <h2>Welcome back!</h2>
                    <hr/>
                    <p>Sign in with your email and password</p>
                    <div className="form-group">
                        <div className="input-group user-input">
                            <input type="email" value={this.state.email} onChange={this.update("email")} className="form-control" name="email" placeholder="Email" required="required"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group user-input">
                            <input type="password" value={this.state.password} onChange={this.update("password")} className="form-control" name="password" placeholder="Password" required="required"/>
                        </div>
                   </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary btn-lg user-input" value="Sign in to your account" />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-lg user-input" onClick={this.guestLogin}>Guest Login</button>
                        <p className='errors'>{this.state.errors}</p>
                    </div>
                </form>
            </div>
        </div>
        )}

    }


export default withRouter(LoginForm);