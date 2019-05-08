package ToDo.ToDo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import ToDo.ToDo.AllUsers;
import ToDo.ToDo.User;



public class UsersStub {
	private static Map<Long,User> users= new HashMap<Long,User>();
	
	private static int idIndex= 3;
	

	static {
		User user1= new User(1,"one","1");
		
		User user2= new User(2, "two", "2");
		
		User user3= new User(3,"three","3");
		
		
		
	}
	
	public static List<User> list(){
			return new ArrayList<User>(users.values());
		}
	
	
	
	public static User create(User user) {
		idIndex++;
		user.setUserID(idIndex);
		users.put((long) idIndex, user);
		return user;
		
	}
	
	public static User update(Long id, User user) {
		users.put(id,user);
		return user;
	}
	
	public static User delete(Long id){
		return users.remove(id);
	}
	
	

}
