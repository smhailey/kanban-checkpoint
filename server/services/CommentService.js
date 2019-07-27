import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let _schema = new Schema({
  title: { type: String, required: true },
  taskId: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'List', required: true },
}, { timestamps: true })

export default mongoose.model('Comment', _schema)

