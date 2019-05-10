package ToDo.ToDo.controller;

import java.sql.SQLException;
import java.util.List;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ToDo.ToDo.AllUsers;
import ToDo.ToDo.User;

@SpringBootApplication
@RestController
@RequestMapping("api/v1/")
public class UserController {
	
	AllUsers users= new AllUsers();	
	
	@RequestMapping(value="users", method=RequestMethod.GET)
	public List<User> list() throws SQLException{
		return users.getUsers();
	}
	
	
	@RequestMapping(value = "users", method = RequestMethod.POST)
    public User create(@RequestBody User user){
		users.newUser(user.getUsername(),user.getPassword());
		users.commit();
        return users.getUser(users.getID(user.getUsername()));
    }


	@RequestMapping(value = "users", method = RequestMethod.PUT)
    public User update(@RequestBody User user){
		users.editUser(user);
		users.commit();
		return user;
        
    }
	
	@RequestMapping(value = "user/{id}", method = RequestMethod.DELETE)
    public User delete(@PathVariable Integer id){		
		User user=users.getUser(id);
        users.removeUser(id);
        users.commit();
        return user;
       
    }
	
	


	
}
