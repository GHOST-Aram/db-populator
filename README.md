# How to Populate DB with Test Data.
Testing is vital in the software development life cycle. During the software development, you occasionally need to test your application against data. One way to acquire test data is through manual entry. The problem with manual entry is that it's limited.  There is only so much data you can enter manually. A better option is to load the data to your database using a program separate from your application. In this article, we will learn how to write a program to upload test data to a test database.

To learn smoothly from this article, you should have a basic knowledge of the following.
- Creating simple programs with Node JS
- Working with Mongo DB
- Working with a database abstraction library. We will use Mongoose in this article.

We will learn how to upload test data to the database by performing the following actions:

1. Create a data model.
2. Fetch raw data from an API.
3. Connect to the database.
4. Populate the database with documents.

## 1. Create data model
Data models are essential in loading test data to the database. Models define the shape and properties of the data to be uploaded. The shape of the data you upload should be compatible with the specifications of our application. You need to create the same models as they are in the application you intenf to test. In this article, we will assume a todos model.

To define a model we need to install Mongoose using the command below.

```
npm install mongoose
```

Then we define the `Todo` model as follows.

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

We will use the above model to upload data to the database. 

Next, we fetch the raw data that we will use to create documents from the model.

## 2. Fetch data
In the previous step, we created a model for our data. In this section, we will get the raw data that we will use to create documents. We will fetch the raw data [this fake data API](https://jsonplaceholder.typicode.com).

Below is the code snippet that fetches the raw data.

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
Before sending data to the database, we need to connect to MongoDB. Get the connection string for your test database and connect to the database as shown in the code snippet below.

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

Now we have a database ready to receive our data, let us create documents and save them to the database in the next section.

## 4. Populate the database with documents.
In this section, we will create and save `Todo` documents for each instance of data in the `rawData` array. The code snippet below creates and saves data using the `Todo.create` method. We also log the `id` of the document we create. 

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
The execution of the above program populates the target database with `Todo` documents.


Finally, we have created a program that loads data that matches our model specification to the database. The program loads the data to the database by following steps listed below: 

- Create a model that fits the shape of the expected test data.
- Fetch raw data from the [jsonplaceholder API](https://jsonplaceholder.typicode.com/)
- Iterate over the test data and create a document for each instance of the raw data using the `Todo` model.
- Save the documents to the database.

The code we have written in this article and other well refactored examples on the same topic is available on [this repository](https://github.com/GHOST-Aram/db-populator).
