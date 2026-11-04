import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import {AppError} from '../utils/errors.js';
export const requireAuth=asyncHandler(async(req,_res,next)=>{
 const token=req.cookies?.accessToken;
 if(!token) throw new AppError('Authentication required',401);
 let payload;try{payload=jwt.verify(token,process.env.JWT_SECRET);}catch{throw new AppError('Session expired or invalid',401);}
 const user=await User.findById(payload.sub);
 if(!user||!user.isActive) throw new AppError('Account unavailable',401);
 req.user=user;next();
});
export const requireRole=(...roles)=>(req,_res,next)=>{if(!req.user||!roles.includes(req.user.role))return next(new AppError('You do not have permission to perform this action',403));next();};
