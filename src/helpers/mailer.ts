/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    let hashedToken;
    let resetCode;

    if (emailType === "VERIFY") {
      hashedToken = await bcryptjs.hash(userId.toString(), 10);
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    } else if (emailType === "RESET") {
  resetCode = Math.floor(100000 + Math.random() * 900000).toString();
      const updatedUser = await User.findByIdAndUpdate(
            userId,
        {
       forgotPasswordCode: resetCode,
      forgotPasswordCodeExpiry: new Date(Date.now() + 10 * 60 * 1000),
    },
    { new: true } // return updated document
     );
      console.log("Updated user for reset code:", updatedUser);
   }


    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "764f0a6ba4d666",
        pass: "bfff214524a31b",
      },
    });

    const mailOptions = {
      from: "kishan123n1@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html:
        emailType === "VERIFY"
          ? `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email.
               <br>Or copy and paste the link below in your browser: 
               <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
          : `<p>Your password reset code is <b style="font-size:18px">${resetCode}</b>. 
             <br/>It will expire in 10 minutes. 
             <br/>Enter this code on the password reset page to create a new password.</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
