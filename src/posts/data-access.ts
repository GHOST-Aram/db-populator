import { HydratedUserDoc } from "../users/model";
import { Post } from "./model";
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

            console.log(`Post created ${dataCount+1} id: ${post.id}`)
            

            if(dbIsConnected()){
                const savedPost = await post.save()
                console.log(
                    `Post saved id: ${savedPost.id} `
                )
            }
        })
    }
}