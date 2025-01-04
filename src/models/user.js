import mongoose from "mongoose";
const Shema = mongoose.Schema;

const userSchema = new Shema({
    name:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    },
    username:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        enum: ['ADMIN', 'MANAGER', 'EMPLEADO']
    }
});

const User = mongoose.model('User', userSchema);
export { User };