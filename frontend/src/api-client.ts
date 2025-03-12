import { RegisterFormSchema } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ""; // i added "" because we are serving the frontend to backend

export const register = async (formData: RegisterFormSchema) => {
  const response = await fetch(`${BACKEND_URL}/api/users/register`, {
    method: "POST",
    credentials: "include", // include cookies
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }
};

export const validateToken = async () => {
  const response = await await fetch(`${BACKEND_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Invalid token");
  }

  return response.json();
};

export const SignIn = async (formData: SignInFormData) => {
  const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include", // include cookies
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }
};

export const SignOut = async () => {
  const response = await fetch(`${BACKEND_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error logging out");
  }
};
