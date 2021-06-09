require('dotenv').config();
const mongoose = require('mongoose');
// Database connection
function connectDB(){

    mongoose.connect(process.env.mongoConnectionUrl,{


        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify: true
    })
    .then(()=>{console.log('connection sucessfull.....')})
    .catch((e)=>{console.log('no connection')})
    // const connection = mongoose.connection;
    // connection.once('open',()=>{
    //     console.log('connection successfull...')
    // }).catch((e)=>{
    //         console.log('No connection')
    // })
}
module.exports=connectDB;
