import React, { Component } from 'react';

class ItemTable extends Component{
    render(){
        return(
            <table id="currentList" cellspacing="10">
            <tr>
                <th id="item">item</th>
                <th >completed</th>
            </tr>
            {this.props.ItemList.map((item,index)=>
            <tr>
              <td>{item.desc}</td>
              <td>{item.completed.toString()}</td>
              <td><button id={"complete"+item.itemID} onClick={this.complete}>complete</button></td>
              <td><button id={"delete"+item.itemID} onClick={this.delete}>delete</button></td>
            </tr>)}

        </table>
        )
    }

    complete=(e)=>{
        let itemID=e.target.id.substring(8);
        let requestURL='http://35.246.119.78:8181/api/v1/complete/'+itemID;
        let request = new XMLHttpRequest();
        request.open('PUT', requestURL);
        request.responseType = 'json';
        request.setRequestHeader("Accept","application/json");
        request.setRequestHeader("Content-Type","application/json");
        request.onload=()=>{
          this.props.loadListItemsFunction();
        }
        request.send();
      }


      delete=(e)=>{
        let itemID= e.target.id.substring(6);
        //console.log(itemID);
        let requestURL='http://35.246.119.78:8181/api/v1/item/'+itemID;
        let request = new XMLHttpRequest();
        request.open('DELETE', requestURL);
        request.responseType = 'json';
        request.setRequestHeader("Accept","application/json");
        request.setRequestHeader("Content-Type","application/json");
        request.onload=()=>{
          this.props.loadListItemsFunction();
        }
        request.send()
      }


}

export default ItemTable;