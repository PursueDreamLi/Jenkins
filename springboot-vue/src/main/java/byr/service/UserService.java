package byr.service;

import java.util.List;

import byr.pojo.User;

public interface UserService {
	public List<User> selectAll();
	
	public User selectById(int id);
	
	public void addUser(User user);
	
	public void deleteUserById(int id);
	
	public void updateUser(User user);

	public List<User> selectByPage(int beginIndex, int endIndex);
}
