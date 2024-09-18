import React, { useEffect, useState } from "react";
import { getUserData } from "../services/api";
import "../styles/User.css";

interface Purchase {
  id: number;
  item: string;
  price: number;
}

interface UserData {
  name: string;
  email: string;
  purchases: Purchase[];
}

const User = () => {
  const [userData, setUserData] = useState<UserData>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User is not authenticated");
        return;
      }

      try {
        const response = await getUserData(token);
        console.log("GG RESPONSE", response);
        setUserData(response.data);
      } catch (err) {
        setError("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, []);

  if (error) return <div>{error}</div>;
  if (!userData) {
    return <p>Loading...</p>;
  }
  return (
    <div className="user-container">
      <h2>{userData.name}</h2>
      <p className="email">{userData.email}</p>
      <h3>Your Purchases</h3>
      <ul className="purchases">
        {userData.purchases.map((purchase) => (
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
