const mongoose = require('mongoose');
const Schame = mongoose.Schema;

const websiteSchame = new Schame({
    vistorCount: Number,
    IP: String,
    country: String, //国家
    province: String, //省
    city: String, //城市
    area: String //地区
}, {
    collection: 'website'
})

mongoose.model('Website', websiteSchame)