import React from 'react';
import { withRouter, Link} from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from "websocket";


class Chatroom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            user: {},
            text: ""
        };

        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

        this.client = new W3CWebSocket('ws://127.0.0.1:8000/ws/chat/chatroom1/');

    }

    componentWillMount() {
        if (localStorage.getItem('token') == null) {
            window.location.replace('http://localhost:3000/login');
        } else {
            fetch('http://127.0.0.1:8000/auth/user/', {
                method: 'GET',
                headers: {
                  'Authorization': "Token " + localStorage.getItem('token')
                },
              })
                .then(res => res.json())
                .then(data => {
                console.log(data)
                  this.setState({
                    user: data
                  });
                });

            fetch('http://127.0.0.1:8000/api/messages/', {
                method: 'GET',
                headers: {
                    'Authorization': "Token " + localStorage.getItem('token')
                },
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    this.setState({
                    messages: data
                    });
                });
        }
    }

    componentDidMount() {
        this.client.onopen = () => {
            console.log('WebSocket Client Connected');
          };
          this.client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log('got reply! ', dataFromServer.type);
            if (dataFromServer) {
              this.setState((state) =>
                ({
                  messages: [...state.messages,
                  {
                    id: dataFromServer.id,
                    body: dataFromServer.body,
                    user: dataFromServer.user,
                    created_at: dataFromServer.created_at
                  }]
                })
              );
            }
          };
      
    }

    handleSubmit(e) {
        e.preventDefault();

        let new_msg = {
            body: this.state.text,
            user_id: this.state.user.pk
        }

        fetch('http://127.0.0.1:8000/api/messages/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(new_msg)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.client.send(JSON.stringify({
                type: "message",
                id: data.id,
                body: data.body,
                user: this.state.user.username,
                created_at: data.created_at,
              }));
            this.setState({text: ""});
            // this.setState({text: "", messages: [...this.state.messages, {id: data.id, body: data.body, created_at: data.created_at, user: this.state.user.username}]})
        })
    };

    handleLogout(e) {
        e.preventDefault();
    
        fetch('http://127.0.0.1:8000/auth/logout/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
          }
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            localStorage.clear();
            window.location.replace('http://localhost:3000/login');
          });
      };
    

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        }) 
    };


    render() {
        var date = new Date();
        
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
                    <div>
                        <div className="nav-item"><div className="btn pull-right logout" onClick={this.handleLogout}>Logout</div></div>
                    </div>	
                </div>
            </nav>
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="portlet portlet-default">
                        <div className="portlet-heading">
                            <div className="portlet-title">
                                <h4><i className="fa fa-circle text-green"></i>{" "} {this.state.user.username}</h4>
                            </div>
                            <div className="portlet-widgets">
                                <div className="btn-group">
                                    <ul className="dropdown-menu" role="menu">
                                        <li><a href="#"><i className="fa fa-circle text-green"></i> Online</a>
                                        </li>
                                        <li><a href="#"><i className="fa fa-circle text-orange"></i> Away</a>
                                        </li>
                                        <li><a href="#"><i className="fa fa-circle text-red"></i> Offline</a>
                                        </li>
                                    </ul>
                                </div>
                                <span className="divider"></span>
                                <a data-toggle="collapse" data-parent="#accordion" href="#chat"><i className="fa fa-chevron-down"></i></a>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                        <div id="chat" className="panel-collapse collapse in">
                            <div>
                            <div className="portlet-body chat-widget chat">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <p className="text-center text-muted small">{date.toLocaleDateString('en-US')} {date.toLocaleTimeString('en-US')}</p>
                                    </div>
                                </div>
                                {
                                    this.state.messages.map((el, idx) => {
                                        return (
                                        <div key={idx}>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="media">
                                                        <div className="media-body">
                                                            <h4 className="media-heading">{el.user}
                                                                <span className="small pull-right">{el.created_at}</span>
                                                            </h4>
                                                            <p>{el.body}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr/>
                                        </div>
                                        )
                                    }
                                    )
                                }

                            </div>
                            </div>
                            <div className="portlet-footer">
                                <form role="form" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <textarea className="form-control" placeholder="Enter message..." value={this.state.text} onChange={this.update("text")}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" className="btn btn-default pull-right" value="Send"/>
                                        <div className="clearfix"></div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>             
        )
    }
}


export default withRouter(Chatroom);