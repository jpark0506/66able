const mongoose = require('mongoose');

const {Schema} = mongoose;
const { Types : { ObjectId }} = Schema;
const postSchema = new Schema({
    author:{
        type: ObjectId,
        required: true,
        ref: 'User',
    },
    title:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    createdAt:{
        type:Date,
        default : Date.now,
    },
    savedAt:{
        type:Date,
        default : Date.now,
    },
    isTemp:{
        type:Boolean,
        default: false
    }
});
const Post = mongoose.model('Post', postSchema);
module.exports = {Post};