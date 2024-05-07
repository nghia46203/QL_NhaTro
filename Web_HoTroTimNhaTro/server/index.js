var express = require("express");
const mongoose = require('mongoose');
const passport= require('passport')
var bodyParser = require('body-parser')
var session = require('express-session');

var userRouter= require('./routers/user.router');
var homeRouter= require('./routers/phongtro.router');
var homePageRouter= require('./routers/home.router');

var flash = require('connect-flash');



var app = express();
/* Khai báo để sử dụng kịch bản passport */
require('./config/passport.config');
mongoose.connect('mongodb://localhost/Database_PhongTroVN', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
},(err)=>{
    if(err) console.log(err+"");
    console.log("connect database success");
});

app.use(session({
    name: 'login',
    secret : 'secured_key',
    resave : false,
    saveUninitialized : false,
    cookie:{
      maxAge:1000*60*15
    }
}))

app.use([
  bodyParser.json(),
  bodyParser.urlencoded({
    extended: true,
  })
]);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));
 

app.use('/nguoi-dung',userRouter);
app.use('/phong-tro',homeRouter);
app.use('/trang-chu',homePageRouter);


app.listen(3001,(err)=>{
    if(err) console.log(err);
    console.log("Listen port 3001");    
});
