import { useState } from "react";

export default function useRegister(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const register = async (object, type) => {
    setIsLoading(true);
    setError(null);

    const endpoint = type === "login" ? `${url}/login` : `${url}/signup`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
      });

      const user = await response.json();

      if (!response.ok) {
        setError(user.error);
        setIsLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      setIsLoading(false);
    } catch (err) {
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
}