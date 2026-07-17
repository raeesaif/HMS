import nodemailer from "nodemailer"

const sendEmail = async(to,subject,html)=>{
    const transport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    })
    await transport.sendMail({
        from: `"Blogify" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
    })
}

export default sendEmail