package ToDo.ToDo.controller;

import java.sql.SQLException;
import java.util.List;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ToDo.ToDo.AllItems;
import ToDo.ToDo.Item;

@SpringBootApplication
@RestController
@RequestMapping("api/v1/")
public class ItemController {
	
	AllItems items= new AllItems();	
	
	@RequestMapping(value="items", method=RequestMethod.GET)	
	public List<Item> allItems() throws SQLException{
		return items.getItems();
	}
	
		
	
	@RequestMapping(value = "items", method = RequestMethod.POST)
    public Item create(@RequestBody Item item){
		items.addItem(item.getUserID(), item.getDesc(), item.getListName(), false);;
		items.commit();
        return items.getItem(items.getItemID(item.getUserID(), item.getListName(), item.getDesc()));
    }
	
	@RequestMapping(value="listNames", method= RequestMethod.GET)
	public List<String> listNames(@RequestParam (value="userID") int userID){
		return items.getListNames(userID);
	}
	
	@RequestMapping(value="listItems", method= RequestMethod.GET)
	public List<Item> listItems(@RequestParam (value="listName") String listName,@RequestParam (value="userID") int userID){
		return items.getListItems(userID, listName);
	}
	

	

	@RequestMapping(value = "items", method = RequestMethod.PUT)
    public Item update(@RequestBody Item item){
		items.editItem(item);
		items.commit();
		return item;        
    }
	
	@RequestMapping(value ="complete/{id}", method=RequestMethod.PUT)
	public Item complete(@PathVariable Integer id) {
		Item item=items.getItem(id);
		item.complete();
		return item;
	}
	
	@RequestMapping(value = "item/{id}", method = RequestMethod.DELETE)
    public Item delete(@PathVariable Integer id){		
		Item item=items.getItem(id);
        items.removeItem(id);
        items.commit();
        return item;       
    }


	
}
