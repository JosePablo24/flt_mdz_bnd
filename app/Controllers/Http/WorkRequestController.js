'use strict'
const WorkRequest = use('App/Models/WorkRequest');
const { validate } = use('Validator');
// const io = require('socket.io-client');
// const socket = io('http://localhost:3000')
const rules = {
    Client_user_id: 'required',    
    Name: 'required',
    Last_Name: 'required',
    Mother_Last_Name: 'required',
    Rfc: 'required',
    Address: 'required',
    State: 'required',
    Town: 'required',
    Cp: 'required',
    Phone: 'required',
};

class WorkRequestController {    
    /**
     * Show a list of all WorkRequest.
     * GET WorkRequest
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index ({ request, response, view }) {
        let workRequest = await WorkRequest.query().fetch()
        
        return response.status(200).json(workRequest)
    }

    /**
     * Render a form to be used for creating a new WorkRequest.
     * GET WorkRequest/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create ({ request, response, view }) {
    }

    /**
     * Create/save a new WorkRequest.
     * POST WorkRequest
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

        let workRequest = await WorkRequest.create(data)
        return response.ok(workRequest)        
    }

    /**
     * Display a single alumno.
     * GET WorkRequest/:User_id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show ({ params, request, response, view }) {
        let { id } = params    
        let workRequest = await WorkRequest.query().where('id', '=', id).fetch()
        if (workRequest.rows == 0) {
            return response.status(404).json({data: 'Resource not found'})
        }
        return response.ok(workRequest)
    }

    /**
     * Render a form to update an existing alumno.
     * GET WorkRequest/:id/edit
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
     * PUT or PATCH WorkRequest/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update ({ params, request, response }) {
        let workRequest = await WorkRequest.findOrFail(params.id)    
        let {...data} = request.all()
        const validation = await validate(request.all(), rules1)
        if (validation.fails()) {
            return validation.messages()
        }
        
        workRequest.merge(data)
        await workRequest.save()    
        
        return response.status(200).json(workRequest)
    }

    /**
     * Delete a alumno with id.
     * DELETE WorkRequest/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy ({ params, request, response }) {
        let { id } = params
        let workRequest = await WorkRequest.find(id)
        if (!workRequest) {
            return response.status(404).json({data: 'Resource not found'})
        }
        await workRequest.delete()
        return response.status(200).json(null)
    }
}  

module.exports = WorkRequestController
