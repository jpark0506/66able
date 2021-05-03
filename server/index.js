const express = require('express');
const app = express();
const port = 5000;
const {User} = require('./models/user')
const bodyParser = require('body-parser');
const config = require('./config/key');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const {auth} = require('./middleware/auth');
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:false
}).then(()=>console.log(`Mongo DB Connect Success!`))
.catch(err=>console.log(err))

app.use(bodyParser.urlencoded({extended:true}));
//json형식으로 변형
app.use(bodyParser.json());
app.use(cookieParser());


app.get('/api/hello', (req,res)=>res.send("안녕하세요"))

app.get('/', (req,res)=> res.send('Hello World!'))


app.post('/api/users/register',(req,res)=>{
    const user = new User(req.body);
    user.save().then(
        ()=>res.status(200).json({success:true})
    ).catch(err => res.json({success:false, err:err}))
})

app.post('/api/users/login', (req,res)=>{

    User.findOne({email: req.body.email},(err,user)=>{
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "No Email"
            })
        }
        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch){
                return res.json({loginSuccess: false, message : "Wrong Password"});
                
            }
            user.genToken((err,user)=>{
                    if(err) return res.status(400).send(err);
                    res.cookie("auth",user.token)
                    .status(200)
                    .json({loginSuccess:true, userId : user._id })
            });
        })
    })




})

app.get('/api/users/auth',auth,(req,res)=>{
    res.status(200).json({
        _id:req.user._id,
        isAdmin: req.user.role === 0? false:true,
        isAuth : true,
        email : req.user.email,
        name: req.user.name
    })
})

app.get('/api/users/logout',auth,(req,res)=>{

    User.findOneAndUpdate(
        {_id:req.user._id},
        {token : ""},
        (err,user)=>{
            if(err){
                return res.json({ success:false, err});
            }
            return res.status(200).send({
                success:true
            })
        }
    )


})


app.listen(port, ()=> console.log(`App listening at ${port}`))