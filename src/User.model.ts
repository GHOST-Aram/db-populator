import { HydratedDocument, Model, ObjectId, Schema, model } from "mongoose"
import { hash } from "bcrypt"

export interface IUser{
    profileId: string
    last_name: string
    first_name: string
    middle_name: string
    pictureUrl: string
    bannerUrl: string
    city: string
    region: string
    email: string
    banner_file: Buffer
    picture_file: Buffer
    password: string
    friends: ObjectId[]
    requests_sent: ObjectId[]
    requests_received: ObjectId[]
    createdAt: Date

}

interface UserVirtuals{
    name: string
}

export type UserModel = Model<IUser, {}, UserVirtuals>

const userSchema: Schema = new Schema<
IUser, UserModel, {}, {}, UserVirtuals>({
    profileId: {
        type: String,
        trim: true,
    },
    last_name: {
        type: String,
        trim: true,
    },
    first_name: {
        type: String,
        trim: true,
    },
    middle_name: {
        type: String,
        trim: true,
    },
    pictureUrl: {
        type: String,
        trim: true,
    },
    bannerUrl:{
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
        default: undefined
    },
    region:  {
        type: String,
        trim: true,
        default: undefined
    },
    email:  {
        type: String,
        trim: true,
        default: undefined
    },
    banner_file: {
        data: Buffer,
        contentType: String,
    },
    picture_file: {
        data: Buffer,
        contentType: String,
    },
    password: String,
    friends: {
        type:  [Schema.Types.ObjectId],
        ref: 'User'
    },
    requests_sent:{
        type:  [Schema.Types.ObjectId],
        ref: 'User'
    },
    requests_received: {
        type:  [Schema.Types.ObjectId],
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

userSchema.virtual('name').get(function(){
    return `${this.first_name} ${this.last_name}`
})

userSchema.pre('save', async function(next){
    const hashepassword = await hash(this.password, 10)
    this.password = hashepassword
    
    next()
})

export type HydratedUserDoc = HydratedDocument<
IUser, UserVirtuals>

export const User = model<IUser, UserModel>('User', userSchema) 