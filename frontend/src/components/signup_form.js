import React, { useState, useEffect } from 'react';
import { withRouter, Link} from 'react-router-dom';


class SignupForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password1: '',
            password2: '',
            errors: false
        };

        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e) {
        e.preventDefault();

        const user = Object.assign({}, this.state);

        fetch('http://127.0.0.1:8000/auth/register/', {
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
                password1: '',
                password2: '',
                errors: true
            });
            localStorage.clear();
            }
        });
        
    };

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        }) 
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
                    <h2>Join Us</h2>
                    <hr/>
                    <p>Please enter your username and password</p>
                    <div className="form-group">
                        <div className="input-group user-input">
                            <input type="email" value={this.state.email} onChange={this.update("email")} className="form-control" name="email" placeholder="Email" required="required"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group user-input">
                            <input type="password" value={this.state.password1} onChange={this.update("password1")} className="form-control" name="password1" placeholder="Password" required="required"/>
                        </div>
                   </div>
                   <div className="form-group">
                        <div className="input-group user-input">
                            <input type="password" value={this.state.password2} onChange={this.update("password2")} className="form-control" name="password2" placeholder="Confirm password" required="required"/>
                        </div>
                   </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary btn-lg user-input" value="Create Account" />
                    </div>
                </form>
            </div>
        </div>
        )}

    }


export default withRouter(SignupForm);