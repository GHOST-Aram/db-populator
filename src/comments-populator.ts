import { HydratedUserDoc, User } from "./User.model";
import { HydratedPostDoc, Post } from "./Post.model";
import { Comment } from './Comment.model'
import { fetchData, formatText } from "./utils"
import { Types } from "mongoose";
import { dbIsConnected } from "./db";


        
            
// const posts = await Post.find().select('id')
// const authors = await User.find().select('_id')

export const populateComments = async(
    comments:any[], 
    posts: HydratedPostDoc[], 
    authors: HydratedUserDoc[]
) =>{
    let commentCount = 0
    let postCount = 0
    posts.forEach(post => {
        
        authors.forEach(async(author) => {
            if(commentCount === comments.length)
                commentCount = 0
            
            const text = comments[commentCount].body
            const comment = createComment(text, author._id)

            commentCount ++
            postCount++

            console.log('Comment Created: ', comment.id)

            // if(dbIsConnected()){
            //     await Post.findByIdAndUpdate(post.id, {
            //         $push:{ comments: comment._id }
            //     })

            //     await comment.save()
            //     console.log("Comment saved ", comment.id)
            // }
        })

    })

    console.log('Done: Posts: ', postCount)
}
          

        

const createComment = (text: string, authorId: Types.ObjectId) =>{
    return new Comment({
        text: formatText(text),
        author: authorId
    })
}