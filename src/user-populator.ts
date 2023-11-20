import { User } from "./User.model";
import { createPictureUrl } from "./utils"
import { images } from "./data";
import { dbIsConnected } from "./db"

const createUser = (userInfo:any, index: number) =>{
    return new User({
        first_name: userInfo.name.split(' ')[0],
        last_name: userInfo.name.split(' ')[1],
        bannerUrl: images[index],
        pictureUrl: createPictureUrl(index),
        email: userInfo.email,
        city: userInfo.address.city,
        region: userInfo.address.street,
        password: 'password'
    })
}

export const populateUsers = async(data:any[])=>{

    data.forEach((userInfo:any, index:number) =>{

        const user = createUser(userInfo, index)
        
        if(dbIsConnected()){
            user.save()
        }
    } )
}