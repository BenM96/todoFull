import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class ItemTable extends Component{
    render(){
        return(
            <table  align="left"  class="table" id="currentList" cellspacing="10">
            <thread>
            <tr>
                <th scope="col" id="item">item</th>
                <th scope="col">completed</th>
            </tr>
              </thread>
              <tbody>
            {this.props.ItemList.map((item,index)=>
            <tr>
              <td scope="row">{item.desc}</td>
              <td scope="row">{item.completed.toString()}</td>
              <td scope="row"><Button id={"complete"+item.itemID} variant="success" onClick={this.complete}>complete</Button></td>
              <td scope="row"><Button id={"delete"+item.itemID} variant="danger" onClick={this.delete}>delete</Button></td>
            </tr>)}
            </tbody>
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