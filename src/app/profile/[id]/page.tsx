/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";

export default function UserProfile({ params }: any) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 px-4">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-8 space-y-6 text-center">
        
        {/* Header */}
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Profile Details
        </h1>

        {/* Divider */}
        <div className="h-px w-full bg-white/20"></div>

        {/* Content */}
        <p className="text-lg text-gray-300">
          This is the profile page for:
        </p>

        {/* Profile ID Badge */}
        <span className="inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-orange-400 to-yellow-500 text-black font-semibold text-lg shadow-md">
          {params.id}
        </span>

        {/* Divider */}
        <div className="h-px w-full bg-white/20"></div>

        {/* Footer (Back Link with Next.js Link) */}
        <p className="text-sm text-gray-300">
          <Link
            href="/profile"
            className="text-purple-400 hover:text-purple-300 font-medium transition"
          >
            ← Back to Profile
          </Link>
        </p>
      </div>
    </div>
  );
}
