import { RegisterFormSchema } from "./pages/Register";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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
