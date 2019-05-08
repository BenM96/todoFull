package ToDo.ToDo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/database/")
public class DataBaseController {
	
	@RequestMapping("commit")
	public void commit() {
		
	}
		
}
