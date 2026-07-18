const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");

const testRoutes = require("./routes/test.routes");

const dashboardRoutes = require("./routes/dashboard.routes");

const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profile", require("./routes/profile.routes"));
app.use("/uploads", express.static(path.join(__dirname, "../src/uploads")));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Money Pilot Backend API is running"
    });
});

module.exports = app;