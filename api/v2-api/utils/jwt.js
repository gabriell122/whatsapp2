const jwt = require("jsonwebtoken");
const key = "minhaCHAVEeESSAaqui";

// VALIDA O TOKEN JWT
function VerificarToken({ token }) {
  try {
    const decoded = jwt.verify(token, key);
    return decoded;
  } catch (err) {
    return false;
  }
}
// GERA O TOKEN JWT
function GerarToken({ user }) {
  return jwt.sign(user, key, { expiresIn: "1h" });
}

module.exports = { VerificarToken, GerarToken };
