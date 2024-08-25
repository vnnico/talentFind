const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.HASH, async (error, decodedToken) => {
      if (!error) {
        req.user = decodedToken._id;
        next();
      } else {
        return res.status(401).json({ error: "Request is not authorized" });
      }
    });
  } else {
    return res.status(401).json({ msg: "Authorization token required" });
  }
};

module.exports = isAuth;
