package ToDo.ToDo;

import java.sql.SQLException;

public class Friends {
	
	private int userID1;
	private int userID2;
	private boolean friends;
	
	public Friends(int userID1, int userID2, int friendsInt) {
		if(friendsInt==1) {
			this.friends=true;
		}else {
			this.friends=false;
		}
		this.userID1=userID1;
		this.userID2=userID2;
	}
	
	public void confirm() {
		this.friends=true;
	}
	
	public void saveFriends(){
		int friendsInt;
		if(this.friends) {
			friendsInt=1;
		}else {
			friendsInt=0;
		}
				
		DataBase d= new DataBase();		
		try {
			d.saveFriends(this.userID1, this.userID2, friendsInt);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	
	public int getUserID1() {
		return userID1;
	}
	public void setUserID1(int userID1) {
		this.userID1 = userID1;
	}
	public int getUserID2() {
		return userID2;
	}
	public void setUserID2(int userID2) {
		this.userID2 = userID2;
	}
	public boolean isFriends() {
		return friends;
	}
	public void setFriends(boolean friends) {
		this.friends = friends;
	}

}
