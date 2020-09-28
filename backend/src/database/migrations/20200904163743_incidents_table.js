
exports.up = function(knex) {
  return knex.schema.createTable('cases', function (table) {
      table.increments();

      table.string('title').notNullable();
      table.string('description').notNullable();
      table.decimal('value').notNullable();

      table.string('ongs_id')
        .notNullable()
        .references('id')
        .inTable('ongs')
        .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('cases');
};
