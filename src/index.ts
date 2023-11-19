import { User } from "./User.model";
import { Post } from "./Post.model";
import { Comment } from './Comment.model'
import { fetchData, formatText } from "./utils"
import { images } from "./data";
import mongoose from "mongoose";
import 'dotenv/config'

const connectString = process.env.MONGODB_URI
if(connectString){
    mongoose.connect(connectString).then(result =>{
        console.log('Connected to DB')

        fetchData('https://jsonplaceholder.typicode.com/comments')
        .then(async(comments: any) =>{
            
            let commentCount = 0
            let commentCount2 = 1
            const posts = await Post.find()
            const authors = await User.find()

          
            posts.forEach(post => {
                
                authors.forEach(async(author) => {
                    if(commentCount === comments.length)
                        commentCount = 0
                    
                    const comment = new Comment({
                        text: formatText(comments[commentCount].body),
                        author: author._id
                    })

                    commentCount ++
                    commentCount2++
                    console.log("Count1: ", commentCount, "Count 2: ", commentCount2)

                    console.log(commentCount2,' ', 'Comment Created: ', comment.id)

                    await Post.findByIdAndUpdate(post.id, {
                        $push:{ comments: comment._id }
                    })

                    await comment.save()
                    console.log(
                        "comment saved ID", comment.id," V", comment.__v)
                })

            })

        }).catch(error => console.log(
            'Fetch Failed: ', error.message
        ))

    }).catch(error => console.log(
        'Failed to connect to DB: ', error.message
    ))

} else {
    console.log('Connection string not found')
}
