package ToDo.ToDo;



import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class DataBase {
	
	public final String DB_URL="jdbc:mysql://mysql:3306/todo";
	public final String USER = "root";
	public final String PASS = "pass";
	private Connection conn= null;
	private Statement stmt=null;
	
	public void build() throws SQLException {
		DriverManager.setLoginTimeout(15);
		conn=DriverManager.getConnection(DB_URL,USER,PASS);
		stmt=conn.createStatement();
		stmt.executeUpdate("CREATE database if not exists todo");
		stmt.executeUpdate("use todo");
		stmt.executeUpdate("drop table if exists list_items;");
		stmt.executeUpdate("drop table if exists users;");
		stmt.executeUpdate("drop table if exists friends;");
		stmt.executeUpdate("create table users(user_id int, username varchar(20) not null unique, password varchar(20) not null,primary key(user_id));");
		stmt.executeUpdate("create table list_items(item_id int, user_id int, list_item varchar(100),list_name varchar(50),completed tinyint, primary key(item_id), foreign key(user_id) references users(user_id));");
		stmt.executeUpdate("create table friends(userID1 int, userID2 int, friends tinyint);");
		stmt.close();
	}
	
	public void deleteListItems() throws SQLException {
		conn=DriverManager.getConnection(DB_URL,USER,PASS);
		stmt=conn.createStatement();
		stmt.executeUpdate("delete from list_items");
	}

	public void saveUser(int userID,String username,String password) throws SQLException{
		conn=DriverManager.getConnection(DB_URL,USER,PASS);
		stmt=conn.createStatement();
		stmt.executeUpdate("insert into users(user_id,username,password) values("+userID+",'"+username+"','"+password+"');");
		stmt.close();
	}
	
	public void saveUser(User user) throws SQLException {
		saveUser(user.getUserID(), user.getUsername(),user.getPassword());
	}	
		
	public void saveItem(int itemID, int userID,String desc,String listName, boolean completed) throws SQLException {
		conn=DriverManager.getConnection(DB_URL,USER,PASS);
		stmt=conn.createStatement();
		int completed10=0;
		if(completed) {
			completed10=1;
		}
		
		stmt.executeUpdate("insert into list_items(item_id, user_id,list_item,list_name,completed) values("+itemID+",'"+userID+"','"+desc+"','"+listName+"',"+completed10+");");
		stmt.close();
		
	}
	
	public void saveFriends(int userID1, int userID2, int friends) throws SQLException {
		conn=DriverManager.getConnection(DB_URL,USER,PASS);
		stmt=conn.createStatement();
		stmt.executeUpdate("insert into friends(userID1, userID2, friends) values ("+userID1+","+userID2+","+friends+");");
		stmt.close();
	}
	
	public void saveFriends(Friends friends) throws SQLException {
		int friendsInt;
		if(friends.isFriends()) {
			friendsInt=1;
		}else {
			friendsInt=0;
		}
		saveFriends(friends.getUserID1(), friends.getUserID2(), friendsInt);
	}
		
	public void saveItem(Item item) throws SQLException {
		saveItem(item.getItemID(),item.getUserID(),item.getDesc(),item.getListName(),item.isCompleted());
	}
	
	public ArrayList<User> loadUsers() throws SQLException{
		conn=DriverManager.getConnection(DB_URL,USER,PASS);
		stmt=conn.createStatement();
		ResultSet rs= stmt.executeQuery("select * from users");
		ArrayList<User> users=new ArrayList<User>();
		while(rs.next()) {
			int userID=rs.getInt("user_id");
			String username=rs.getString("username");
			String password=rs.getString("password");
			User nextUser= new User(userID,username,password);
			users.add(nextUser);
		}		
		stmt.close();
		return users;
	}
	
	public ArrayList<Friends> loadFriends() throws SQLException{
		conn=DriverManager.getConnection(DB_URL,USER,PASS);
		stmt=conn.createStatement();
		ResultSet rs=stmt.executeQuery("select * from friends");
		ArrayList<Friends> allFriends= new ArrayList<Friends>();
		while(rs.next()) {
			int userID1 =rs.getInt("userID1");
			int userID2 = rs.getInt("userID2");
			int friends= rs.getInt("friends");
			Friends newFriends=new Friends(userID1,userID2,friends);
			allFriends.add(newFriends);
		}
		return allFriends;
	}
	
	public ArrayList<Item> loadItems() throws SQLException{
		conn=DriverManager.getConnection(DB_URL,USER,PASS);
		stmt=conn.createStatement();
		ResultSet rs=stmt.executeQuery("select * from list_items");
		ArrayList<Item> items= new ArrayList<Item>();
		while(rs.next()) {
			int listItemID=rs.getInt("item_id");
			int userID=rs.getInt("user_id");
			String Item=rs.getString("list_Item");
			String listName=rs.getString("list_name");
			int completed=rs.getInt("completed");
			Item nextItem=new Item(listItemID,userID,Item,listName,completed);
			items.add(nextItem);
		}
		stmt.close();
		return items;
	}


		
	public void dummyData() throws SQLException {
		saveUser(1,"archer", "guest");
		saveUser(2,"bilbo","time");
		saveUser(3,"frodo","sam");
		saveUser(4,"sam","frodo");
		saveItem(1,1,"drink sum","first",false);
		saveItem(2,1,"drink more","first",false);
		saveItem(3,1,"heist","first",false);
		saveItem(4,2,"help dwarfs","the hobbit",false);
		saveItem(5,2,"kill dragon","the hobbit",false);
		saveItem(6,2,"give ring to frodo","lotr",false);
		saveItem(7,2,"celibrate bday","lotr",false);
		saveItem(8,2,"get old","lotr",false);
		saveItem(9,3,"bilbo nagging","bilbo",false);
		saveFriends(2,3,1);
		saveFriends(4,2,0);
	}



}
