import React, { Component } from 'react';

class User extends Component{



    render(){
        return(
            <nav id="user">
                <h2 id="username">{this.props.username}</h2>
                <button type='button' id='my' onClick={this.changeMode}>my lists</button>
                <button type='button' id='friends' onClick={this.changeMode}>friend's lists</button>
                <button type='button' id='sendRequest' onClick={this.changeMode}>send request</button>
                <button type='button' onClick={this.logout}>logout</button>
                <h3>Lists:</h3>
                {this.props.listNames.map((listName,index) => <button key={listName} onClick={this.props.changeListFunction}>{listName}</button>)} 
          
            </nav>
        )
    }

    changeMode=(e)=>{
        this.props.setModeFunction(e.target.innerHTML);
    }

    logout=()=>{
        this.props.changeUserFunction(0,"0");
        this.props.setModeFunction("my Lists");

    }

}

export default User;