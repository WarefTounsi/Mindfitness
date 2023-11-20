const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require('../schema/schemaUser')

exports.protect = expressAsyncHandler(async (req, res, next) => {
    let token;
  
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return res.status(400).json({
            message:"No token provided"
        })
    }
    try {
      const decoded = await promisify(jwt.verify)(token, `${process.env.JWT_SECRET}`);
      const freshUser = await User.findById(decoded.id);
      if (!freshUser) {
        return res.status(401).json({
            message:"Invalid token "
        })
      }
  
      req.user = freshUser;
  
      next();
    } catch (err) {
        return res.status(400).json({
            message:err.message
        })
    }
  });