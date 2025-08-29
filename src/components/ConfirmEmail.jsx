import React from "react";
import { useState } from "react";

export default function ConfirmEmail({ onConfirm, error }) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4 w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center">Confirm Email</h1>

      <input
        className="border p-3 w-full rounded"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-3 w-full rounded"
        placeholder="Verification Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button
        onClick={() => onConfirm(email, code)}
        className="bg-purple-600 text-white p-3 w-full rounded-lg hover:bg-purple-700"
      >
        Confirm
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
