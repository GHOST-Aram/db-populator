import { User } from "./User.model"
import { connectToDB, disconnectFromDB } from "./db"
import { getRawData } from "./utils"
import { Post } from "./Post.model"
import 'dotenv/config'
import { populateComments } from "./comments-populator"


(async()=>{
    const connectString = ''
    if(connectString){
        try {
            const comments:any = await getRawData(
                'https://jsonplaceholder.typicode.com/comments'
            )

            await connectToDB(connectString)
            const authors = await User.find().select('_id')
            const posts = await Post.find().select('id')

            await populateComments({comments, posts, authors})
            disconnectFromDB()
            
        } catch (error:any) {
            console.log(error.message)
        }
    } else{
        console.log('Connect string not found')
    }
})()