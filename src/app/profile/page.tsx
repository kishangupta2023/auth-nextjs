/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { User, LogOut, Info } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
    } catch (error: any) {
      toast.error("Failed to fetch user details");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-8 space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-white/20 flex items-center justify-center shadow-lg mb-4">
            <User size={40} className="text-purple-300" />
          </div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Profile
          </h1>
          <p className="mt-2 text-gray-300 text-sm">
            Manage your account and see your details
          </p>
        </div>

        {/* User Data */}
        <h2 className="p-3 text-center text-lg font-semibold rounded-xl bg-white/20 text-white border border-white/30">
          {data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
        </h2>

        {/* Buttons */}
        <div className="space-y-4">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 rounded-xl py-3 font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/30 text-white transition-all duration-300"
          >
            <LogOut size={18} /> Logout
          </button>

          <button
            onClick={getUserDetails}
            className="w-full flex items-center justify-center gap-2 rounded-xl py-3 font-semibold bg-gradient-to-r from-green-500 to-teal-600 hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/30 text-white transition-all duration-300"
          >
            <Info size={18} /> Get User Details
          </button>
        </div>

        {/* Footer */}
        <p className="text-center mt-4 text-gray-300 text-sm">
          <Link href="/" className="text-purple-400 hover:text-purple-300 font-medium">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
