import React, { useEffect, useState, useContext } from "react";
import { getAdminData } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import "../styles/Admin.css";

interface Report {
  id: number;
  title: string;
  status: string;
}

interface AdminData {
  name: string;
  email: string;
  reports: Report[];
}

const Admin: React.FC = () => {
  const { token } = useContext(AuthContext) || {};
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      if (!token) {
        setError("User is not authenticated");
        setLoading(false);
        return;
      }

      try {
        const response = await getAdminData(token);
        setAdminData(response.data);
      } catch (err) {
        setError("Failed to fetch admin data");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [token]);

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      {adminData ? (
        <div className="admin-content">
          <div className="admin-info">
            <h3>Admin Information</h3>
            <p>
              <strong>Name:</strong> {adminData.name}
            </p>
            <p>
              <strong>Email:</strong> {adminData.email}
            </p>
          </div>
          <div className="reports">
            <h3>Reports</h3>
            {adminData.reports && adminData.reports.length > 0 ? (
              adminData.reports.map((report) => (
                <div key={report.id} className="report-card">
                  <h4>{report.title}</h4>
                  <p>
                    <strong>Status:</strong> {report.status}
                  </p>
                </div>
              ))
            ) : (
              <p>No reports available</p>
            )}
          </div>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Admin;
