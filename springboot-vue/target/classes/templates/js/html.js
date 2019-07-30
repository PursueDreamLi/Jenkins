
var vue=new Vue({
	el:'#app',
	data:{
		//页面控制
		currentPage:1,
		pageSize:5,
		//弹出框控制
		editFormVisiable:false,
		id:0,
		selectFormVisiable:false,
		editForm:{
			id:0,
			userName:'',
			userAge:0,
			createTime:''
		},
		addFormVisiable:false,
		addForm:{
			id:0,
			userName:'',
			userAge:00,
			createTime:'0000-00-00'
		},
		item:{
			id: 2,
	        userName: 'lisi',
	        userAge: 20,
	        createTime: '2016-05-02'
		},
		//待显示数据
		arr:[],	
		arrTotal:[],
		
	},
	methods:{
		handleSizeChange:function(size){
			this.pageSize=size;
			console.log(this.pageSize);
			this.diaplayCurrentPage(this.pageSize,this.currentPage);
		},
		handleCurrentChange:function(currentPage){
			this.currentPage=currentPage;
			console.log(this.currentPage);
			this.diaplayCurrentPage(this.pageSize,this.currentPage);
		},
		//显示当前页数据
		diaplayCurrentPage:function(pageSize,currentPage){
			$.ajax({
				url:"http://localhost:8082/springboot-vue/selectByPage",
				type:"GET",
				dataType: "json", 
				data:{
					pageSize:pageSize,
					currentPage:currentPage,
				},
				crossDomain: true,
				success:function(databack){
					console.log(databack);
					this.arr=databack;					
					//$(this.arr).val(databack);
					
				} .bind(this),
			});
		},
		query:function(){
			/* */
			$.ajax({
				url:"http://localhost:8082/springboot-vue/selectAll",
				type:"GET",
				dataType: "json", 
				crossDomain: true,
				success:function(databack){
					console.log(databack);
					this.arr=databack;	
					this.arrTotal=databack;
					//$(this.arr).val(databack);
				} .bind(this),
			});
			
			/* 
			 this.$http.get('http://localhost:8082/springboot-vue/selectAll').then(function(res){
				 //document.write(res.body);
				 //console.log(res.body);
				 //alert(res.body);
                 this.arr=res.body;
             });
			*/
		},
	refresh:function(){
		this.query();
		this.diaplayCurrentPage(this.pageSize,this.currentPage)
	},
	select:function(){
		this.selectFormVisiable=true;
	},
	selectSubmit:function(id){
		//判断id对应数据库中的id是否有数据
		this.query();
		var flag=false;
		for(var i=0;i<this.arrTotal.length;i++){
			if(id==this.arrTotal[i].id){
				flag=true;
			}
		}
		if(flag!=true){
			alert("数据库中没有对应数据，请重新输入");
			return;
		}
		this.selectFormVisiable=false;
		$.ajax({
			url:"http://localhost:8082/springboot-vue/selectById.action",
			type:"GET",
			data:{id:id},
			dataType: "json", 
			success:function(databack){
				this.arr=[];
				this.arr.push(databack);
				this.arrTotal=[];
				this.arrTotal.push(databack);
			}.bind(this),
		});
		//this.query();
	},
	editWindow:function(index,row){
		//alert("editFormVisiable="+this.editFormVisiable);
		this.editFormVisiable=true;
		//alert("editFormVisiable="+this.editFormVisiable);
		this.editForm=Object.assign({},row);
		//console.log(this.editForm);
	},
	editSubmit:function(row){
		//var id = row.id;
		//console.log(row);
		this.editFormVisiable=false;
		//alert("id="+id);
		$.ajax({
			url:"http://localhost:8082/springboot-vue/updateUser.action",
			type:"POST",
			data:{
				id: row.id,
		        userName: row.userName,
		        userAge: row.userAge,
		        createTime: row.createTime,
			},
			cache:false,
			dataType: "text",
			crossDomain: false,
			//timeout:30,
//			complete:function(){
//				alert("complete");
//			},
			success:function(){
//				alert("edit success!");
				console.log("success!");
			} .bind(this),
			error:function(){
				console.log("error!");
			}.bind(this),
		});		
		this.diaplayCurrentPage(this.pageSize,this.currentPage);
	},
	add:function(){
		this.addFormVisiable=true;
	},
	addSubmit:function(row){		
		this.query();
		//判断是否重复插入
		for(var i=0;i<this.arrTotal.length;i++){
			if(this.arrTotal[i].id==row.id){
				alert("重复的编号,请重新输入");
				return;
			}
		}
		//this.arr.push(row);
		$.ajax({
			url:"http://localhost:8082/springboot-vue/addUser.action",
			type:"POST",
			data:{
				id: row.id,
		        userName: row.userName,
		        userAge: row.userAge,
		        createTime: row.createTime
			},
			dataType: "text", 
			crossDomain: true,
			success:function(){
				console.log("add success!");
			} .bind(this),
			error:function(){
				console.log("add error!");
			}.bind(this),
		});
		this.addFormVisiable=false;
		this.diaplayCurrentPage(this.pageSize,this.currentPage);	
		//this.arr.push(row)
	},
	delConfirm:function(index,row,arr){
		if(confirm("确定删除？")==true){
			this.del(index,row,arr);
		}
	},
	del:function(index,row,arr){
		var id = row.id;
		//arr.splice(index, 1);//删除行		
		console.log(id);
		$.ajax({
			url:"http://localhost:8082/springboot-vue/deleteUserById.action",
			type:"POST",
			//data 发送到服务器的数据。将自动转换为请求字符串格式
			data:{id:id},
			dataType: "text", 
			crossDomain: true,
			success:function(){
				console.log("delete success!");
			} .bind(this),
			error:function(){
				console.log("delete error!");
			}.bind(this),
		});
		this.diaplayCurrentPage(this.pageSize,this.currentPage);
	}	
  }
});
$(function(){
	$.ajax({
		url:"http://localhost:8082/springboot-vue/selectAll",
		type:"GET",
		dataType: "json", 
		crossDomain: true,
		success:function(databack){
			//alert(databack);
			console.log(databack);
			//var newData = JSON.parse(databack);
			vue.arr=databack;
			vue.arrTotal=databack;
			vue.handleSizeChange(vue.pageSize);
			vue.handleCurrentChange(vue.currentPage);
		} .bind(this),
	});
})