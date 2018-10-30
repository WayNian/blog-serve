const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const Schame = mongoose.Schema;

const blogSchame = new Schame({
    uuid: String,
    title: String,
    content: String,
    createAt: {
        type: Date,
        default: new Date()
    },
    updateAt: Date,
    //阅读数
    readNum: {
        type: Number,
        default: 0
    },
    tags: Array,
    isDelete: {
        type: Number,
        default: 0 //0:未删除   1:删除
    }
}, {
    collection: 'blog'
})

mongoose.model('Blog', blogSchame)