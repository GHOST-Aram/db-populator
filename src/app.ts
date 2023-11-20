import { User } from "./User.model"
import { connectToDB, disconnectFromDB } from "./db"
import { populatePosts } from "./posts-populator"
import { getRawData } from "./utils"
import { Post } from "./Post.model"
import 'dotenv/config'
import { populateComments } from "./comments-populator"


(async()=>{
    const connectString = process.env.MONGODB_URI
    if(connectString){
        try {
            const data:any = await getRawData(
                'https://jsonplaceholder.typicode.com/comments'
            )

            await connectToDB(connectString)
            const authors = await User.find().select('_id')
            const posts = await Post.find().select('id')

            await populateComments(data, posts, authors)
            disconnectFromDB()
            
        } catch (error:any) {
            console.log(error.message)
        }
    } else{
        console.log('Connect string not found')
    }
})()