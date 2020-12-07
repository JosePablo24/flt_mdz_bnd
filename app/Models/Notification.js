'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Notification extends Model {
    client_users(){
        return this.belongsTo('App/Models/ClientUser')
      }

}

module.exports = Notification
