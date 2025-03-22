// APP.JS (Main Express Application)
import express from "express";
import session from "express-session";
import config from "./config.js";
import authRoutes from "./routes/auth.js";
import dashboardRoutes from "./routes/dashboard.js";

const app = express();
app.use(express.json());
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true
}));

app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);

app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
