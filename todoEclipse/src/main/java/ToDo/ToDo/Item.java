package ToDo.ToDo;



public class Item {
	private int itemID;
	private int userID;
	private String desc;
	private String listName;
	private boolean completed;
	
	public Item() {}
	
	public Item(int listItemID,int userID,String desc,String listName,int completed) {
		this.itemID=listItemID;
		this.userID=userID;
		this.desc=desc;
		this.listName=listName;
		if (completed==1) {
			this.completed=true;
		}else {
			this.completed=false;
		}
	}
	
	public Item(int listItemID,int userID,String desc,String listName,boolean completed) {
		this.itemID=listItemID;
		this.userID=userID;
		this.desc=desc;
		this.listName=listName;
		this.completed=completed;
	}

	public void complete() {
		this.completed=!this.completed;
	}
	
	
	
	
	
	
	
	
	public int getItemID() {
		return itemID;
	}

	public void setItemID(int listItemID) {
		this.itemID = listItemID;
	}

	public int getUserID() {
		return userID;
	}

	public void setUserID(int userID) {
		this.userID = userID;
	}

	public String getDesc() {
		return desc;
	}

	public void setdesc(String desc) {
		this.desc = desc;
	}

	public String getListName() {
		return listName;
	}

	public void setListName(String listName) {
		this.listName = listName;
	}

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}
	
	

}
