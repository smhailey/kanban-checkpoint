import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId


//Moved comment schema (placeholder text) back from Task Service to new Comment Service here

let _schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  taskId: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'List', required: true },


}, { timestamps: true })

export default mongoose.model('Comment', _schema)

