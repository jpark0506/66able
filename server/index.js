const express = require('express');
const app = express();
const port = 5000;
//models는 SQL로 치면 새로운 테이블 같은 존재 입니다 해당 파일로 가보시면 object 형태로 작성이 되어있다는 것을 확인하실 수 있습니다.
const {User} = require('./models/user');
const {Post} = require('./models/post');
const bodyParser = require('body-parser');
const config = require('./config/key');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const {auth} = require('./middleware/auth');

const axios = require('axios');
const router = express.Router();

//mongodb 연결(mongoose 라이브러리 이용)
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:false
}).then(()=>console.log(`Mongo DB Connect Success!`))
.catch(err=>console.log(err))

app.use(bodyParser.urlencoded({extended:true}));
//json형식으로 변형

app.use(bodyParser.json());
app.use(cookieParser());
//:id는 정규표현식(?)일 거 같아요 express docs에 나와있습니다!
app.get('/api/kakao/logout/:id',(req,res)=>{
    let id = req.params.id;
    //토큰이 없으면 로그아웃 상태로 판정합니다!
    User.findOneAndUpdate(
        {kakaoid:id},
        {token:""},
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

app.post('/api/kakao',async (req,res)=>{
    //카카오 로그인 하기
    //KakaoLogin.js에서 인가코드를 받아왔습니다
    const AUTHORIZATION_CODE= req.body.authorizationCode;
    const REST_API_KEY= "351d2b8fedd2b491486182039c85736e";
    const REDIRECT_URI = "http://localhost:3000/kakao"
    let kakaodata = {}
    try{
        //code를 이용해서 엑세스 토큰(만료 시간 김) 받아오기
        await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${AUTHORIZATION_CODE}&scope=${["profile","account_email,talk_message"]}`)
        .then(data=>data.data)
        .then(async (data)=>{
            kakaodata.access_token = data.access_token;
            //토큰을 이용해서 개인정보를 받아 올 수 있는 api    
            await axios(
            {
                method:"post",
                url:"https://kapi.kakao.com/v2/user/me",
                headers:{"Authorization": `Bearer ${data.access_token}`},
                params:{
                    "property_keys":["kakao_account.email","kakao_account.profile"]
                }
            }).then(response=>{
                //전역변수에 프로파일 데이터 작성
            kakaodata.profile = response.data;
            return response.data;
        })
        .then(profile=>
            {
                User.findOne({kakaoid:profile.id},async (err,user)=>{
                    if(!user){
                        //받은 데이터의 카카오 아이디가 없다면
                        //provider->kakao
                        //role->0 (Non Admin)
                        let body={
                            provider:'kakao',
                            kakaoid:`${profile.id}`,
                            name: profile.properties.nickname,
                            email:profile.kakao_account.email,
                            role:0,
                            image:profile.properties.profile_image,
                            token:kakaodata.access_token
                        }
                        const user = new User(body)
                        try{
                            await user.save().then(()=>res.status(200).json({
                                provider:'kakao',
                                isnewuser:true,
                                success:true,
                                isAuth:true,
                                accesstoken:kakaodata.access_token,
                                profile: kakaodata.profile
                            }))
                        }catch(err){
                            console.log(`UserCreateError : ${err}`)
                            res.status(500).json({
                                success:false
                            })
                        }
                    }else{
                        //받은 데이터의 카카오 아이디가 있다면
                        //토큰을 업데이트 해준다
                        try{
                            await User.updateOne({kakaoid:profile.id},{$set: { token: kakaodata.access_token}})
                            .then(()=>res.status(200).json({
                                provider:'kakao',
                                isnewuser:false,
                                success:true,
                                isAuth:true,
                                accesstoken:kakaodata.access_token,
                                profile: kakaodata.profile
                            }))
                        }catch(err){
                            console.log(`UserUpdateError : ${err}`)
                            res.status(500).json({
                                success:false
                            })
                        }
                        
                    }
                })
            }
        );
        }) 
    }catch(err){
        console.log(err)
        res.status(500).json({
            success:false
        })
    }
})

//회원 가입 api
app.post('/api/users/register',(req,res)=>{
    const user = new User(req.body);
    user.save().then(
        ()=>res.status(200).json({success:true})
    ).catch(err => res.json({success:false, err:err}))
})
//로그인 api
app.post('/api/users/login', (req,res)=>{

    User.findOne({email: req.body.email},(err,user)=>{
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "No Email"
            })
        }
        if(err){
            return res.json(err)
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
//토큰 O 로그인중 토큰 X 로그인중이 아님
app.get('/api/users/auth',auth,(req,res)=>{
    res.status(200).json({
        _id:req.user._id,
        isAdmin: req.user.role === 0? false:true,
        isAuth : true,
        email : req.user.email,
        name: req.user.name
    })
})
//로그아웃 시 유저 아이디를 검색, 해당하는 유저의 토큰을 "" 로 삭제 
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

// app.get('api/users/:id/profile',(req,res)=>{
//     req.params .id
// })

// api post


app.get('/api/post',(req,res)=>{
    Post.find().populate('author').where('isTemp').equals(false).limit(10)
    .then(
        data=>res.json(data)
    ).catch(err=>console.log(err))
    
})
app.get('/api/post/:id', (req,res)=>{
    Post.findOne({_id: req.params.id}).then(
        data=>res.status(200).json({ postSuccess:true,data})
    ).catch(err=>res.json({postSuccess:false, err:err}))
})
app.post('/api/post/create',(req,res)=>{
    const post = new Post(req.body);
    post.save().then(
        ()=>res.status(200).json({postSuccess:true})
    ).catch(err => res.json({postSuccess:false, err:err}));

})

// api manage

app.get('api/manage/users',(req,res)=>{
    User.find({}).then(data=>{
        res.send(data);
    })
})

app.get('api/manage/posts',(req,res)=>{
    Post.find({}).then(data=>{
        res.send(data);
    })

})



app.listen(port, ()=> console.log(`App listening at ${port}`))