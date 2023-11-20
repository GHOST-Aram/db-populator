import { User } from "./User.model"
import { connectToDB, disconnectFromDB } from "./db"
import { populatePosts } from "./posts-populator"
import { getRawData } from "./utils"
import 'dotenv/config'


(async()=>{
    const connectString = process.env.MONGODB_URI
    if(connectString){
        try {
            const data:any = await getRawData(
                'https://jsonplaceholder.typicode.com/posts'
            )

            await connectToDB(connectString)
            const authors = await User.find().select('_id')

            await populatePosts(authors, data)
            await disconnectFromDB()
            
        } catch (error:any) {
            console.log(error.message)
        }
    } else{
        console.log('Connect string not found')
    }
    
})()