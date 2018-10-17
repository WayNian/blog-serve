const mongoose = require('mongoose');
const Schame = mongoose.Schema;

const commentsSchame = new Schame({
    email: String,
    nickname:String,
    createAt: {
        type: Date,
        default: new Date()
    },
    loginAt: Date,
}, {
    collection: 'user'
})

mongoose.model('Users', commentsSchame)