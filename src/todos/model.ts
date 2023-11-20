import { Model, Schema, model } from "mongoose"

interface ITodo{
    title: string
    completed?: boolean
    createdAt?: Date
}

type TodoModel = Model<ITodo>

const todoSchema = new Schema<ITodo, TodoModel>({
    title: String,
    completed: { type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now()}
})

export const Todo = model<ITodo, TodoModel>('Todo', todoSchema)