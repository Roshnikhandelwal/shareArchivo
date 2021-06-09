require('dotenv').config();
const nodemailer=require('nodemailer');
async function sendMail({from,to,subject,text,html}){
    let transporter= nodemailer.createTransport({
        host:process.env.smtpHost,
        port:process.env.smtpPort,
        secure:false,
        auth:{
            user:process.env.mailUser,
            pass: process.env.mailPass
        }

    });
    let info = await transporter.sendMail({
        from:`shareArchivo<${from}>`,
        to,
        subject,
        text,
        html

    });
    console.log(info);
    
}
module.exports=sendMail;