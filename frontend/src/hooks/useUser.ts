import { useEffect, useState } from "react";
import api from "../api";

const useUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("api/user/");
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (err) {
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { username, email, loading, error };
};

export default useUser;
