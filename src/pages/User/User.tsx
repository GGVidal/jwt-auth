import React, { useEffect, useState, useContext } from "react";
import { getUserData } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import "./style.css";
import { UserData } from "./types";

const User: React.FC = () => {
  const { token } = useContext(AuthContext) || {};
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setError("User is not authenticated");
        setLoading(false);
        return;
      }

      try {
        const response = await getUserData(token);
        setUserData(response.data);
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="user-container">
      <h2>{userData?.name}</h2>
      <p className="email">{userData?.email}</p>
      <h3>Your Purchases</h3>
      <ul className="purchases">
        {userData?.purchases.map((purchase) => (
          <li key={purchase.id}>
            <span className="item">{purchase.item}</span>
            <span className="price">${purchase.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
