<template>
	 <div class="swiper">
        <img class="left_coin"  onclick="flag=false;">
        <div id="category">
            <ul>
                <li><a href="#">新闻公告</a></li>
                <li><a href="https://hb.qq.com/a/20190619/004219.htm">京东发布年中购物节成绩单</a></li>
                <li><a href="#">美妆美容大促销</a></li>
                <li><a href="#">游戏设备精品系选</a></li>
                <li><a href="#">数码影音大风暴</a></li>
                <li><a href="#">手机配件以及移动电源</a></li>
                <li><a href="#">移动储存时代变革</a></li>
                <li><a href="#">其他生活周边</a></li>
            
            </ul>
        </div>
        <img id="mid" src="/static/banner1.jpg" >
        <img class="right_coin"  onclick="flag=true;">
    </div>
</template>
<style>
.swiper{
    width: 100%;
    heigth:400px;
    position: relative;
}
.left_coin{
	 position: absolute;
	 top:220px;
	 left:10px;
    background-color: aqua;
    opacity:0.1;
    width:30px;
    height:40px;
    display: inline-block;
    cursor: pointer;

}
#category{
    background-color: rgba(0,0,0,.5);
    position: absolute;
    top: 20px;
    left: 4%;
    bottom: 10px;
    width: 303px;
    z-index: 10;
    height: 450px;
    margin:2px 0;
    
}
#category ul{
    list-style: none;
    margin: 0px;
    padding: 0px;
}

#category li{
    display:block;
    width:300px;
    height:50px;
    line-height: 50px;
    margin:1px 22px;
    
}
#category li:first-child a{
    padding-lrft:100px;
    font-size:2px;
    color:#f11;
}
#category li a{
    display:block;

    color: #9B9B9B;
    text-decoration: none;
    
}#category li a:hover{
    color: #FFFFFF;
    
}
#mid{
    position: relative;
    width: 92%;
    height: 450px;
    background-color: #fff;
    float:left;
    padding:0;
    display: inline-block;
    margin:20px 4%;

}
.right_coin{
	 position: absolute;
	 top:220px;
	 right:10px;
	 opacity:0.1;
    background-color: aqua;
    width:30px;
    height:40px;
    display: inline-block;
}

</style>
<script>

   var img = ["/static/banner1.jpg","/static/banner2.jpg","/static/banner3.jpg","/static/banner4.jpg","/static/banner5.jpg","/static/banner6.jpg"]
    var index = 0;
    var num=img.length;
     flag=true;
    setInterval(function(){
      if(flag){
         index--;
        if(index<0){
            index = index+num
        }
        var element = document.getElementById("mid");
        element.src = img[index];
      }else{
       index++;
        if(index>=num){
            index = index-num
        }
        var element = document.getElementById("mid");
        element.src = img[index];
        //alert(element.src)
      }
      
    },3000);
  </script>
