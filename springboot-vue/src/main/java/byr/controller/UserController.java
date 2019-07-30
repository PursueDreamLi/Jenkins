package byr.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import byr.pojo.User;
import byr.service.UserService;
import net.sf.json.JSONArray;


@Controller
@EnableAutoConfiguration 
@ComponentScan
public class UserController {
	@Resource
	private UserService userService;
	
	@RequestMapping(value="/selectAll",method=RequestMethod.GET)
	@ResponseBody
	public Object selectAll(){
		List<User> list=userService.selectAll();
		JSONArray jsonArray = JSONArray.fromObject(list);
		return jsonArray;
	}
	@RequestMapping(value="/selectById",method=RequestMethod.GET)
	@ResponseBody
	public User selectById(HttpServletRequest request) {
		String strID=request.getParameter("id");
		Integer id=null;
    	if(strID!=null && !"".equals(strID)) {
    		id=Integer.parseInt(strID);
    	}
    	else {
    		return null;
    	}
    	User user=userService.selectById(id);
		return user;
	}
	@RequestMapping(value="/selectByPage",method=RequestMethod.GET)
	@ResponseBody
	public List<User> selectByPage(HttpServletRequest request) {
		String pageSizeStr=request.getParameter("pageSize");
		String currentPageStr=request.getParameter("currentPage");
		Integer pageSize=null;
		Integer currentPage=null;
		if(pageSizeStr!=null && !"".equals(pageSizeStr) && currentPageStr!=null && !"".equals(currentPageStr)) {
			pageSize=Integer.parseInt(pageSizeStr);
			currentPage=Integer.parseInt(currentPageStr);
		}
		else {
			return null;
		}
		List<User> list=userService.selectByPage((currentPage-1)*pageSize,pageSize);
		//JSONArray jsonArray = JSONArray.fromObject(list);
		return list;
	}
	@RequestMapping(value="/addUser",method=RequestMethod.POST)
	@ResponseBody
	public String addUser(User user) {
		userService.addUser(user);
		return "";
	}
	@RequestMapping(value="/deleteUserById",method=RequestMethod.POST)
	@ResponseBody
	public String deleteUserById(HttpServletRequest request) {
		String strID=request.getParameter("id");
		Integer id=null;
    	if(strID!=null && !"".equals(strID)) {
    		id=Integer.parseInt(strID);
    	}
    	else {
    		return "";
    	}
		userService.deleteUserById(id);
		return "";
	}
	@RequestMapping(value="/updateUser",method=RequestMethod.POST)
	@ResponseBody
	public String updateUser(User user,HttpServletRequest request) {
		//String strID=request.getParameter("id");
		//System.out.println("id="+strID);
		userService.updateUser(user);		
		return "";
	}
	@RequestMapping("/init")
	public String initial(HttpServletRequest request) {
		User user=(User)userService.selectById(1);
		//System.out.println(user.getCreateTime());
		request.setAttribute("user", user);
		return "initial";
	}
}
