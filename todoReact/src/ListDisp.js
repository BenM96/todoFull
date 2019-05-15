import React, { Component } from 'react';
import ItemTable from './ItemTable.js';

class ListDisp extends Component{

    state={
        addItemText:""
    }

    componentDidMount = () => {
        //console.log("hello lists");
      }

    render(){
        return(
            <div>

            <h2 id="currentListName">{this.props.currentList}</h2>


        <form id="addItem">
            Add Item <br/>
            <input ref="newItemInput" id="newItemInput" type="text" placeholder="new item" onChange={this.updateAddItemText}/>
            <button type="button"onClick={this.addItem}>add</button>
        </form>

      <ItemTable API={this.props.API} loadListItemsFunction={this.props.loadListItemsFunction} ItemList={this.props.currentListItems} />

        <br/><br/>
        {this.props.showDel?<button id="deleteCurrentList" onClick={this.deleteCurrentList}>Delete List!</button>:<p></p>}





        <script src="main.js"></script>
    </div>
        );
    }

    updateAddItemText=(e)=>{
        this.setState({
            addItemText:e.target.value
        })
        //console.log(this.state.addItemText)
    }

    addItem=()=>{
      //console.log(this.props.currentList)
        let newItem={
          "userID":this.props.userID,
          "desc":this.state.addItemText,
          "listName":this.props.currentList
        }
        let requestURL=this.props.API+'/api/v1/items';
        let request = new XMLHttpRequest();
        request.open('POST', requestURL);
        request.responseType = 'json';
        request.setRequestHeader("Accept","application/json");
        request.setRequestHeader("Content-Type","application/json");
        request.onload=()=>{
            this.props.loadListItemsFunction();
            console.log(newItem);
            this.refs.newItemInput.value="";
        }
        request.send(JSON.stringify(newItem));
        
        console.log(newItem);
      }


    test=()=>{
        console.log("a")
    }

    
    

      

      deleteCurrentList=()=>{
        let items=this.props.currentListItems
        for (let item of items){
          let itemID= item.itemID;
          console.log(itemID);
          let requestURL=this.props.API+'/api/v1/item/'+itemID;
          let request = new XMLHttpRequest();
          request.open('DELETE', requestURL);
          request.responseType = 'json';
          request.setRequestHeader("Accept","application/json");
          request.setRequestHeader("Content-Type","application/json");
          request.onload=()=>{
            this.props.loadListNamesFunction();
            this.props.loadListItemsFunction();
          }
          request.send()
        }
      }
}


export default ListDisp;