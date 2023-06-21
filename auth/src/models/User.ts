import mongoose from 'mongoose';
import { Password } from '../services';


interface UserAttrs {
    email: string;
    password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attr: UserAttrs): UserDoc
}

interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
    transform(doc, ret) {
     ret.id = ret._id
     delete ret._id
     delete ret.__v
     delete ret.password
    }
}, 
timestamps: true
})

userSchema.pre("save", async function(done) {
 if (this.isModified('password')) {
    const hashedPassword = await Password.toHash(this.password)
    
    this.password = hashedPassword;
 }
 done()
})

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export {User}