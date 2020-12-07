'use strict'
const WorkerProfile = use('App/Models/WorkerProfile');
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
class WorkerProfileController {
/**
     * Show a list of all WorkerProfile.
     * GET WorkerProfile
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index ({ request, response, view }) {
        let workerProfile = await WorkerProfile.query().fetch()
        
        return response.status(200).json(workerProfile)
    }

    /**
     * Render a form to be used for creating a new WorkerProfile.
     * GET WorkerProfile/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create ({ request, response, view }) {
    }

    /**
     * Create/save a new WorkerProfile.
     * POST WorkerProfile
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

        let workerProfile = await WorkerProfile.create(data)
        return response.ok(workerProfile)        
    }

    /**
     * Display a single alumno.
     * GET WorkerProfile/:User_id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show ({ params, request, response, view }) {
        let { id } = params    
        let workerProfile = await WorkerProfile.query().where('id', '=', id).fetch()
        if (workerProfile.rows == 0) {
            return response.status(404).json({data: 'Resource not found'})
        }
        return response.ok(workerProfile)
    }

    /**
     * Render a form to update an existing alumno.
     * GET WorkerProfile/:id/edit
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
     * PUT or PATCH WorkerProfile/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update ({ params, request, response }) {
        let workerProfile = await WorkerProfile.findOrFail(params.id)    
        let {...data} = request.all()
        const validation = await validate(request.all(), rules1)
        if (validation.fails()) {
            return validation.messages()
        }
        
        workerProfile.merge(data)
        await workerProfile.save()    
        
        return response.status(200).json(workerProfile)
    }

    /**
     * Delete a alumno with id.
     * DELETE WorkerProfile/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy ({ params, request, response }) {
        let { id } = params
        let workerProfile = await WorkerProfile.find(id)
        if (!workerProfile) {
            return response.status(404).json({data: 'Resource not found'})
        }
        await workerProfile.delete()
        return response.status(200).json(null)
    }
} 

module.exports = WorkerProfileController
