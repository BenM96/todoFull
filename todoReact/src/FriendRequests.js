import React, { Component } from 'react';

class FriendRequests extends Component{

    render(){
        return(
            <div>
                <h3>friend requests</h3>
                {this.props.upState.myFriendRequests.map((friends) => <button type='button' id={'confirm'+friends.userID} onClick={this.confirm}>{friends.username}</button>)}
            </div>
        )
    }

    confirm=(e)=>{
        let friendID=e.target.id.substring(7);
        let requestURL=this.props.API+'/api/v1/friends/confirm?userID1='+friendID+'&userID2='+this.props.upState.userID;
        let request = new XMLHttpRequest();
        request.open('PUT', requestURL);
        request.responseType = 'json';
        request.setRequestHeader("content-Type","application/json");
        request.onload=()=>{
           console.log(request.response);
           this.props.loadMyFriendRequestsFunction();
           this.props.loadMyFriendsFunction();
         }    
        request.send();
        }
}

export default  FriendRequests;