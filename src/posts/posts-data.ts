import { HydratedUserDoc } from "../users/User.model";
import { Post } from "./Post.model";
import { formatText } from "../utils/formatter"
import { images } from "../utils/data";
import { Types } from "mongoose";
import { dbIsConnected } from "../utils/db";

interface PostData{
    text: string, 
    authorId: Types.ObjectId, 
    imageIndex: number
}
export const createPost = (
    {text, authorId,imageIndex}:PostData
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

    for(let i = 0; i < data.length; i += 10){
        authors.forEach(async(author, index) =>{
            if(dataCount >= data.length){
                return
            }
            
            const post = createPost(
                {
                    text:data[dataCount].body, 
                    authorId:author._id, 
                    imageIndex:index
                }
            )
            dataCount ++

            console.log(`post ${dataCount+1} id: ${post.id}`)
            

            if(dbIsConnected()){
                const savedPost = await post.save()
                console.log(
                    `Post number ${dataCount+1} created with id: ${savedPost.id} `
                )
            }
        })
    }
}