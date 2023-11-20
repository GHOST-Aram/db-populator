import { connectToDB, disconnectFromDB } from "./utils/db"
import { getRawData } from "./utils/data"
import { populateComments } from "./comments/comments-populator"
import { findAllUsers, populateUsers } from "./users/user-data"
import { populatePosts, findAllPosts } from "./posts/posts-data"
import 'dotenv/config'


(async()=>{
    const connectString = process.env.MONGODB_URI
    if(connectString){
        try {
            await connectToDB(connectString)

            const rawCommentsData:any = await getRawData(
                'https://jsonplaceholder.typicode.com/comments'
            )
            const rawUsersData:any = await getRawData(
                'https://jsonplaceholder.typicode.com/users'
            )
            const rawPostsData:any = await getRawData(
                'https://jsonplaceholder.typicode.com/posts'
            )

            await populateUsers(rawUsersData)
            
            const authors = await findAllUsers()
            await populatePosts({
                authors: authors,
                data: rawPostsData
            })
            
            const posts = await findAllPosts()
            await populateComments({
                comments: rawCommentsData, 
                posts, 
                authors
            })

            // disconnectFromDB()
            
        } catch (error:any) {
            console.log(error.message)
        }
    } else{
        console.log('Connect string not found')
    }
})()
