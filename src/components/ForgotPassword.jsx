import React from "react";
import { useState } from "react";

export default function ForgotPassword({
  onRequest,
  onReset,
  onSwitch,
  error,
}) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [stage, setStage] = useState("request");

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4 w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center">Reset Password</h1>

      {stage === "request" ? (
        <>
          <input
            className="border p-3 w-full rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={async () => {
              await onRequest(email);
              setStage("reset");
            }}
            className="bg-blue-600 text-white p-3 w-full rounded-lg hover:bg-blue-700"
          >
            Send Code
          </button>
        </>
      ) : (
        <>
          <input
            className="border p-3 w-full rounded"
            placeholder="Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <input
            className="border p-3 w-full rounded"
            type="password"
            placeholder="New Password"
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
          />
          <button
            onClick={() => onReset(email, code, newPwd)}
            className="bg-green-600 text-white p-3 w-full rounded-lg hover:bg-green-700"
          >
            Reset Password
          </button>
        </>
      )}

      <button onClick={() => onSwitch("login")} className="text-blue-500">
        Back to Login
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
