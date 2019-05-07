import React, { Component } from 'react';
import Header from './Header.js';
import Login from './Login.js';
import SelectList from './SelectList.js';
import AddList from './AddList.js';
import ListDisp from './ListDisp.js';
import CreateUser from './CreateUser.js';
import FriendLists from './FriendLists.js';
import SendRequest from './SendRequest.js';
import ModeNav from './ModeNav.js';
import FriendRequests from './FriendRequests.js';

class App extends Component{



  state={
    userID:0,
    username:"",
    currentList:"",
    listNames:[],
    currentListItems:[],
    newItemText:"",
    myFriends:[],
    myFriendRequests:[],
    currentFriendID:0,
    currentFriendUsername:"",
    mode:"my lists"
  }


  
  render(){
    let loggedIn=(this.state.userID!==0);
    let friendMode=this.state.mode==="friend's lists";
    let myListMode=this.state.mode==="my lists";
    let sendRequest=this.state.mode==="send request";
    return (
      <div className="App">
      <button type="button" onClick={this.test}>test</button>
      <Header/>

      {loggedIn ? <p></p>:<Login changeUserFunction={this.changeUser}/>}

      {loggedIn ? <p/>:<CreateUser changeUserFunction={this.changeUser}/>}
          
      {loggedIn ? <ModeNav changeUserFunction={this.changeUser} setModeFunction={this.setMode}/>:<p></p>}

      {loggedIn & myListMode ? <SelectList   listNames={this.state.listNames} changeListFunction={this.changeList} username={this.state.username}/>:<p/>}

      {loggedIn & myListMode ? <AddList addListFunction={this.addList}/>:<p/>}

      {loggedIn & myListMode ? <ListDisp showDel={true} loadListNamesFunction={this.loadListNames}  currentList={this.state.currentList }userID={this.state.userID} currentListItems={this.state.currentListItems} loadListItemsFunction={this.loadCurrentListItems} />:<p/>}

      {loggedIn & friendMode? <FriendLists setModeFunction={this.setMode} changeUserFunction={this.changeUser} setCurrentListItemsFunction={this.setCurrentListItems} changeCurrentFriendFunction={this.changeCurrentFriend} upState={this.state} /> :<p/>}

      {loggedIn & sendRequest? <SendRequest upState={this.state}/> : <p/>}

      <FriendRequests loadMyFriendsFunction={this.loadMyFriends} loadMyFriendRequestsFunction={this.loadMyFriendRequests}upState={this.state}/>

    </div>
  );


  
  
  
}




test=()=>{
  console.log(this.state.myFriends);
  this.state.myFriends.map(friend=>console.log(friend.username))
}

changeCurrentFriend=(friendID,friendUsername)=>{
  this.setState({
    currentFriendID:friendID,
    currentFriendUsername:friendUsername
  })

}

addList=(newListName)=>{
  this.state.listNames.push(newListName);
  this.setState({
    currentList:newListName
  })
  this.loadItems();
}



updateNewItemInput=(e)=>{
  this.setState({
    newItemText:e.target.value
  })
}


changeList=(e)=>{
  this.setState({
    currentList:e.target.innerHTML
  })
  this.loadItems(e.target.innerHTML);

}


loadCurrentListItems=()=>{

    let listItems="";
    let requestURL='http://localhost:8181/api/v1/listItems?listName='+this.state.currentList+'&userID='+this.state.userID;
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json'
    request.setRequestHeader("content-Type","application/json");
    request.onload=()=>{
      listItems=request.response;      
      this.setCurrentListItems(listItems);
      //console.log(listItems);
    }
    request.send();
}

loadMyFriends=()=>{
  let myFriends=[];
  let userID= this.state.userID;
  let requestURL='http://localhost:8181/api/v1/myFriends/'+userID;
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.setRequestHeader("content-Type","application/json");
    request.onload=()=>{
      myFriends=request.response
      console.log(myFriends)
      this.setMyFriends(myFriends);
    }
    request.send();
}

loadItems=(listName)=>{

  let listItems="";
  let requestURL='http://localhost:8181/api/v1/listItems?listName='+listName+'&userID='+this.state.userID;
  let request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json'
  request.setRequestHeader("content-Type","application/json");
  request.send();
  request.onload=()=>{
    listItems=request.response;      
    this.setCurrentListItems(listItems);
    //console.log(listItems);
  }
}

setMyFriends=(friends)=>{
  this.setState({
    myFriends:friends
  })
}

setMyFriendRequests=(friends)=>{
  this.setState({
    myFriendRequests:friends
  })
}

setCurrentListItems=(listItems)=>{
  this.setState({
    currentListItems:listItems
  });
}

setCurrentListItems=(listItems)=>{
  this.setState({
    currentListItems:listItems
  });
}

setListNames=(listNames)=>{
  this.setState({
    listNames:listNames,
    currentList:"please select or create a list"
  });
}


loadListNames=()=>{
  //console.log("one")
  let listNames="";
  let requestURL='http://localhost:8181/api/v1/listNames?userID='+this.state.userID;
  let request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.setRequestHeader("content-Type","application/json");
  request.onload=()=>{
    listNames=request.response;
    this.setListNames(listNames);
    return listNames[0];
  }    
  request.send();
}

hello=(name)=>{
  console.log("hello " +name);
}

componentDidMount = () => {
  this.loadListNames();
  this.loadCurrentListItems();
  //this.loadMyFriends();
}

changeUser=(userID, username) => {
  this.setState({
    userID:userID,
    username:username
  })
  this.loadListNames();
  this.loadCurrentListItems();
  this.loadMyFriends();
  this.loadMyFriendRequests();
}

loadMyFriendRequests=()=>{
  let myFriendRequests=[];
  let userID= this.state.userID;
  let requestURL='http://localhost:8181/api/v1/myFriendRequests/'+userID;
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.setRequestHeader("content-Type","application/json");
    request.onload=()=>{
      myFriendRequests=request.response
      console.log(myFriendRequests)
      this.setMyFriendRequests(myFriendRequests);
    }
    request.send();
}

setMode=(mode)=>{
  this.setState({
    mode:mode
  })
}


}


export default App;
