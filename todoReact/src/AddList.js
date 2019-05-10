import React, { Component } from 'react';

class AddList extends Component{
    state={
        newListText:""
    }

    render(){
        return(
            <form id="addList">
                New list
                <br/>
                <input  ref="newListInput" type="text" placeholder="List Name" onChange={this.updateNewListText}/>
                <button type="button" onClick={this.addList}>add</button>
            </form>
        )
    }

    updateNewListText=(e)=>{
        //console.log(this.state.newListText)
        this.setState({
        newListText:e.target.value
        })
    }

    addList=()=>{
        let newListName=this.state.newListText;
        this.props.addListFunction(newListName);
        this.refs.newListInput.value="";
    }
}

export default AddList;