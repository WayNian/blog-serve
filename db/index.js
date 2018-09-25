const mongoose = require('mongoose');
const db = 'mongodb://localhost:27017/duck';
const glob = require('glob');
const {resolve} = require('path')

exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schame', '**/*.js')).forEach(require)
}

exports.connect = () => {
    mongoose.connect(db);
    let maxConnectTimes = 0;
    return new Promise((resolve, reject) => {
        mongoose.connection.on('disconnected', () => {
            console.log('数据库断开连接');
            if (maxConnectTimes <= 3) {
                maxConnectTimes++
                mongoose.connect(db)
            } else {
                reject()
                throw new Error('数据库出错')
            }
        })

        mongoose.connection.on('error', (error) => {
            console.log('数据库连接错误');
            if (maxConnectTimes <= 3) {
                maxConnectTimes++
                mongoose.connect(db)
            } else {
                reject()
                throw new Error('数据库出错')
            }
        })

        mongoose.connection.on('open', ()=>{
            console.log('连接成功');
            resolve()
        })
    })
}