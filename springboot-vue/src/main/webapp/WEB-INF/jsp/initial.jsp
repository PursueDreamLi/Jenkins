<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户</title>
</head>
<body> 
<form action="/springboot-vue/init.action" method="post">
查询结果：
<table width="100%" border=1>
<td><input type="submit" value="查询"/></td>
<tr>
    <td>用户ID</td>
    <td>用户姓名</td>
    <td>用户年龄</td>
    <td>用户时间</td>
</tr>
<tr>
    <td>${user.id }</td>
    <td>${user.userName }</td>
    <td>${user.userAge }</td>
    <td>${user.createTime }</td> 
</tr>
</table>
</form>
</body>

</html>