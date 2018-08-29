import React, { Component } from 'react';
import './Chat.css';
import * as Ably from 'ably';

class Chat extends Component{
    constructor(props) {
        super(props);
        this.handlemessage=this.handlemessage.bind(this);
        this.send=this.send.bind(this);

        this.state = {
                messages: [],
                body:'',
        }

        this.realtime = new Ably.Realtime({
                key: '' //Key,
                clientId: props.firstname
            }
        );

        this.channel = this.realtime.channels.get('chat');

        this.channel.subscribe((msg) => {
        debugger;
            this.setState({
                messages: this.state.messages.concat(msg.data),
          });
        });

        this.channel.presence.subscribe('enter', (member) => {
            this.setState({
                messages: this.state.messages.concat({
                    'firstname': member.clientId, 'body': 'Logged in', timestamp: (new Date()).toISOString()
                })
            });
        });

        this.channel.presence.subscribe('leave', (member) => {
            this.setState({
                messages: this.state.messages.concat({
                    'firstname': member.clientId, 'body': 'Logged out', timestamp: (new Date()).toISOString()
                })
            });
        });

        this.channel.presence.enter();
    }

    handlemessage(e) {
      this.setState({
        body: e.target.value,
      });
    }

    send = () => {
      const update = {
           firstname: this.props.firstname,
           body: this.state.body,
           timestamp: (new Date()).toISOString(),

      };
       this.channel.publish('message', update);
      }

    render(){
      return(

          <div className="row">
            <div className="col-sm-12">
              <h3>Chat Screen</h3>
              <input
                className="input"
                placeholder="MESAJINIZ:"
                id="message-input"
                onChange={this.handlemessage}
              />
              <button className="submit" onClick={this.send}> Send </button>
                {this.state.messages.map(message => (
                   <div className="message">
	                   <div className="sender">{message.firstname}</div>
	                   <div className="body">{message.body}</div>
	                   <div className="timestamp">{message.timestamp}</div>
                    </div>


                    ))
                 }

            </div>
          </div>

      )
    }
}
export default Chat;
