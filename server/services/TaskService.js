import mongoose from 'mongoose'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let _commentSchema = new Schema({
  authorId: { type: ObjectId, ref: 'User', required: true },
  content: { type: String, required: true }
}, { timestamps: true })

let _schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  authorId: { type: ObjectId, ref: 'List', required: true },
  comments: [_commentSchema]
}, { timestamps: true })



export default class TaskService {
  get repository() {
    return mongoose.model('Task', _schema)
  }
}