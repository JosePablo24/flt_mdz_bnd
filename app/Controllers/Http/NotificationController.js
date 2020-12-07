'use strict'
const Notification = use('App/Models/Notification');
const { validate } = use('Validator');
// const io = require('socket.io-client');
// const socket = io('http://localhost:3000')
const rules = {
    Client_user_id : 'required',
    Subject: 'required',
    From: 'required',
    Message : 'required'
};

class NotificationController {
  /**
    * Show a list of all Notification.
    * GET Notification
    *
    * @param {object} ctx
    * @param {Request} ctx.request
    * @param {Response} ctx.response
    * @param {View} ctx.view
    */
   async index ({ request, response, view }) {
     let notification = await Notification.query().fetch()
     
     return response.status(200).json(notification)
   }
 
   /**
    * Render a form to be used for creating a new Notification.
    * GET Notification/create
    *
    * @param {object} ctx
    * @param {Request} ctx.request
    * @param {Response} ctx.response
    * @param {View} ctx.view
    */
   async create ({ request, response, view }) {
   }
 
   /**
    * Create/save a new Notification.
    * POST Notification
    *
    * @param {object} ctx
    * @param {Request} ctx.request
    * @param {Response} ctx.response.with('asignaturas.horarios').with('asignaturas.profesor').fetch()
    */
   async store ({ request, response }) {
     const validation = await validate(request.all(), rules)
     if (validation.fails()) {
       return validation.messages()
     }    
     let {...data} = request.all()
 
     let notification = await Notification.create(data)
     return response.ok(notification)
     
   }
 
   /**
    * Display a single alumno.
    * GET Notification/:Client_user_id
    *
    * @param {object} ctx
    * @param {Request} ctx.request
    * @param {Response} ctx.response
    * @param {View} ctx.view
    */
   async show ({ params, request, response, view }) {
     let { id } = params     
     let notification = await Notification.query().where('Client_user_id', '=', id).fetch()
     if (notification.rows == 0) {
       return response.status(404).json({data: 'Resource not found'})
     }
     return response.ok(notification)
   }
 
   /**
    * Render a form to update an existing alumno.
    * GET Notification/:id/edit
    *
    * @param {object} ctx
    * @param {Request} ctx.request
    * @param {Response} ctx.response
    * @param {View} ctx.view
    */
   async edit ({ params, request, response, view }) {
   }
 
   /**
    * Update alumno details.
    * PUT or PATCH Notification/:id
    *
    * @param {object} ctx
    * @param {Request} ctx.request
    * @param {Response} ctx.response
    */
   async update ({ params, request, response }) {
     let notification = await Notification.findOrFail(params.id)    
     let {...data} = request.all()
     const validation = await validate(request.all(), rules1)
     if (validation.fails()) {
       return validation.messages()
     }
     
     notification.merge(data)
     await notification.save()    
     
     return response.status(200).json(notification)
   }
 
   /**
    * Delete a alumno with id.
    * DELETE Notification/:id
    *
    * @param {object} ctx
    * @param {Request} ctx.request
    * @param {Response} ctx.response
    */
   async destroy ({ params, request, response }) {
     let { id } = params
     let notification = await Notification.find(id)
     if (!notification) {
       return response.status(404).json({data: 'Resource not found'})
     }
     await notification.delete()
     return response.status(200).json(null)
   }
 }  
 

module.exports = NotificationController
