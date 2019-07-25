import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId


//REVIEW Do we need another Schema here? The Comment Schema is already written in the Task Service. When moved here, it wasn't happy. Without it, the export below isn't happy either.

let _schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  taskId: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'List', required: true },


}, { timestamps: true })

export default mongoose.model('Comment', _schema)

