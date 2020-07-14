
exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
      tbl.increments()

      tbl.string('vin')
        .notNullable()
        .index()

      tbl.string('make')
        .notNullable()
        .index()

      tbl.string('model')
        .notNullable()
        .index()

      tbl.integer('mileage')
        .notNullable()
        .index()

      tbl.string('transmission')
        .index()

      tbl.string('title')
        .index()

  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("cars")
};
