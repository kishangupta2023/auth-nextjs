/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [user, setUser] = useState({
    email: "",
    verificationCode: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // Automatically enable/disable submit button
  const checkFields = () => {
    if (user.email && user.verificationCode && user.newPassword) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const handleChange = (key: keyof typeof user, value: string) => {
    setUser((prev) => {
      const updated = { ...prev, [key]: value };
      return updated;
    });
    setTimeout(checkFields, 50);
  };

  // Simulate API call to send verification code
  const onSendCode = async () => {
    if (!user.email) return alert("Please enter your email first.");
    setSendingCode(true);
    try {
       const res = await fetch("/api/users/send-reset-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send code");
      alert("Verification code sent to your email!");
    } catch (error) {
      console.error("Error sending code:", error);
    } finally {
      setSendingCode(false);
    }
  };

  const onResetPassword = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to reset password");
      alert("Password reset successful! Redirecting to login...");
      window.location.href = "/login";
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {loading ? "Processing..." : "Reset Password"}
          </h1>
          {!loading && (
            <p className="mt-2 text-gray-300 text-sm">
              Get a verification code, then set your new password
            </p>
          )}
        </div>

        {/* Email + Get Code Button */}
        <div className="mb-5">
          <div className="flex gap-2">
            <input
              type="email"
              id="email"
              value={user.email.trim()}
              onChange={(e) => handleChange("email", e.target.value)}
              className="flex-1 rounded-xl bg-white/20 p-3 text-white placeholder-gray-400 border border-white/30 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
              placeholder="Enter your email"
            />
            <button
              onClick={onSendCode}
              disabled={sendingCode}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                sendingCode
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30 text-white"
              }`}
            >
              {sendingCode ? "Sending..." : "Get Code"}
            </button>
          </div>
        </div>

        {/* Verification Code */}
        <div className="mb-5">
          <input
            type="text"
            id="verificationCode"
            value={user.verificationCode.trim()}
            onChange={(e) => handleChange("verificationCode", e.target.value)}
            className="w-full rounded-xl bg-white/20 p-3 text-white placeholder-gray-400 border border-white/30 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
            placeholder="Enter verification code"
          />
        </div>

        {/* New Password */}
        <div className="mb-6">
          <input
            type="password"
            id="newPassword"
            value={user.newPassword}
            onChange={(e) => handleChange("newPassword", e.target.value)}
            className="w-full rounded-xl bg-white/20 p-3 text-white placeholder-gray-400 border border-white/30 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
            placeholder="Enter new password"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={onResetPassword}
          disabled={buttonDisabled || loading}
          className={`w-full rounded-xl py-3 font-semibold transition-all duration-300 ${
            buttonDisabled || loading
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/30 text-white"
          }`}
        >
          {loading ? "Please Wait..." : "Submit"}
        </button>

        {/* Back to Login */}
        <p className="text-center mt-6 text-gray-300 text-sm">
          Remembered your password?{" "}
          <Link
            href="/login"
            className="text-purple-400 hover:text-purple-300 font-medium"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
