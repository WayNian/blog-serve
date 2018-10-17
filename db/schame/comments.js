const mongoose = require('mongoose');
const Schame = mongoose.Schema;

const commentsSchame = new Schame({
    uuid: String,
    to: String,
    from: String,
    browserType: String,
    createAt: {
        type: Date,
        default: new Date()
    },
}, {
    collection: 'comments'
})

mongoose.model('Comments', commentsSchame)