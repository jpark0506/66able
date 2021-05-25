// 30초마다 db조회, 알림전송 setInterval(함수, 30000)
//알림의 내용에는 `지금 ${signal} 하실 시간입니다! 등록하신 ${reaction}을 꼭 해주세요! 관련된 사진도 옵션으로 들어가게 됩니다
const { User } = require("./models/user");
const { Habit } = require("./models/habit");
const config = require("./config/key");
const mongoose = require("mongoose");
const axios = require("axios");
const server_key =
  "AAAAhVuRGao:APA91bEZ15EjAFz5w_TY8i-YyQZZLpgsBasnhulSE4skcJfF2PNHU5nVCjXFdYFv1mSJ3rtNDxSVYDiJP17XFKPEoT_FT_CCAckvDqc57lAW4FmNvawi2QGUSyIwJEeheIWiFONAv7f0";

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`Mongo DB Connect Success!`))
  .catch((err) => console.log(err));

function send_msg(s_token, user_token, signal, reaction) {
  axios({
    method: "post",
    url: "https://fcm.googleapis.com/fcm/send",
    headers: {
      Authorization: `key=${s_token}`,
    },
    data: {
      notification: {
        title: `지금 ${signal} 하실 시간입니다!`,
        body: `등록하신 ${reaction}을 꼭 해주세요!`,
        icon: "https://i.ibb.co/RpRYfn7/Kakao-Talk-20210517-215329385.png",
      },
      to: user_token,
    },
  });
}
function checker() {
  var a = new Date();
  var kr = a.toUTCString();
  var kr_t = new Date(kr + 9 * 60 * 60 * 1000);
  var curtime = "";
  if (kr_t.getHours() < 10) {
    curtime += "0";
  }
  curtime += String(kr_t.getHours()) + ":";
  if (kr_t.getMinutes() < 10) {
    curtime += "0";
  }
  curtime += String(kr_t.getMinutes());
  console.log(curtime);

  Habit.find(
    //현재 시간과 맞는 습관만 조회, 프로젝션
    { "habit.habittime": curtime },
    {
      habit: { $elemMatch: { habittime: curtime } },
    }
  )
    .populate({
      path: "users",
      match: { token: { $ne: "" }, fcm_token: { $ne: "" } }, //로그인 되어있고 fcm토큰이 있는 경우만 프로젝션
    })
    .exec((err, data) => {
      for (i in data) {
        console.log(data[i]);
        for (j in data[i].users) {
          for (k in data[i].habit) {
            send_msg(
              server_key,
              data[i].users[j].fcm_token,
              data[i].habit[k].signal,
              data[i].habit[k].habit
            );
          }
        }
      }
      console.log(err);
    });
}
setInterval(checker, 3000);
