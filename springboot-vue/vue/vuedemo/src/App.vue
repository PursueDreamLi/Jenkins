<!--
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
-->
<template>
  <div>
    <h1>springBoot+mysql+vue</h1>
    <router-link to="/add">新增</router-link>
    <table>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>age</th>
        <th>address</th>
        <th>编辑</th>
        <th>删除</th>
      </tr>
      <tr v-for="item in userData" :key="item.id">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.age}}</td>
        <td>{{item.address}}</td>
        <td>
          <router-link :to="{ path: '/edit', query: {id: item.id} }">编辑</router-link>
        </td>
        <td @click="deleted(item.id)">删除</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            userData: " "
        };
    },
    methods: {
        getData() {
            axios
                .get("http://localhost:8082/spring-vue/selectAll")
                .then(response => {
                    this.userData = response.data;
                    console.log(response);
                })
                .catch(error => {
                    console.log(errror);
                });
        },
        deleted(id) {
            var deleteConfirm = confirm("是否删除");
            if (deleteConfirm) {
                axios({
                    method: "post",
                    url: "http://localhost:8082/user/deleteUserById",
                    data: "&id=" + id
                })
                    .then(response => {
                        console.log(response);
                        this.getData();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    },
    created() {
        this.getData();
    }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
    border-collapse: collapse;
}
td,
th {
    border: 1px solid #000;
}
</style>

