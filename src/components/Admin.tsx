// src/components/Admin.tsx
import React, { useEffect, useState } from "react";
import { getAdminData } from "../services/api";

const Admin = () => {
  const [adminData, setAdminData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User is not authenticated");
        return;
      }

      try {
        const response = await getAdminData(token);
        console.log("GG ADMIN RESPONSE", response);
        setAdminData(response);
      } catch (err) {
        setError("Failed to fetch admin data");
      }
    };

    fetchAdminData();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Admin Data</h1>
      {adminData ? (
        <pre>{JSON.stringify(adminData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Admin;
