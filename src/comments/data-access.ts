import { HydratedUserDoc } from "../users/model";
import { HydratedPostDoc, Post } from "../posts/model";
import { Comment } from './model'
import { formatText } from "../utils/formatter"
import { dbIsConnected } from "../utils/db";


interface CommentsPopulationData{
    comments:any[], 
    posts: HydratedPostDoc[], 
    authors: HydratedUserDoc[]
}    
            
// const posts = await Post.find().select('id')
// const authors = await User.find().select('_id')

/**
 * 
 * Add one comment per author on each post for All posts posts
 * Restart wrting from coment index 0 if the loop reaches the end
 * of comments data list before commenting on all posts
 */
export const populateComments = async(
   { comments, posts, authors }: CommentsPopulationData
) =>{
    let commentCount = 0
    posts.forEach(post => {
        authors.forEach(async(author) => {
            if(commentCount === comments.length)
                commentCount = 0
            
            const comment = new Comment({
                text:formatText(comments[commentCount].body) ,
                author: author._id
            })

            commentCount ++

            console.log('Comment Created: ', comment.id)

            if(dbIsConnected()){
                await Post.findByIdAndUpdate(post.id, {
                    $push:{ comments: comment._id }
                })

                await comment.save()
                console.log("Comment saved ", comment.id)
            }
        })

    })

}
          

        

