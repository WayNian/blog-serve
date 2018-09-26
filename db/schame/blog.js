const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const Schame = mongoose.Schema;

const blogSchame = new Schame({
    uuid: {
        type: String,
        default: uuidv4
    },
    title: String,
    content: String,
    createAt: {
        type: Date,
        default: new Date()
    },
    updateAt: Date,
    //阅读数
    readNum: Number,
    tags: Array,
    isDelete: {
        type: Number,
        default: 0 //0:未删除   1:删除
    }
}, {
    collection: 'blog'
})

mongoose.model('Blog', blogSchame)