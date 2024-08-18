import jwt from "jsonwebtoken";
import axios from "axios";

const APP_ID = process.env.REACT_APP_GITHUB_APP_ID;
const PRIVATE_KEY = process.env.REACT_APP_GITHUB_PRIVATE_KEY.replace(
  /\\n/g,
  "\n"
);

const generateJWT = () => {
  const payload = {
    iat: Math.floor(Date.now() / 1000), // Issued at time
    exp: Math.floor(Date.now() / 1000) + 600, // JWT expiration time (10 minutes)
    iss: APP_ID,
  };

  return jwt.sign(payload, PRIVATE_KEY, { algorithm: "RS256" });
};

const getInstallationAccessToken = async (installationId) => {
  const jwt = generateJWT();
  const response = await axios.post(
    `https://api.github.com/app/installations/${installationId}/access_tokens`,
    {},
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  return response.data.token;
};

export { getInstallationAccessToken };
