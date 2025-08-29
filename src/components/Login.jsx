import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function Login({ onLogin, onSwitch, onGoogle, error }) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, pwd);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Log in to your account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg  transition"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg  transition"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => onSwitch("forgot")}
              className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer "
          >
            Sign in
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="flex-grow border-t border-gray-300" />
          <span className="text-sm text-gray-500">Or continue with</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>

        <button
          onClick={onGoogle}
          type="button"
          className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer"
        >
          <span className="mr-3 flex items-center justify-center">
            <FcGoogle size={26} />
          </span>
          Continue with Google
        </button>
      </div>

      <div className=" pb-4 text-center ">
        <p className="text-sm text-gray-600">
          Not a member?{" "}
          <button
            type="button"
            onClick={() => onSwitch("signup")}
            className="text-blue-500 hover:text-blue-700 font-medium cursor-pointer"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
