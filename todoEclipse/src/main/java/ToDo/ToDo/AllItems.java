package ToDo.ToDo;

import java.sql.SQLException;
import java.util.ArrayList;

public class AllItems {
	
	private ArrayList<Item> items= new ArrayList<Item>();
	
	
	public AllItems()  {
		DataBase d= new DataBase();
		try {
			this.items=d.loadItems();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	
	public void editItem(Item item) {
		int id = item.getItemID();
		int index= items.indexOf(getItem(id));
		this.items.set(index, item);
		
	}
	
	
	public int generateID() {
		int id=0;
		while(true) {
			id++;
			boolean unique= true;
			for(Item item: items) {
				if (item.getItemID()==id) {
					unique=false;
					break;
				}				
			}
			if (unique) {
				return id;
			}
		}
	}

	public ArrayList<Item> getListItems(int userID, String listName){
		ArrayList<Item> listItems=new ArrayList<Item>();
		
		for(Item item : items) {
			if (item.getListName().equals(listName) && item.getUserID()==userID) {
				listItems.add(item);
			}
		}
		
		return listItems;
		
	}
	
	public Item getItem(int itemID) {
		for(Item item : items) {
			if(item.getItemID()==itemID) {
				return item;
			}
		}
		return null;
	}
	
	public ArrayList<Item> getItems() {
		return this.items;
		
	}
	
	public void addItem(int userID,String desc,String listName,boolean completed) {
		int listItemID = generateID();
		Item newItem= new Item(listItemID,userID,desc,listName,completed);
		items.add(newItem);
	}
	
	public void addItem(int userID,String desc,String listName,int completed) {
		boolean completed1= false;
		if(completed==1) {
			completed1=true;
		}
		addItem(userID,desc,listName,completed1);
	}
	
	
	public void removeItem(int itemID) {
		for(Item item :items) {
			
			if(item.getItemID()==itemID) {				
				items.remove(item);
				return;

			}
		}
	}
	
	public int getItemID(int userID,String listName, String desc) {
		for(Item item :items) {
			if(item.getUserID()==userID & item.getListName().equals(listName) & item.getDesc().equals(desc)) {
				return item.getItemID();
			}
		}
		return 0;
	}

	public void commit() {
		DataBase d= new DataBase();
//		try {
//			d.deleteListItems();
//		} catch (Exception e) {
//			
//		}
		for(Item item:this.items) {
			try {
				d.saveItem(item);				
			} catch (Exception e){
				continue;
			}
		}
	}

	public ArrayList<String> getListNames(int userID) {
		ArrayList<String> listNames= new ArrayList();
		for(Item item :items) {
			String listName=item.getListName();
			if(item.getUserID()==userID) {
				if(!listNames.contains(listName)) {
					listNames.add(listName);
				}
			}
		}
		return listNames;
	}
	
}
