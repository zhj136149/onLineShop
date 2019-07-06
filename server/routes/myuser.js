var express = require('express');
var router = express.Router();
require('./../util/util')
var myUser = require('./../models/myUsers');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', function(req, res, next) {
  res.send('test');
});
router.post("/register", function (req,res,next) {
  var myuserName = req.body.myuserName;
    var regUser = new myUser({
       
        userName: req.body.myuserName,
        userPwd: req.body.myuserPwd
    });
    regUser.save(function (err, content) {
        if (err) {
            return res.json({status: 1, msg: err || '注册失败',result:''});
        } else {
            return res.json({
              status: 0,
               msg: "注册成功",
               result:{
                   userId:content.length+1
               }
             });
        }
    })
});

router.post("/login", function (req,res,next) {
  console.log(1);
  var param = {
      userName:req.body.userName,
      userPwd:req.body.userPwd
  }
  myUser.findOne(param, function (err,doc) {
      if(err){
          res.json({
              status:"1",
              msg:err.message|| '登录失败'
          });
      }else{
          if(doc){
              res.cookie("userId",doc.userId,{
                  path:'/',
                  maxAge:1000*60*60
              });
              res.cookie("userName",doc.userName,{
                path:'/',
                maxAge:1000*60*60
              });
              req.session.user = doc;
              res.json({
                  status:'0',
                  msg:'登录成功',
                  result:{
                      userName:doc.userName
                  }
              });
          }
      }
  });
});


//登出接口
router.post("/logout", function (req,res,next) {
  res.cookie("userId","",{
    path:"/",
    maxAge:-1
  });
  res.json({
    status:"0",
    msg:'',
    result:''
  })
});

router.get("/checkLogin", function (req,res,next) {
  console.log(res);
  if(req.cookies.userId){
      res.json({
        status:'0',
        msg:'',
        result:req.cookies.userName || ''
      });
  }else{
    res.json({
      status:'1',
      msg:'未登录',
      result:''
    });
  }
});

