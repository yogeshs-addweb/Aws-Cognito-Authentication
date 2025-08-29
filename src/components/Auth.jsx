import React from "react";
import { useEffect, useState } from "react";
import {
  signupWithEmail,
  confirmEmail,
  loginWithEmail,
  logout,
  me,
  forgotPassword,
  loginWithGoogle,
  resetPasswordSubmit,
} from "../api";
import Login from "./Login";
import Signup from "./Signup";
import ConfirmEmail from "./ConfirmEmail";
import ForgotPassword from "./ForgotPassword";

export default function Auth() {
  const [step, setStep] = useState("login");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    me()
      .then(setUser)
      .catch(() => {});
  }, []);

  const handleLogin = async (email, pwd) => {
    try {
      await loginWithEmail(email, pwd);
      setUser(await me());
    } catch (e) {
      setErr(e.message);
    }
  };

  const handleSignup = async (email, pwd) => {
    try {
      await signupWithEmail(email, pwd);
      setStep("confirm");
    } catch (e) {
      setErr(e.message);
    }
  };

  const handleConfirm = async (email, code) => {
    try {
      await confirmEmail(email, code);
      setStep("login");
    } catch (e) {
      setErr(e.message);
    }
  };

  const handleForgot = async (email) => {
    try {
      await forgotPassword(email);
    } catch (e) {
      setErr(e.message);
    }
  };

  const handleReset = async (email, code, newPwd) => {
    try {
      await resetPasswordSubmit(email, code, newPwd);
      setStep("login");
    } catch (e) {
      setErr(e.message);
    }
  };

  const handleGoogle = async () => {
    try {
      console.log("Attempting Google login...");
      console.log("Config check:", {
        domain: import.meta.env.VITE_COGNITO_DOMAIN,
        redirectSignIn: import.meta.env.VITE_REDIRECT_SIGNIN,
      });
      await loginWithGoogle();
    } catch (e) {
      console.error("Detailed Google login error:", e);
      setErr(e.message);
    }
  };

  if (user) {
    console.log("User data", user);

    return (
      <div className="p-6 text-center items-center ">
        <h1 className="text-2xl">Welcome, {user.username}</h1>
        <button
          onClick={async () => {
            await logout();
            setUser(null);
            setStep("login");
          }}
          className="bg-red-500 text-white p-3 rounded-lg mt-4"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {step === "login" && (
        <Login
          onLogin={handleLogin}
          onSwitch={setStep}
          onGoogle={handleGoogle}
          error={err}
        />
      )}
      {step === "signup" && (
        <Signup
          onSignup={handleSignup}
          onSwitch={setStep}
          onGoogle={handleGoogle}
          error={err}
        />
      )}
      {step === "confirm" && (
        <ConfirmEmail onConfirm={handleConfirm} error={err} />
      )}
      {step === "forgot" && (
        <ForgotPassword
          onRequest={handleForgot}
          onReset={handleReset}
          onSwitch={setStep}
          error={err}
        />
      )}
    </div>
  );
}
