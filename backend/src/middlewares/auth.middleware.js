import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
export const verifyJWT = asyncHandler(async (req, _, next) => {
  //because of no response used we can also use _
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");


    if (!token) {
      throw new ApiError(401, "Unauthorized Request");
    }
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || "access_secret_12345"
    );
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Invalid Access Token.");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token.");
  }
});

// export const softVerifyJWT = asyncHandler(async (req, _, next) => {
//   try {
//     const token =
//       req.cookies?.accessToken ||
//       req.header("Authorization")?.replace("Bearer ", "");

//     if (token) {
//       const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//       const user = await User.findById(decodedToken?._id).select(
//         "-password -refreshToken"
//       );
//       if (user) req.user = user;
//     }
//     next();
//   } catch (error) {
//     next();
//   }
// });
