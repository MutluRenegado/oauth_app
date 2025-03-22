ROUTES/DASHBOARD.JS (Dashboard Route)
import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.get("/", isAuthenticated, (req, res) => {
    res.json({ message: "Welcome to your dashboard", user: req.session.user });
});

export default router;
