package ToDo.ToDo;


import java.sql.SQLException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.util.SystemPropertyUtils;


@SpringBootApplication
public class App {
	public static void main(String[] args) throws SQLException {
		DataBase d = new DataBase();
		d.build();
		d.dummyData();
		AllUsers users=new AllUsers();
		AllItems items=new AllItems();
		AllFriends allFriends= new AllFriends();
		
		
		SpringApplication.run(App.class, args);
		
//		items.addItem(1, "new", "first", 1);
//		items.commit();
		System.out.println("---end------end------end------end------end------end------end------end------end------end---");

	}

}
