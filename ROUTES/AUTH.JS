ROUTES/AUTH.JS (Authentication Routes)
import express from "express";
import { getAuthUrl, generateTokens, getUserInfo } from "../oauth.js";
const router = express.Router();

router.get("/login", async (req, res) => {
    const url = await getAuthUrl();
    res.redirect(url);
});

router.get("/callback", async (req, res) => {
    const { code } = req.query;
    if (!code) return res.status(400).send("Authorization code missing");
    try {
        const tokens = await generateTokens(code);
        req.session.tokens = tokens;
        const userInfo = await getUserInfo(tokens.accessToken);
        req.session.user = userInfo;
        res.redirect("/dashboard");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;

