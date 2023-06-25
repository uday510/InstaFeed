const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    next();
  }
  const token = authHeader.split(" ")[1]; // Authorization: Bearer "wryheyhehye"

  if (!token || token == "") {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "securedPrivateKey");
  } catch (error) {
    req.isAuth = false;
    console.log(err);
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};