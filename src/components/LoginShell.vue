<template>
    <div class="shell">
       <div class="left-box"></div>
       <div class="right-box">
           <div class="content">
               <h1>登录</h1>
               <input type="text" class="input" placeholder="请输入学号/学工号">
               <input type="password" class="input" placeholder="请输入密码">
               <p class="f">上网不涉密，涉密不上网</p>
               <router-link to= "Main" class="g">Login</router-link>
           </div>
       </div>
   </div>
 </template>
 <style>
.shell{
    
    position:absolute;
    top: 0px;
    right: 0px;
    left: 0px;
    bottom: 0px;
    margin: auto;
    width: 1100px;
    height: 550px;
    box-shadow: 0 5px 15px rgba(0,0,0,.8);
    display: flex;
}
.left-box{
    width: 550px;
    height: 550px;
    background-image: url("../assets/pic.jpg");
    /* 让图片适应大小 */
    background-size: cover;
}
.right-box{
    width: 550px;
    height: 550px;
    background-color: white;
    display: flex;
    align-items: center;
}
.content{
    margin-left: 50%;
    transform: translate(-50%,0);
    width: 400px;
    height: 424px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0px 6px 6px 0px rgba(104,79,18,0.15); 
}
.content h1{
    width: 100%;
    height: 71px;
    background: #ffffff;
    border-radius: 12px 12px 0px 0px;
    box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.15); 
    font: 900 30px '';
    padding-left: 25px;
    padding-top: 15px;
    color: darkgray;
}
.input{
    margin-left: 50%;
    transform: translate(-50%,0);
    margin-right: 50px;
    padding-left: 30px;
    margin-top: 50px;
    margin-bottom: -20px;
    width: 350px;
    height: 62px;
    background: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
}

.f{
    margin-top: 30px;
    text-align: center;
    color: darkgrey;
}
.g{
    margin-top: 30px;
    color: #ffffff;
    left: 50%;
    transform: translate(50%,0);
    text-align: center;
    display: block;
    width: 200px;
    height: 60px;
    font: 900 25px '';
    text-decoration: none;
    line-height: 55px;
    border-radius: 30px;
    background-image: linear-gradient(to left,
    #9c88ff,#3cadeb);
}
</style>