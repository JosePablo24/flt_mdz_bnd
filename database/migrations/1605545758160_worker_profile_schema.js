'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WorkerProfileSchema extends Schema {
  up () {
    this.create('worker_profiles', (table) => {
      table.increments()

      table.integer('Client_user_id').unsigned().notNullable().references('id').inTable('client_users');
      table.string('Profile_img');
      table.string('background_img');
      table.string('Name ');
      table.string('Last_Name '); 
      table.string('Mother_Last_Name ');
      table.string('Rfc ');
      table.string('Address ');
      table.string('State ');
      table.string('Town ');
      table.integer('Cp ');
      table.string('Phone ');
      table.string('Proof_address ');
      table.string('Ine_or_Ife ');
      table.string('Contract ');
      table.string('Reference ');
      table.string('Plate ');
      table.string('Drivers_licence ');
      table.string('Car_picture_front ');
      table.string('Car_picture_back ');
      table.string('Car_picture_right_side ');
      table.string('Car_picture_left_side ');
      table.timestamps()
    })
  }

  down () {
    this.drop('worker_profiles')
  }
}

module.exports = WorkerProfileSchema
