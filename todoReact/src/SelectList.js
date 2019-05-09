import React, { Component } from 'react';

class SelectList extends Component{



    render(){
        return(
            <nav id="user">
                <h3>Lists:</h3>
                {this.props.listNames.map((listName,index) => <button key={listName} onClick={this.props.changeListFunction}>{listName}</button>)} 
          
            </nav>
        )
    }


}

export default SelectList;