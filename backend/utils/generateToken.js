import jwt from "jsonwebtoken";

const genTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECERT, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECERT, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export default genTokens;