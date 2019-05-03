package ToDo.ToDo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ToDo.ToDo.AllFriends;
import ToDo.ToDo.User;

@RestController
@RequestMapping("api/v1/")
public class FriendsController {
	
	AllFriends allFriends= new AllFriends();
	
	@RequestMapping(value="myFriends/{id}", method=RequestMethod.GET)
	public List<User> myFriends(@PathVariable Integer id){
		return allFriends.myFriends(id);
	}

}
