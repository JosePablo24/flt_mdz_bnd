'use strict'

const { RouteResource, RouteGroup } = require('@adonisjs/framework/src/Route/Manager')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.group(()=> {
    Route.resource('client_user', 'ClientUserController')
    Route.resource('notification','NotificationController')
    Route.resource('worker_request','WorkRequestController')
    Route.resource('worker_profile','WorkerProfileController')
}).prefix('api/v1')