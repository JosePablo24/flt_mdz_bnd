'use strict'
const Client_user = use('App/Models/ClientUser');
const { validate } = use('Validator');
// const io = require('socket.io-client');
// const socket = io('http://localhost:3000')
const rules = {
    User_id: 'required',
    No_user: 'required',
    Type_user : 'required'    
};
const rules1 ={
  Name: 'required'
}

class ClientUserController {
    /**
   * Show a list of all Client_user.
   * GET Client_user
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let client_user = await Client_user.query().fetch()
    
    return response.status(200).json(client_user)
  }

  /**
   * Render a form to be used for creating a new Client_user.
   * GET Client_user/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new Client_user.
   * POST Client_user
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

    let client_user = await Client_user.create(data)
    return response.ok(client_user)
    
  }

  /**
   * Display a single alumno.
   * GET Client_user/:User_id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let { id } = params    
    let client_user = await Client_user.query().where('User_id', '=', id).fetch()
    if (client_user.rows == 0) {
      return response.status(404).json({data: 'Resource not found'})
    }
    return response.ok(client_user)
  }

  /**
   * Render a form to update an existing alumno.
   * GET Client_user/:id/edit
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
   * PUT or PATCH Client_user/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    let client_user = await Client_user.findOrFail(params.id)    
    let {...data} = request.all()
    const validation = await validate(request.all(), rules1)
    if (validation.fails()) {
      return validation.messages()
    }
    
    client_user.merge(data)
    await client_user.save()    
    
    return response.status(200).json(client_user)
  }

  /**
   * Delete a alumno with id.
   * DELETE Client_user/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    let { id } = params
    let client_user = await Client_user.find(id)
    if (!client_user) {
      return response.status(404).json({data: 'Resource not found'})
    }
    await client_user.delete()
    return response.status(200).json(null)
  }
}

module.exports = ClientUserController
