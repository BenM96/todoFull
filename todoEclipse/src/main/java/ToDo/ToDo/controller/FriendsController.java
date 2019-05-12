package ToDo.ToDo.controller;

import java.util.List;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ToDo.ToDo.AllFriends;
import ToDo.ToDo.Friends;
import ToDo.ToDo.User;

@SpringBootApplication
@RestController
@RequestMapping("api/v1/")
public class FriendsController {
	
	AllFriends allFriends= new AllFriends();
	
	@RequestMapping(value="myFriends/{id}", method=RequestMethod.GET)
	public List<User> myFriends(@PathVariable Integer id){
		return allFriends.myFriends(id);
	}
	
	@RequestMapping(value="myFriendRequests/{id}", method=RequestMethod.GET)
	public List<User> myFriendRequests(@PathVariable Integer id){
		return allFriends.myFriendRequests(id);
	}
	
	@RequestMapping(value="sentFriendRequests/{id}", method=RequestMethod.GET)
	public List<User> sentFriendRequests(@PathVariable Integer id){
		return allFriends.sentFriendRequests(id);
	}
	
	@RequestMapping(value="friends", method=RequestMethod.POST)
	public boolean addFriend(@RequestParam (value="userID1") int userID1, @RequestParam (value="userID2") int userID2) {
		allFriends.addFriends(userID1,userID2);
		allFriends.commit();
		return true;
	}
	
	@RequestMapping(value="friends/confirm", method=RequestMethod.PUT)
	public Friends confirm(@RequestParam (value="userID1") int userID1, @RequestParam (value="userID2") int userID2) {
		allFriends.getFriends(userID1, userID2).confirm();
		return allFriends.getFriends(userID1, userID2);
	}

}
