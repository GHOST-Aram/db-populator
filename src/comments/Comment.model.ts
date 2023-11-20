import { Model, Schema, model, Types, HydratedDocument } from "mongoose"

export interface IComment{
    author: Types.ObjectId
    text: string,
    createdAt?: Date

}

type CommentModel = Model<IComment>
const commentSchema = new Schema<IComment, CommentModel>({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },    
    text: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export type HydratedCommentDoc = HydratedDocument<IComment>
export const Comment = model<IComment, CommentModel>('Comment', commentSchema)