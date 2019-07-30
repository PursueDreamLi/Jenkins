<template>
    <div>
        <h1>新增</h1>
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
        <button @click="addData">确定</button>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            name: '',
            age: '',
            address: ''
        };
    },
    methods: {
        addData() {
            axios({
                method:'post',
                url: 'http://localhost:8080/user/addUser',
                data: "&name=" + this.name + "&age=" + this.age + "&address=" + this.address
            })
            .then(response => {
                console.log(response)
                this.$router.push({path : "/"})
            }).catch(error => {
                console.log(error)
            })
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
tr {
    border: 1px solid #000;
}
</style>
