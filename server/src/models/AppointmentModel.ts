import {model, models, Schema, Types, InferSchemaType} from 'mongoose';




const appointmentSchema = new Schema(
    {
        patient:{
            type:Types.ObjectId,
            ref:'User',
            required:true
        },
        doctor:{
            type:Types.ObjectId,
            ref:'User',
            required:true
        },
        hospital:{
            type:Types.ObjectId,
            ref:'Hospital',
            required:true
        },
        appointmentDate:{
            type:Date,
            required:true
        },
        status:{
            type:String,
            enum:['pending','confirmed','cancelled','rejected','completed'],
            default:'pending'
        }
    },
    {
        timestamps:true
    }
)
