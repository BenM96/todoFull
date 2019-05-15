import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

class ItemTable extends Component{
    render(){
        return(
            <Table  align="left"  class="table" id="currentList" cellspacing="10">
            <thread>
            <tr>
                <th  id="item">item</th>
                <th >completed</th>
                <th/>
                <th/>
                
            </tr>
              </thread>
              <tbody>
            {this.props.ItemList.map((item,index)=>
            <tr>
              <td >{item.desc}</td>
              <td >{item.completed.toString()}</td>
              <td ><Button id={"complete"+item.itemID} variant="success" onClick={this.complete}>complete</Button></td>
              <td ><Button id={"delete"+item.itemID} variant="danger" onClick={this.delete}>delete</Button></td>
            </tr>)}
            </tbody>
        </Table>
        )
    }

    complete=(e)=>{
        let itemID=e.target.id.substring(8);
        let requestURL=this.props.API+'/api/v1/complete/'+itemID;
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
        let requestURL=this.props.API+'/api/v1/item/'+itemID;
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