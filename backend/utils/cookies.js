const setCookies = (res, accessToken, refresh_token) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true, // prevents XSS attacks, cross site scripting attack
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // prevents CSRF attacks, cross site request forgery attack
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie("refreshToken", refresh_token, {
    httpOnly: true, // prevents XSS attacks, cross site scripting attack
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // prevents CSRF attacks, cross site request forgery attack
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};


export { setCookies };