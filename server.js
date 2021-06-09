const express=require('express');
const app=express();
const port = process.env.PORT || 3000;
const path= require('path')
const cors=require('cors')

const connectDB= require('./config/db');
connectDB();

//cors
const corsOptions={
    origin:process.env.allowed_client_list.split(',')
    
}

app.use(express.json())
app.use(express.static('public'))
app.use(cors(corsOptions));
//template engine(configuring ejs)
app.set('views',path.join(__dirname,'/views'))
app.set('views engine','ejs');
//Routes
app.use('/api/files',require('./routes/Files_Upload'));
app.use('/files',require('./routes/show_DawnloadPage'));
app.use('/files/download',require('./routes/downloadLink'));
app.listen(port,()=>{
    console.log(`listen port on ${port} `)
})