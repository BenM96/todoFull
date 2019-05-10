import React, { Component } from 'react';


class SendRequest extends Component{
    state={
        usernameText:"",
        friendID:0
    }

    render(){
        return(
            <div>
                <h3>send friend request</h3>
                <input type="text" onChange={this.updateUsernameText} placeholder="Username"/>
                <button onClick={this.sendRequest} type='button'>send</button>

            </div>
        )
    }

    updateUsernameText=(e)=>{
        //console.log(this.GetUserID(e.target.value));
        this.setState({
            usernameText:e.target.value,
        })
        this.GetUserID(e.target.value);
    }

    GetUserID=(username)=>{
        let users=[];
        let requestURL='http://35.246.119.78:8181/api/v1/users';
        let request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.setRequestHeader("Accept","application/json");
        request.onload=()=>{
          users=request.response;
          for(let user of users){
              if(user.username===username){
                  this.setState({
                      friendID:user.userID
                  })
              }
          }
        }
        request.send()
    }

    sendRequest=()=>{
        console.log("---" + this.state.friendID);
        let userID1=this.props.upState.userID;
        let userID2=this.state.friendID;
        let requestURL='http://35.246.119.78:8181/api/v1/friends?userID1='+userID1+'&userID2='+userID2;
        let request = new XMLHttpRequest();
        request.open('POST', requestURL);
        request.responseType = 'json';
        request.setRequestHeader("Accept","application/json");
        request.setRequestHeader("Content-Type","application/json");
        request.onload=()=>{
            console.log("sent");
        }
        request.send();       
        
    }
}

export default  SendRequest;