# How to Populate DB with Test Data.
Testing is important in the software development life cycle. During the development process, you will ocassionally want to test your application with some data. One way to acquire test data is through manual entry. The problem with manual entry is that its limited.  There is only so much data you can enter manually. A better option is to load the data to your database using a different program. This article will show you how to write a program to upload test dta to your test database.

To learn smoothly from this article, you should have basic knowledge of the following.
- Writing programs with Node JS
- Working with Mongo DB
- Working with a database abstration library. This article uses Mongoose.

We will learn how to upload test data o the databse by performing the following actions:

1. Create data model.
2. Fetch raw data from an API.
3. Connect to the database.
4. Populate the database with documents.

## 1. Create data model
Data models are important in loading test data to the database. Models define the shape and properties of the data we will upload. The shape of the data you upload should be compatible with the specifications of our application. You should define the exact same models that you defined for your application. In this article, we will assume a todos model.

To define a model we need to install Mongoose using the command below.

```
npm install mongoose
```

The we define the `Todo` model as follows.

```
import { Model, Schema, model } from "mongoose"

interface ITodo{
    title: string
    completed?: boolean
}

type TodoModel = Model<ITodo>

const todoSchema = new Schema<ITodo, TodoModel>({
    title: String,
    completed: { type: Boolean, default: false}
})

export const Todo = model<ITodo, TodoModel>('Todo', todoSchema)
```

We will use the above model to upload data to the database. Next, we fetch the raw data that we will use to creat documents from the model.

## 2. Fecth data
In the previous step, we created a model for our data. In this section, we will get the raw data that we will use to create documents.We will fetch the raw data [this fake data API](https://jsonplaceholder.typicode.com).

Below is the code snippet for fetching the raw data.

```
(async() =>{
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        const rawData = await response.json()
        
        
    } catch (error: any) {
        console.log(error.message)
    }

})()
```

After fetching the data from the API, let us connect the database in the next step before we can create documents.

## 3. Connect to the database.
Before we begin to send data to the database, we need to connect to a MongoDB. Get the connection string for your database and connect to the database as shown in the code snippet below.

```
import mongoose from "mongoose"

(async() =>{
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        const rawData = await response.json()

        const dbUri = 'Your db uri'

        if(dbUri){
            await mongoose.connect(dbUri)
        }
        
    } catch (error: any) {
        console.log(error.message)
    }

})()
```

Now we have a database ready to receive our data, let us creat documents and save to the database in the next section.

## 4. Populate the database with documents.
In this section we will create and save todo documents for each instance of the data in the `rawData` array. The code snippet below creates and saves data using the `Todo.create` method.

```
import mongoose from "mongoose"
import { Todo } from "./model"

(async() =>{
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        const rawData = await response.json()

        const dbUri = process.env.MONGODB_URI

        if(dbUri){
            await mongoose.connect(dbUri)

            //Populated db with documents   
            rawData.forEach(async(todo:any) => {
                const todoDoc = await Todo.create({
                    title: todo?.title,
                    completed: false
                })

                console.log('Created: ', todoDoc.id)
            })
        }
        
    } catch (error: any) {
        console.log(error.message)
    }

})()
```
The excution of the above program loads the target database with todo documents.


In conclusion, we have created a program that loads the data hat matches our model to te database. The program loads the data to the database by following simle steps listed below: 

- Create a model that fits the shape of the test data.
- Fetch test data from an API
- Iterate over the test data and create a document for each instance of the raw data using `Todo` model.
- Save the documents to the database.

The code we have writen in this article plus other well refactored examples on the same topic is availabe on [this repository](https://github.com/GHOST-Aram/db-populator).