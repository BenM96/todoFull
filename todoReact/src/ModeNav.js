import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class User extends Component{



    render(){
        return(
            <nav align="center" class="p-3 mb-2 bg-secondary text-white" id="user">
                <h2 id="username">{this.props.username}</h2>
                <Button type='Button' id='my' onClick={this.changeMode}>my lists</Button>
                <Button type='Button' id='friends' onClick={this.changeMode}>friend's lists</Button>
                <Button type='Button' id='sendRequest' onClick={this.changeMode}>send request</Button>
                <Button type='Button' id='sendRequest' onClick={this.changeMode}>friend requests</Button>
                <Button variant="danger" type='Button' onClick={this.logout}>logout</Button>
          
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