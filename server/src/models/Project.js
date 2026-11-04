import mongoose from 'mongoose';
const projectSchema=new mongoose.Schema({
 name:{type:String,required:true,trim:true,maxlength:120},description:{type:String,trim:true,default:'',maxlength:3000},
 status:{type:String,enum:['PLANNING','ACTIVE','ON_HOLD','COMPLETED'],default:'ACTIVE',index:true},
 priority:{type:String,enum:['LOW','MEDIUM','HIGH'],default:'MEDIUM'},
 startDate:{type:Date,required:true},deadline:{type:Date,required:true,index:true},
 members:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}
},{timestamps:true});
projectSchema.index({status:1,deadline:1});
export default mongoose.model('Project',projectSchema);
