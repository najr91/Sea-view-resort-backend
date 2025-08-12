import jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Token no recibido" });

  jwt.verify(token, process.env.SECRET_KEY_TOKEN, (err, userDecoded) => {
    if (err) return res.status(403).json({ message: "Token invalido" });

    req.user = userDecoded;

    return next();
  });
};
