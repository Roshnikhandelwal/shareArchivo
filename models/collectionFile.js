const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const fileSchema= new Schema({
    filename:{type: String, requied:true},
    path:{type: String, requied:true},
    size:{type: Number, requied:true},
    uuid:{type: String, requied:true},
    sender:{type: String, requied:false},
    receiver:{type: String, requied:false},
},{timestamps:true});
//create collection
module.exports=mongoose.model('File',fileSchema);
