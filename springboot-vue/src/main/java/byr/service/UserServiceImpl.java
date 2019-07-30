package byr.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import byr.dao.UserMapper;
import byr.dao.UserMapperFeedBack;
import byr.pojo.User;

@Service
public class UserServiceImpl implements UserService {

	@Resource
	private UserMapper userMapper;
	@Resource
	private UserMapperFeedBack userMapperFeedBack;
	public List<User> selectAll() {
		return userMapper.selectAll();
	}

	public User selectById(int id) {
		return userMapper.selectById(id);
	}

	public void addUser(User user) {
		userMapper.addUser(user);
		userMapperFeedBack.addUser1(user);
	}

	public void deleteUserById(int id) {
		userMapper.deleteUserById(id);
	}

	public void updateUser(User user) {
		userMapper.updateUser(user);
	}

	public List<User> selectByPage(int beginIndex, int endIndex) {		
		return userMapper.selectByPage(beginIndex,endIndex);
	}

}
