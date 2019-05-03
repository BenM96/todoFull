import React, { Component } from 'react';
import ListDisp from './ListDisp.js';
import User from './User';

class FriendLists extends Component{
    state={
        SendText:""
    }

    render(){
        let loggedIn=(this.state.userID!==0);
        return(
            <div>
                <User setModeFunction={this.props.setModeFunction} changeUserFunction={this.props.changeUserFunction} listNames={this.props.upState.myFriends.map(friend => friend.username)} changeListFunction={this.changeCurrentFriend} username={this.props.upState.username}/>
                <ListDisp loadListNamesFunction={this.loadListNames}  currentList={this.props.upState.username } userID={this.props.upState.currentFriendID} currentListItems={this.props.upState.currentListItems} loadListItemsFunction={this.loadListItems} />

            </div>
        )
    }
    



    loadListItems=()=>{
        //console.log('http://localhost:8181/api/v1/listItems?listName='+this.props.upState.username+'&userID='+this.props.upState.currentFriendID);

        let listItems="";
        let requestURL='http://localhost:8181/api/v1/listItems?listName='+this.props.upState.username+'&userID='+this.props.upState.currentFriendID;
        let request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json'
        request.setRequestHeader("content-Type","application/json");
        request.onload=()=>{
          listItems=request.response;      
          this.props.setCurrentListItemsFunction(listItems);
          //console.log(listItems);
        }
        request.send();
    }
    

    

    changeCurrentFriend=(e)=>{
        let friendUsername=e.target.innerHTML;
        let friendID= this.getFriendID(friendUsername);
        this.props.changeCurrentFriendFunction(friendID, friendUsername)
        this.loadListItems(e.target.innerHTML);
        //console.log(this.props.upState.currentFriendID)
        this.loadListItems();
    }

    getFriendID=(username)=>{
        for (let friend of this.props.upState.myFriends){
            if (username===friend.username){
                return friend.userID
            }
        }
    
    }

    test=()=>{
        console.log(this.props.upState.myFriends);
        this.props.upState.myFriends.map(friend=>console.log(friend.username))
      }

    updateSendText=(e)=>{
        this.setState({
            SendText:e.target.value
        })
    }

}

export default FriendLists;