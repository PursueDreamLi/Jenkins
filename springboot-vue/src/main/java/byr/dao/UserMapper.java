package byr.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

import byr.pojo.User;

@Mapper
public interface UserMapper {
	public List<User> selectAll();
	
	public User selectById(int id);
	
	public void addUser(User user);
	
	public void deleteUserById(int id);
	
	public void updateUser(User user);

	public List<User> selectByPage(@Param("beginIndex")int beginIndex, @Param("endIndex")int endIndex);


}
