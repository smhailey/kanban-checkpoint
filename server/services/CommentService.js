import mongoose from "mongoose"
let Schema = mongoose.Schema

//REVIEW Do we need another Schema here? The Comment Schema is already written in the Task Service. When moved here, it wasn't happy. Without it, the export below isn't happy either.

export default mongoose.model('Comment', _schema)

