import { createClient } from "@wix/sdk";
import { authentication } from "@wix/identity";
import config from "./config.js";

const wixClient = createClient({
    modules: { authentication },
    auth: { clientId: config.clientId }
});

export async function getAuthUrl() {
    return `https://www.wix.com/app-oauth-installation/consent?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&response_type=code`;
}

export async function generateTokens(authCode) {
    const response = await wixClient.authentication.getAccessToken({
        code: authCode,
        clientSecret: config.clientSecret,
        redirectUri: config.redirectUri
    });
    if (!response.accessToken) throw new Error("Failed to retrieve access token");
    return response;
}

export async function getUserInfo(accessToken) {
    const response = await wixClient.authentication.getMember({ accessToken });
    if (!response) throw new Error("Failed to retrieve user info");
    return response;
}

