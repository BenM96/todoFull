import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class Login extends Component {
      state={
            usernameText:"",
            passwordText:""
      }


      render() {
        return (
            <nav id="login">
            <h3>Login:</h3>
      Username: <input type="text" onChange={this.updateUsernameText}/><br/>
      Password: <input type="password" onChange={this.updatePasswordText}/><br/>
      <Button type="button" varient="danger" onClick={this.login}>login</Button><br/>
      <br/><br/>
      </nav>
        );
      }

      hi=()=>{
            this.props.helloFunction("ben");
            console.log(this.state.usernameText)
      }


      updateUsernameText=(e)=>{
            //console.log(e.target.value);
            this.setState({
              usernameText:e.target.value
            })
          
          }
          
      updatePasswordText=(e)=>{
            this.setState({
              passwordText:e.target.value
            })
          }

      login=()=>{
            let username=this.state.usernameText;
            let password=this.state.passwordText;
            console.log(password)
            let users=[];
            let requestURL=this.props.API+'/api/v1/users';
            let request = new XMLHttpRequest();
            request.open('GET', requestURL);
            request.responseType = 'json';
            request.setRequestHeader("Accept","application/json");
            request.onload=()=>{
              users=request.response;
              this.validUser(users,username,password)
            }
            request.send()
          }
          
          validUser=(users,username,password)=>{
            for(let user of users){
              if(user.username===username & user.password===password){
                this.props.changeUserFunction(user.userID,username)
                this.props.setModeFunction("my lists");
          
              }
            }
          }



    }
    export default Login;

