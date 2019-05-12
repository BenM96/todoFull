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
			if(friends.getUserID1()==userID & friends.isFriends()) {
				myFriends.add(users.getUser(friends.getUserID2()));
			}
			if(friends.getUserID2()==userID & friends.isFriends()) {
				myFriends.add(users.getUser(friends.getUserID1()));
			}
		}
		return myFriends;
	}
	
	public ArrayList<User> myFriendRequests(int userID){
		AllUsers users=new AllUsers();
		ArrayList<User> myFriendRequests= new ArrayList<User>();
		for(Friends friends : this.allFriends) {
			if(friends.getUserID2()==userID & !friends.isFriends()) {
				myFriendRequests.add(users.getUser(friends.getUserID1()));
			}
		}
		return myFriendRequests;
	}
	
	public ArrayList<User> sentFriendRequests(int userID){
		AllUsers users=new AllUsers();
		ArrayList<User> myFriendRequests= new ArrayList<User>();
		for(Friends friends : this.allFriends) {
			if(friends.getUserID1()==userID & !friends.isFriends()) {
				myFriendRequests.add(users.getUser(friends.getUserID2()));
			}
		}
		return myFriendRequests;
	}

	
	public void addFriends(int userID1, int userID2) {
		Friends newFriends= new Friends(userID1, userID2, 0);
		allFriends.add(newFriends);
	}
	
	
	public void commit() {
		DataBase d= new DataBase();
		
		for (Friends friends : this.allFriends) {
			try {
				d.saveFriends(friends);
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}


	
	public void setAllFriends(ArrayList<Friends> allFriends) {
		this.allFriends = allFriends;
	}
	
	public Friends getFriends(int userID1, int userID2) {
		for (Friends friends : this.allFriends) {
			if(friends.getUserID1()==userID1 & friends.getUserID2()==userID2) {
				return friends;
			}
		}
		return null;
	}
	
	public ArrayList<Friends> getAllFriends() {
		return allFriends;
	}

}
