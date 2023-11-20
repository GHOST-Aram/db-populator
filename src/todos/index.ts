import mongoose from "mongoose"
import { Todo } from "./model"
import 'dotenv/config'

(async() =>{
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        const rawData:any = await response.json()

        const dbUri = process.env.MONGODB_URI

        if(dbUri){
            await mongoose.connect(dbUri)
            console.log('Db Connected')
            rawData.forEach(async(todo:any) => {
                const td = await Todo.create({
                    title: todo?.title,
                    completed: false
                })
                console.log(td.id)
            })

        } else{
            throw new Error('Coonection string not found')
        }
        
    } catch (error: any) {
        console.log(error.message)
    }

})()