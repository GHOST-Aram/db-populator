import { getRawUserData, populateUsers } from "./user-populator"

(async()=>{
    const data:any = await getRawUserData(
        'https://jsonplaceholder.typicode.com/users'
    )
    await populateUsers(data)
})()