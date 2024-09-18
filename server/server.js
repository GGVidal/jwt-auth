const express = require("express");
const axios = require("axios");
const cors = require("cors");
const https = require("https");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

const api = axios.create({
  baseURL: "https://api-onecloud.multicloud.tivit.com/fake",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

// Login route
app.post("/login", async (req, res) => {
  const { username, password } = req.query;
  try {
    const response = await api.post(
      "/token",
      {},
      {
        params: { username, password },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log("GG TESTE error", error);
    res.status(error.response?.status || 500).json({
      message: error.message,
      details: error.response?.data,
    });
  }
});

// User data route
app.get("/user", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const response = await api.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.message,
      details: error.response?.data,
    });
  }
});

// Admin data route
app.get("/admin", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const response = await api.get("/admin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.message,
      details: error.response?.data,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
