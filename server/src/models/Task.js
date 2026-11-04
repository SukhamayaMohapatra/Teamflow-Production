import mongoose from 'mongoose';
const updateSchema=new mongoose.Schema({author:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},message:{type:String,required:true,trim:true,maxlength:1500}},{timestamps:true});
const taskSchema=new mongoose.Schema({
 title:{type:String,required:true,trim:true,maxlength:160},description:{type:String,trim:true,default:'',maxlength:4000},
 project:{type:mongoose.Schema.Types.ObjectId,ref:'Project',required:true,index:true},
 assignee:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},
 status:{type:String,enum:['TO_DO','IN_PROGRESS','UNDER_REVIEW','COMPLETED'],default:'TO_DO',index:true},
 priority:{type:String,enum:['LOW','MEDIUM','HIGH'],default:'MEDIUM',index:true},
 deadline:{type:Date,required:true,index:true},progress:{type:Number,min:0,max:100,default:0},
 updates:[updateSchema],createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}
},{timestamps:true});
taskSchema.pre('save',function(next){if(this.status==='COMPLETED')this.progress=100;next();});
taskSchema.index({project:1,status:1,assignee:1});
export default mongoose.model('Task',taskSchema);
