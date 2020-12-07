'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotificationsSchema extends Schema {
  up () {
    this.create('notifications', (table) => {
      table.increments();
      table.integer('Client_user_id').unsigned().notNullable().references('id').inTable('client_users');
      table.string('Subject').notNullable();
      table.string('From').notNullable();
      table.text('Message').notNullable();
      table.string('Status').notNullable().defaultTo('Unread');
      table.timestamps();
    })
  }

  down () {
    this.drop('notifications')
  }
}

module.exports = NotificationsSchema
