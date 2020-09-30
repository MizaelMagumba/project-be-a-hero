
exports.up = function(knex) {
  return knex.schema.createTable('cases', function (table) {
      table.increments();

      table.string('title').notNullable();
      table.string('description').notNullable();
      table.decimal('value').notNullable();
      table.string('name');
      table.integer('size');
      table.string('filename');

      table.string('companies_id')
        .notNullable()
        .references('id')
        .inTable('companies')
        .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('cases');
};
