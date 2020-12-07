'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientUserSchema extends Schema {
  up () {
    this.create('client_users', (table) => {
      table.increments()
      table.string('User_id').notNullable().unique().defaultTo('23456789');
      table.integer('No_user').notNullable().unique().defaultTo('01293453');
      table.string('Name');
      table.string('Last_Name');
      table.string('Mother_Last_Name');
      table.integer('Day');
      table.integer('Month');
      table.integer('Year');
      table.string('Gender');
      table.string('Address');
      table.string('State ');
      table.string('Town');
      table.string('Cp');
      table.string('Phone');
      table.string('Status_User').notNullable().defaultTo('Active');
      table.string('Type_user').notNullable().defaultTo('Cliente');
      table.timestamps()
    })
  }

  down () {
    this.drop('client_users')
  }
}

module.exports = ClientUserSchema
