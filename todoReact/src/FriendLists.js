import React, { Component } from 'react';
import ListDisp from './ListDisp.js';
import SelectList from './SelectList';

class FriendLists extends Component{
    state={
        SendText:""
    }

    render(){
        return(
            <div>
                <SelectList  API={this.props.API} listNames={this.props.upState.myFriends.map(friend => friend.username)} changeListFunction={this.changeCurrentFriend} username={this.props.upState.username}/>
                <ListDisp API={this.props.API} showDel={false} currentList={this.props.upState.username } userID={this.props.upState.currentFriendID} currentListItems={this.props.upState.currentListItems} loadListItemsFunction={this.loadListItems} />

            </div>
        )
    }
    


    loadListItems=()=>{
        //console.log(this.props.API+'/api/v1/listItems?listName='+this.props.upState.username+'&userID='+this.props.upState.currentFriendID);

        let listItems="";
        let requestURL=this.props.API+'/api/v1/listItems?listName='+this.props.upState.username+'&userID='+this.props.upState.currentFriendID;
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
        //let friendID= this.getFriendID(friendUsername);
        for (let friend of this.props.upState.myFriends){
            if (friendUsername===friend.username){
                let friendID= friend.userID
                //console.log(friendID);
                this.props.changeCurrentFriendFunction(friendID, friendUsername)
            }
        }
        //console.log(this.props.upState.currentFriendID)
    }

    // getFriendID=(username)=>{
    //     for (let friend of this.props.upState.myFriends){
    //         if (username===friend.username){
    //             return friend.userID
    //         }
    //     }
    
    // }

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