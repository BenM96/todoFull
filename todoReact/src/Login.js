import React, { Component } from 'react';

class Login extends Component {
      state={
            usernameText:"",
            passwordText:""
      }


      render() {
        return (
            <nav id="login">
      username<input type="text" onChange={this.updateUsernameText}/>
      <button type="button" onClick={this.login}>login</button><br/>
      password<input type="password" onChange={this.updatePasswordText}/>
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
            let requestURL='http://localhost:8181/api/v1/users';
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
          
              }
            }
          }



    }
    export default Login;

