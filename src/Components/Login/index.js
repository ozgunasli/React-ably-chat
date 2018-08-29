import './Login.css';

import React, { Component } from 'react';

class Login extends Component{
    constructor(props){
        super(props);

        this.handleUsername=this.handleUsername.bind(this);
        this.handleSurname=this.handleSurname.bind(this);

        this.login = this.login.bind(this);

        this.state={
          firstname:'',
          lastname:'',
        };
    }

    handleUsername(e) {
      this.setState({
        firstname: e.target.value,
      });
    }
    handleSurname(e) {
      this.setState({
        lastname: e.target.value,
      });
    }

    login = () => {
      const updated_state = {
        activate: true,
        firstname:this.state.firstname,
        lastname:this.state.lastname

      };
      this.props.changeState(updated_state);
      }


    render(){
      return(
        <form onSubmit={this.handleUsername}>

          <div className="row">
            <div className="col-sm-12">
              <input
                className=""
                placeholder="Kullanıcı Adı:"
                id="username-input"
                onChange={this.handleUsername}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <input
                className=""
                placeholder="Kullanıcı Soyadı:"
                id="surname-input"
                onChange={this.handleSurname}
              />
            </div>
          </div>
          <button className="submit" onClick={this.login}> Save </button>
        </form>

      )


    }
}
export default Login;