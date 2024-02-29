const jsonWebToken = require("jsonwebtoken");
const { UnAuthorizedResponse } = require("../utils/apiResponse");
const { findByLoginUserId } = require("../modules/User-Module/user.repository");
require("dotenv").config();

/**
 * 
 * @param {Integer} userId 
 * @returns Access and Refresh token
 * @comment Create Access and Refresh token.
 */
const createToken = (userId) => {
  const payload = {
    id: userId,
    TOKEN_AUDIENCE: process.env.USER_TOKEN_AUDIENCE,
    TOKEN_ISSUER: process.env.USER_TOKEN_ISSUER
  };

  const accessToken = jsonWebToken.sign({
    exp: Math.floor(Date.now() / 1000) + 10,
    date: payload
  }, process.env.USER_SECRET_KEY);

  const refreshToken = jsonWebToken.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
    data: payload,
  }, process.env.USER_REFRESH_SECRET_KEY);

  return { accessToken, refreshToken };
};

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {Next} next 
 * @returns Checking authorization of login id.
 */
const jwtUserVerify = (req, res, next) => {
  try {
    const Authtoken = req.headers['authorization'];
    if (Authtoken) {
      var token = Authtoken.split(" ")[1];
    }

    if (token && token != null && token != undefined) {
      jsonWebToken.verify(token, process.env.USER_SECRET_KEY, async (err, decoded) => {
        if (err) {
          return UnAuthorizedResponse(res, { msg: "Unauthorized token" });
        } else {
          req.user = decoded
          const userid = decoded.data.id;
          const user = await findByLoginUserId(userid);
          if (!user) {
            return UnAuthorizedResponse(res, { msg: "Unauthorized token" });
          }
          next();
        }
      });
    } else {
      return UnAuthorizedResponse(res, { msg: "No token provided." });
    }

  } catch (error) {
    return UnAuthorizedResponse(res, { msg: error.message });
  }
};

/**
 * 
 * @param {Refresh Tken} refreshToken 
 * @param {Response} res 
 * @returns A new Access and Refresh token
 */
const jwtRefresh = async (refreshToken, res) => {
  try {
    const refreshAuthtoken = refreshToken;

    if (refreshAuthtoken) {
      return jsonWebToken.verify(refreshAuthtoken, process.env.USER_REFRESH_SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({ msg: "Invalid refresh token" });
        } else {
          const userid = decoded.data.id;
          const { accessToken, refreshToken } = createToken(userid);
          return { accessToken, refreshToken };
        }
      });
    } else {
      return res.status(401).json({ msg: "No refresh token provided." });
    }

  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

module.exports = {
  createToken,
  jwtUserVerify,
  jwtRefresh
}