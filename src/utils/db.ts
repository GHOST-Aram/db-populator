import mongoose from "mongoose"

export const dbIsConnected = (): boolean =>{
    return Boolean(mongoose.connection)
}

export const connectToDB = async(dbUri: string) =>{
    await mongoose.connect(dbUri)
    const db = mongoose.connection

    db.on('error', 
        console.error.bind(console, 'Mongo connection Error')
    )
    console.log('Successfully conected to DB')
}

export const disconnectFromDB = async() =>{
    await mongoose.connection.close()
    console.log('Database connection closed.')
}