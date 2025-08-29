import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  getCurrentUser,
  resetPassword,
  confirmResetPassword,
  signInWithRedirect,
} from "aws-amplify/auth";

// Sign up with email
export const signupWithEmail = async (email, password) => {
  return await signUp({
    username: email,
    password,
    options: {
      userAttributes: { email },
    },
  });
};

// Confirm email
export const confirmEmail = async (email, code) => {
  return await confirmSignUp({
    username: email,
    confirmationCode: code,
  });
};

// Login
export const loginWithEmail = async (email, password) => {
  return await signIn({ username: email, password });
};

// Forgot password request
export const forgotPassword = async (email) => {
  return await resetPassword({ username: email });
};

// Reset password after receiving code
export const resetPasswordSubmit = async (email, code, newPassword) => {
  return await confirmResetPassword({
    username: email,
    confirmationCode: code,
    newPassword,
  });
};

// Logout
export const logout = async () => {
  return await signOut();
};

// Current user
export const me = async () => {
  try {
    return await getCurrentUser();
  } catch {
    return null;
  }
};

export const loginWithGoogle = async () => {
  try {
    return await signInWithRedirect({
      provider: "Google",
    });
  } catch (error) {
    console.error("Google login error:", error);
    throw error;
  }
};
