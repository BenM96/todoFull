import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';

class SendRequest extends Component{
    state={
        usernameText:"",
        friendID:0
    }

    render(){
        return(
            <div>
                <h3>send friend request</h3>
                <input ref="usernameInput" type="text" onChange={this.updateUsernameText} placeholder="Username"/>
                <button onClick={this.sendRequest} type='button'>send</button><br/>


                <Table align="left">
                <thead>
                    <tr>
                        <th scope="col" >Requests sent</th>
                        <th scope="col" >Status</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.upState.sentFriendRequests.map((friend)=>
                        <tr>
                            <td>{friend.username}</td>
                            <td>Pending...</td>
                        </tr>)}

                    
                </tbody>
                </Table>

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
        let requestURL=this.props.API+'/api/v1/users';
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
        let requestURL=this.props.API+'/api/v1/friends?userID1='+userID1+'&userID2='+userID2;
        let request = new XMLHttpRequest();
        request.open('POST', requestURL);
        request.responseType = 'json';
        request.setRequestHeader("Accept","application/json");
        request.setRequestHeader("Content-Type","application/json");
        request.onload=()=>{
            console.log("sent");
            this.refs.usernameInput.value="";
            this.props.loadSentFriendRequestsFunction();
        }
        request.send();       
        
    }
}

export default  SendRequest;