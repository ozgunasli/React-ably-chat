import React, { Component } from 'react';
import './App.css';
import Login from '../Login';
import Chat from '../Chat';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname : '',
            lastname  : '',
            activate : false,
        };
    }

    changeState = (state) => {
        this.setState(state);
    }

    render() {
            console.log(this.state);
			return (
				<div className = "box">
					<h3>Connexchat</h3>
					{!this.state.activate ? (
							<Login changeState={this.changeState} />
					) : (
							<Chat firstname={this.state.firstname} />
					)}
				</div>
			);
    }
}

export default App;