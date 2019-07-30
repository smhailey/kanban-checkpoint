import express from 'express'
import { Authorize } from '../middleware/authorize.js'
import _commentService from '../services/CommentService'

//Public
export default class CommentsController {
  constructor() {
    this.router = express.Router()
      .get('/:id', this.getById)
      .post('', this.create)
      .delete('/:id', this.delete)
      .use(Authorize.authenticated)
      .use(this.defaultRoute)
  }
  defaultRoute(req, res, next) {
    next({ status: 404, message: 'Route not found' })
  }
  async getById(req, res, next) {
    try {
      let data = await _commentService.findOne
        ({ _id: req.params.id, authorId: req.session.id })
      return res.send(data)
    } catch (error) { next(error) }
  }
  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _commentService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }
  async delete(req, res, next) {
    try {
      await _commentService.findOneAndRemove
        ({ _id: req.params.id, authorId: req.session.uid })
      return res.send('Deleted sucessfully')
    } catch (error) { next(error) }
  }
}