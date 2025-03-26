import axios from "axios";
import { AuthResponse } from "../types/types";

// This information should ideally be stored in environment variables but i have it like this since when u run the app locally it works 
const GRANT_TYPE = "client_credentials";
const CLIENT_ID = "78845621-b958-4dca-9dff-b75cda41c604";
const CLIENT_SECRET = "21617fc5-5da1-4eeb-97c4-9e7f3e6f2886";
const AUTH_URL =
  "https://sso.omno.com/realms/omno/protocol/openid-connect/token";

let accessToken: string | null = null;
let tokenExpiry: number | null = null;

export async function getAccessToken(): Promise<string> {
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    console.log("Returning existing access token.");
    return accessToken;
  }

  try {
    const response = await axios.post<AuthResponse>(
      AUTH_URL,
      new URLSearchParams({
        grant_type: GRANT_TYPE,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      {
        headers: {
          accept: "application/json",
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );

    accessToken = response.data.access_token;
    tokenExpiry = Date.now() + response.data.expires_in * 1000;

    console.log(" New Access Token Obtained");
    return accessToken;
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    throw new Error("Failed to obtain access token.");
  }
}
