import {AppError} from '../utils/errors.js';
export const validate=(schema)=>(req,_res,next)=>{const parsed=schema.safeParse({body:req.body,params:req.params,query:req.query});if(!parsed.success)return next(new AppError(parsed.error.issues.map(i=>`${i.path.join('.')}: ${i.message}`).join('; '),400));req.validated=parsed.data;next();};
