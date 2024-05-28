import express from 'express';
import nodemailer from 'nodemailer';

const app = express.Router();

app.get('/sendmail', (req, res, next) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'zerefs124@gmail.com',
            pass: 'puwc amab obrm liui'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let content = `
    <div style="padding: 10px; backgroud: #003375">
    <script src="https://cdn.tailwindcss.com"></script>
        <div style="padding: 10px; backgroud: white">
            <h4 style="color: #0085ff">Gửi mail với node mailer</h4>
            <span style="color: black">Đây là nội dung</span>
            <div class="text-red-200">
                123
            </div>
        </div>
    </div>
    `;
    const mainOptions = {
        from: 'zeresf124@gmail.com',
        to: 'khangnd1806@gmail.com',
        subject: 'test nodemail',
        text: '',
        html: content
    }

    transporter.sendMail(mainOptions, (err, info) => {
        if(err) {
            console.log(err);
            
        }else{
            console.log('message send: ', info.response);
        }
    })
})

export default app;