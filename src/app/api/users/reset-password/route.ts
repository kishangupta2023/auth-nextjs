/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel";

export async function POST(req:Request){
    try {
        await connect();
        const {email,verificationCode,newPassword} = await req.json(); 

        if(!email || !verificationCode || !newPassword){
            return NextResponse.json({message:"Please provide all the fields"}, {status:400})
        }

        const user = await User.findOne({
            email:email.trim(),
            forgotPasswordCode:verificationCode.toString().trim(),
            forgotPasswordCodeExpiry:{$gt:Date.now()}
        });
        console.log(user);
        if(!user) return NextResponse.json({message:"Invalid or expired verification code"}, {status:400});

        const hashedPassword = await bcryptjs.hash(newPassword,10);
        user.password = hashedPassword;
        user.forgotPasswordCode = undefined;
        user.forgotPasswordCodeExpiry = undefined;
        await user.save();
        return NextResponse.json({
            message:"Password reset successful"
        })
    } catch (error:any){
        console.log("Error resetting password",error);
        return NextResponse.json(
            {message:"Server error"},
            {status:500}
        );
    }
}