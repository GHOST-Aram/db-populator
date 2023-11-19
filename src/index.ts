import { User } from "./User.model";
import { createPictureUrl, fetchData } from "./utils"
import { images } from "./data";
import mongoose from "mongoose";
import 'dotenv/config'

const connectString = process.env.MONGODB_URI
if(connectString){
    mongoose.connect(connectString).then(result =>{
        console.log('Connected to DB')

        fetchData('https://jsonplaceholder.typicode.com/users')
        .then(async(data: any) =>{
            
            data.forEach(async(userInfo: any) => {
                
               
            });
            
        }).catch(error => console.log(
            'Fetch Failed: ', error.message
        ))

    }).catch(error => console.log(
        'Failed to connect to DB: ', error.message
    ))

} else {
    console.log('Connection string not found')
}
