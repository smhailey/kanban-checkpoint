import TaskService from '../services/TaskService'
import express from 'express'
import { Authorize } from '../middleware/authorize'

//import service and create an instance
let _service = new TaskService()
let _repo = _service.repository

//Public
export default class TasksController {
  constructor() {
    this.router = express.Router()
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Authorize.authenticated)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
      .use(this.defaultRoute)
  }
  defaultRoute(req, res, next) {
    next({ status: 404, message: 'Route not found' })
  }
  async getAll(req, res, next) {
    try {
      //gets tasks by logged in user
      let data = await _repo.find({
        authorId: req.session.uid
      })
      return res.send(data)
    } catch (error) { next(error) }
  }
  async getById(req, res, next) {
    try {
      let data = await _repo.findOne({
        _id: req.params.id, authorId: req.session.id
      })
      return res.send(data)
    } catch (error) { next(error) }
  }
  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _repo.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }
  async edit(req, res, next) {
    try {
      let data = await _repo.findOneAndUpdate({
        _id: req.params.id, authorId: req.session.uid
      }, req.body, { new: true })
      if (data) {
        return res.send(data)
      }
      throw new Error('Invalid ID')
    } catch (error) { next(error) }
  }
  async delete(req, res, next) {
    try {
      await _repo.findOneAndRemove({
        _id: req.params.id, authorId: req.session.uid
      })
      return res.send('Deleted sucessfully')
    } catch (error) { next(error) }
  }
}