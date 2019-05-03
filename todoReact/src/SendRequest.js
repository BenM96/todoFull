import React, { Component } from 'react';


class SendRequest extends Comment{
    render(){
        return(
            <div>
                <h3>send friend request</h3>
                <input type='text' placeholder='username'>username</input>
                <button type='button'>send</button>

            </div>
        )
    }

}

export default  SendRequest;