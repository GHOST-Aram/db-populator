import { HydratedUserDoc } from "./User.model";
import { Post } from "./Post.model";
import { formatText } from "./utils"
import { images } from "./data";
import { Types } from "mongoose";
import { dbIsConnected } from "./db";
            
export const createPost = (
    text: string, authorId: Types.ObjectId, imageIndex: number
) =>{
    return new Post({
        post_content: formatText(text),
        author: authorId,
        media_url: images[imageIndex]
    })
}

export const populatePosts = async(
    authors: HydratedUserDoc[], data:any
) =>{
    let dataCount = 0
    let imageCount = 0

    for(let i = 0; i < data.length; i += 10){
        
        authors.forEach(async(author) =>{

            if (imageCount === images.length)
                imageCount = 0

            if(dataCount < data.length){
                const post = createPost(
                    data[dataCount].body, author._id, imageCount
                )
                console.log(`post ${dataCount+1} id: ${post.id}`)
            }
            
            imageCount ++
            dataCount ++
            

            // if(dbIsConnected()){
            //     const savedPost = await post.save()
            //     console.log(
            //         `Post number ${dataCount+1} created with id: ${savedPost.id} `)
            // }
        })
    }
}