import _taskService from '../services/TaskService'
import _commentService from '../services/CommentService'
import express from 'express'
import { Authorize } from '../middleware/authorize'

//Public
export default class TasksController {
  constructor() {
    this.router = express.Router()
      .get('/:id', this.getById)
      .get('/:id/comments', this.getCommentsByTaskId)
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
      let data = await _taskService.findOne
        ({ _id: req.params.id, authorId: req.session.id })
      return res.send(data)
    } catch (error) { next(error) }
  }
  async getCommentsByTaskId(req, res, next) {
    try {
      let data = await _commentService.find
        ({ taskId: req.params.id })
      return res.send(data)
    } catch (error) { next(error) }
  }
  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _taskService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }
  async delete(req, res, next) {
    try {
      await _taskService.findOneAndRemove
        ({ _id: req.params.id, authorId: req.session.uid })
      return res.send('Deleted sucessfully')
    } catch (error) { next(error) }
  }
}