const mongoose= require('mongoose')
 
const taskSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Title is required'],
        trim:true,
        maxlength:100
    },
    description:{
        type:String,
        trim:true,
        maxlength:500
    },
    completed:{
        type:Boolean,
        default:false
    },
    priority:{
        type:String,
        enum:['low','medium','high'],
        default:'medium'
    },
    dueDate:{
        type:Date
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},
{
    timestamps:true,
    collection:'tasks'
})

module.exports =mongoose.model('Task', taskSchema)