import mongoose from "mongoose"

export const dbIsConnected = (): boolean =>{
    return Boolean(mongoose.connection)
}

export const connectToDB = async(dbUri: string) =>{
    mongoose.connect(dbUri)
    console.log('Successfully conected to DB')
}

export const disconnectFromDB = async() =>{
    await mongoose.connection.close()
    console.log('Database connection closed.')
}