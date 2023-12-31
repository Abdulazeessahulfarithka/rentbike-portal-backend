import JWT from "jsonwebtoken";
import userModel from "../Models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin acceess

// adminMiddleware.js

export const isAdmin = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    console.log(user);
    if (!user) {
      return res.status(401).json({
        success: true,
        message: "User not found",
      });
    }

    // if (user.role !== "1") {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Unauthorized Access",
    //   });
    // }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};