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
    //标签 [java, JavaScript]
    tags: Array
    //评论
    // comment: {
    //     type: Array,
    //     id: {

    //     }
    // }
}, {
    collection: 'blog'
})

mongoose.model('Blog', blogSchame)