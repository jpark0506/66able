const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  provider: {
    type: String,
    maxlength: 10,
    default: "custom",
  },
  kakaoid: {
    type: String,
    maxlength: 40,
    default: "none",
  },
  name: {
    type: String,
    maxlength: 30,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
  habits: [{ type: mongoose.Types.ObjectId, ref: "Habit" }],
  fcm_token: { type: String },
});

userSchema.pre("save", function (next) {
  //화살표 함수에서는 this 사용 못함
  //만약에 ()=>{let user = this;},
  // userSchema가 아닌 그 상위 객체를 가르킴 -> user = global 이 되고
  //password  프로퍼티가 없으므로 당연히
  //error를 발생시킨다.
  let user = this;
  //encrypt password
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds).then((salt) =>
      bcrypt
        .hash(user.password, salt)
        .then((hash) => {
          user.password = hash;
          next();
        })
        .catch((err) => next(err))
    );
  } else {
    next();
  }
});
userSchema.methods.comparePassword = function (ps, cb) {
  bcrypt.compare(ps, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
userSchema.methods.genToken = function (cb) {
  let user = this;
  let token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  user
    .save()
    .then((user) => cb(null, user))
    .catch((err) => cb(err));
};
userSchema.statics.findByToken = function (token, cb) {
  let user = this;
  jwt.verify(token, "secretToken", function (err, decoded) {
    user.findOne(
      {
        _id: decoded,
        token: token,
      },
      function (err, user) {
        if (err) return cb(err);
        cb(null, user);
      }
    );
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
