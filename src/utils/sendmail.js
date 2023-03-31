import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


export const sendCreationEmail = (email, firstName,) => {
  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'ACCOUNT CREATION',
    html: `
    <body>
    <div>
    <div style="background-color:#f2f3f5;padding:20px">
      <div style="max-width:600px;margin:0 auto">
       <div 
        style="
          background:#fff;
          font:14px sans-serif;
          color:#686f7a;
          border:2px solid #6c4af2;
          margin-bottom:10px">
        <div 
          style="
           border-bottom:1px solid #f2f3f5;
           padding-bottom:20px;
           padding-top:20px">
          <h4 
            style="
              padding-top:0; 
              padding-left:20px; 
              margin:0; 
              font-size:30px;
              font-family:'Kurale', serif;">
              Rezerve Homes</h4>
        </div>
        <div style="padding:10px 20px;line-height:1.5em;color:#686f7a">
          <p 
            style="
              padding-bottom:20px;
              margin:20px 0;
              color:#686f7a">
             Hi ${firstName}, <br/> <br/>
             Your account has been successfully created!.<br/>
          </p>
          <p 
            style="
              padding-bottom:15px;
              margin-top:10px;
              color:#686f7a">
              If you haven't made this request, kindly ignore this message.
          </p>
          <p 
            style="padding-bottom:10px;
              margin-top:20px;
              color:#686f7a">
              Best regards, <br>
              SPMS.<br>
            <a href="spms.com"
              style="color: #6c4af2">spms.com
            </a>
          </p>
        </div>
     </div>
    </div>
  </body>
    `,
  };

  // eslint-disable-next-line consistent-return
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
      return error;
    }
  });
};

export const sendForgotEmail =(email, linkHost, expiresTime )=> {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to:email,
    subject: 'Password Reset Request',
    text:
      `Hello,\n\n` +
      `We received a request to reset your password for your account on our site.\n\n` +
      `Please click the following link or paste it into your browser to complete the process:\n\n` +
      `${linkHost}\n\n` +
      `The link expires ${expiresTime}`+
      `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
      return error;
    }
  });
}
