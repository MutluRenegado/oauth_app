import dotenv from "dotenv";
dotenv.config();

export default {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    sessionSecret: process.env.SESSION_SECRET,
    port: process.env.PORT || 3000
};
