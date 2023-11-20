import mongoose from "mongoose"

export const dbIsConnected = (): boolean =>{
    return Boolean(mongoose.connection)
}