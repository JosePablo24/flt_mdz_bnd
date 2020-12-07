'use strict'

const { foreignKey } = require('@adonisjs/lucid/src/Lucid/Model')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ClientUser extends Model {
    notifications(){
        return this.hasMany('App/Models/Notification')
      }
}

module.exports = ClientUser
