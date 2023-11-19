import { Schema,model, Model, ObjectId, HydratedDocument } from "mongoose"

export interface IPost{
    post_content: string
    likes: ObjectId[]
    reposts: ObjectId[]
    comments: ObjectId[]
    media_url: string
    media_file: Buffer
    author: ObjectId
    createdAt: Date
}

type PostModel = Model<IPost>

const postSchema = new Schema<IPost, PostModel>({
    post_content: String,
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    reposts:[
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    media_url:{
        type : String,
        trim: true
    },
    media_file: {
        data: Buffer,
        contentType: String,
    },
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}) 


export type HydratedPostDoc = HydratedDocument<IPost>
export const Post = model<IPost, PostModel>('Post', postSchema)