import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class SelectList extends Component{



    render(){
        return(
            <nav id="user">
                <h3>Lists:</h3>
                {this.props.listNames.map((listName,index) => <Button key={listName} onClick={this.props.changeListFunction}>{listName}</Button>)} 
          
            </nav>
        )
    }


}

export default SelectList;