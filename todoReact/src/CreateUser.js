import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class CreateUser extends Component{

    state={
        newUsernameText:'',
        newPasswordText:''
    }

    render(){
        return(
            <form>
                <h3>Create User:</h3>
                New Username:
                <input type='text' onChange={this.updateNewUsernameText} placeholder='new username'/><br/>
                New Password:
                <input type='password' onChange={this.updateNewPasswordText} placeholder='new password'/><br/>
                <Button type='button' onClick={this.addUser}>create user</Button>
            </form>
        )
    }

    updateNewUsernameText=(e)=>{
        this.setState({
            newUsernameText:e.target.value
        })
    }

    updateNewPasswordText=(e)=>{
        this.setState({
            newPasswordText:e.target.value
        })
    }

    addUser=()=>{
        let newUser={
            username:this.state.newUsernameText,
            password:this.state.newPasswordText
        }
        let requestURL=this.props.API+'/api/v1/users';
        let request = new XMLHttpRequest();
        request.open('POST', requestURL);
        request.responseType = 'json';
        request.setRequestHeader("Accept","application/json");
        request.setRequestHeader("Content-Type","application/json");
        request.onload=() => {
            newUser=request.response;
            this.props.changeUserFunction(newUser.userID,newUser.username);
        }
        request.send(JSON.stringify(newUser));

    
}

    


}

export default  CreateUser;