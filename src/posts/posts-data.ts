import { HydratedUserDoc } from "../users/User.model";
import { Post } from "./Post.model";
import { formatText } from "../utils/formatter"
import { images } from "../utils/data";
import { Types } from "mongoose";
import { dbIsConnected } from "../utils/db";
            
export const createPost = (
    text: string, authorId: Types.ObjectId, imageIndex: number
) =>{
    return new Post({
        post_content: formatText(text),
        author: authorId,
        media_url: images[imageIndex]
    })
}

export const findAllPosts = async() =>{
    return await Post.find().select('id')
}
export const populatePosts = async(
    {authors, data }:{authors: HydratedUserDoc[], data:any}
) =>{
    let dataCount = 0
    let imageCount = 0

    for(let i = 0; i < data.length; i += 10){
        
        authors.forEach(async(author) =>{

            if (imageCount === images.length)
                imageCount = 0

            if(dataCount < data.length){
                return
            }
            
            const post = createPost(
                data[dataCount].body, author._id, imageCount
            )

            console.log(`post ${dataCount+1} id: ${post.id}`)
            imageCount ++
            dataCount ++
            

            if(dbIsConnected()){
                const savedPost = await post.save()
                console.log(
                    `Post number ${dataCount+1} created with id: ${savedPost.id} `)
            }
        })
    }
}