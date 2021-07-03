const nodemailer=require("nodemailer");

const sendEmail=async (options)=>{
    let testAccount = await nodemailer.createTestAccount();
    //console.log("test account:", testAccount);
    const transporter=nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
       }
    });

    const mailOptions={
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text
    };

    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            console.log(err);
        }
        if(info){
            console.log(info);
        }
    })

}

module.exports=sendEmail;