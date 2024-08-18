import jwt from "jsonwebtoken";
import axios from "axios";
import fs from "fs";
import path from "path";

const APP_ID = process.env.GITHUB_APP_ID;
const PRIVATE_KEY_PATH = path.join(__dirname, "path/to/private-key.pem");

const generateJWT = () => {
  const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, "utf8");
  const payload = {
    iat: Math.floor(Date.now() / 1000), // Issued at time
    exp: Math.floor(Date.now() / 1000) + 600, // JWT expiration time (10 minutes)
    iss: APP_ID,
  };

  return jwt.sign(payload, privateKey, { algorithm: "RS256" });
};

const listInstallations = async () => {
  const jwt = generateJWT();
  const response = await axios.get("https://api.github.com/app/installations", {
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  return response.data;
};

listInstallations()
  .then((installations) => {
    console.log("Installations:", installations);
  })
  .catch((error) => {
    console.error("Error listing installations:", error);
  });
