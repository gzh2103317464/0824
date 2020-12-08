<template>
<div class='wrap'>
    <div class="box">
       <div class="tou"><h2>登录</h2></div> 
      <div class="inp"><input type="text" placeholder="请输入用户名"></div> 
       <div class="inp"><input type="text" placeholder="请输入密码"></div> 
       <div class="inp"><button>登录</button></div>
    </div>
</div>
</template>

<script>

export default {
components: {

},
data() {
return {

};
},
methods: {

},
mounted() {

},
computed: {

},
watch: {},
}
</script>
<style>
.wrap{
    width: 100vw;
    height: 100vh;
    background:linear-gradient(to right , #563444, #2f3d60)
}
.box{
    width: 400px;
    height: 300px;
    background-color: #fff;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50% , -50%);
    border-radius: 15px;
    text-align: center;
}
.tou{
    padding-top: 10px;
}
.inp{
    width: 60%;
    height: 30px;
    margin: 20px auto;
    
}
.inp input{
    width: 100%;
    height: 25px;
    border:1px solid  #ccc;
    /* outline: none; */
    
}
.inp button{
    width: 105%;
    height: 30px;
    background-color: #409eff;
    outline: none;
    border: none;
    color: #fff;
    
}
</style>