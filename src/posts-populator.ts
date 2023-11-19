import { User } from "./User.model";
import { Post } from "./Post.model";
import { fetchData, formatText } from "./utils"
import { images } from "./data";
import mongoose from "mongoose";
import 'dotenv/config'

const connectString = process.env.MONGODB_URI
if(connectString){
    mongoose.connect(connectString).then(result =>{
        console.log('Connected to DB')

        fetchData('https://jsonplaceholder.typicode.com/posts')
        .then(async(data: any) =>{
            
            const authors = await User.find()
            let dataCount = 0
            let imageCount = 0


                for(let i = 0; i < data.length; i += 10){
                    
                    authors.forEach(async(author) =>{
        
                        if (imageCount === images.length)
                            imageCount = 0
        
                        const post = new Post({
                            post_content: formatText(data[dataCount].body),
                            author: author._id,
                            media_url: images[imageCount]
                        })
                        
                        const savedPost = await post.save()

                        imageCount ++
                        dataCount ++
                        
                        console.log(`Post number ${dataCount+1} created with id: ${savedPost.id} `)
                        
                    })
                }

       
        }).catch(error => console.log(
            'Fetch Failed: ', error.message
        ))

    }).catch(error => console.log(
        'Failed to connect to DB: ', error.message
    ))

} else {
    console.log('Connection string not found')
}
