package byr.dao;


import org.apache.ibatis.annotations.Mapper;

import byr.pojo.User;
@Mapper
public interface UserMapperFeedBack {	

	public void addUser1(User user);
}
