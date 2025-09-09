"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import {axios} from "axios";



export default function SignupPage(){
    const [user,setUser] = React.useState({
        email:"",
        password:"",
        username:"",        
    })
    const onSignup = async () =>{

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Signup</h1>
            <hr/>
            <label htmlFor="username">Username</label>
            <input 
            className="border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:border-gray-600"
            type="text" 
            id="username" 
            value={user.username}
            onChange={(e)=>setUser({...user,username:e.target.value})}
            placeholder="username"
            />
            <label htmlFor="email">Email</label>
            <input 
            className="border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:border-gray-600"
            type="text" 
            id="email" 
            value={user.email}
            onChange={(e)=>setUser({...user,email:e.target.value})}
            placeholder="email"
            />
            <label htmlFor="password">Password</label>
            <input 
            className="border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:border-gray-600"
            type="password" 
            id="password" 
            value={user.password}
            onChange={(e)=>setUser({...user,password:e.target.value})}
            placeholder="password"
            />
            <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
            onClick={onSignup}
            >
                Signup
            </button>
            <Link href="/login" className="mt-4 text-gray-500 hover:underline">Visit login page </Link>
        </div>
    )
}