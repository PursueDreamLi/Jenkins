<template>
    <div>
        <h1>编辑</h1>
        <hr>
        <label>
            <span>name:</span>
            <input type="text" v-model="name">
        </label>
        <br>
        <label>
            <span>age:</span>
            <input type="number" v-model="age">
        </label>
        <br>
        <label>
            <span>address:</span>
            <input type="text" v-model="address">
        </label>
        <br>
        <button @click="editData">确定</button>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            name: "",
            age: "",
            address: ""
        };
    },
    methods: {
        getData() {
            axios
                .get("http://localhost:8080/user/selectUserById", {
                    params: {
                        id: this.$route.query.id
                    }
                })
                .then(response => {
                    this.name = response.data.name;
                    this.age = response.data.age;
                    this.address = response.data.address;
                    console.log(response);
                })
                .catch(error => {
                    console.log(errror);
                });
        },
        editData(){
            axios({
                method:'post',
                url: 'http://localhost:8080/user/updateUser',
                data: "&id=" + this.$route.query.id + "&name=" + this.name + "&age=" + this.age + "&address=" + this.address
            })
            .then(response => {
                console.log(response)
                this.$router.push({path : "/"})
            }).catch(error => {
                console.log(error)
            })
        }
    },
    created() {
        this.getData();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
