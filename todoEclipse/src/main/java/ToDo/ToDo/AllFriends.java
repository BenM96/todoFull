package ToDo.ToDo;

import java.sql.SQLException;
import java.util.ArrayList;

public class AllFriends {
	private ArrayList<Friends> allFriends =new  ArrayList<Friends>();
	
	public AllFriends() {
		DataBase d = new DataBase();
		try {
			this.allFriends=d.loadFriends();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public ArrayList<User> myFriends(int userID){
		AllUsers users=new AllUsers();
		ArrayList<User> myFriends= new ArrayList<User>();
		for(Friends friends : this.allFriends) {
			if(friends.getUserID1()==userID) {
				myFriends.add(users.getUser(friends.getUserID2()));
			}
			if(friends.getUserID2()==userID) {
				myFriends.add(users.getUser(friends.getUserID1()));
			}
		}
		return myFriends;
	}


	public void setAllFriends(ArrayList<Friends> allFriends) {
		this.allFriends = allFriends;
	}
	
	
	public ArrayList<Friends> getAllFriends() {
		return allFriends;
	}

}
