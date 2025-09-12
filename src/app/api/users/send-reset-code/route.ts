/* eslint-disable @typescript-eslint/no-explicit-any */
import {NextResponse} from 'next/server';
import User from '@/models/userModel';
import {sendEmail} from "@/helpers/mailer";
import {connect} from "@/dbConfig/dbConfig";

export async function POST(req: Request) {
    try {
        await connect();
        const {email} = await req.json();
        if(!email){
            return NextResponse.json({message:"Email is required"}, {status: 400});
        }

        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({message:"User not found"}, {status: 404});
        }
        // call your mailer 
        await sendEmail({
            email,
            emailType:"RESET",
            userId:user._id
        });
        return NextResponse.json({message:"Reset code sent to your email"},{status:200});

    } catch (error:any) {
        console.error("Error in sending reset code",error);
        return NextResponse.json({message:"Server error"}, {status: 500});
    }
}