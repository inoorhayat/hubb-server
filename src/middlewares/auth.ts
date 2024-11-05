import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";

// only admin has access
export const adminOnly = TryCatch(async (req, res, next)=>{
    const {id} = req.query;
    if (!id) return next (new ErrorHandler("Do Login First!", 401));
    const user = await User.findById(id);
    if (!user) return next (new ErrorHandler("User does not exist!", 401));
    if (user.role !== "admin") return next (new ErrorHandler("Sorry You are not admin!", 401));

    next();

});
