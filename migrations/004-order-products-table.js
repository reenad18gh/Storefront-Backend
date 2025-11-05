'use strict';

var dbm;
exports.setup = function(options) { dbm = options.dbmigrate; };

exports.up = function(db) {
  return db.runSql(`
    CREATE TABLE order_products (
      id SERIAL PRIMARY KEY,
      order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
      product_id INTEGER REFERENCES products(id),
      quantity INTEGER NOT NULL
    );
  `);
};

exports.down = function(db) {
  return db.runSql(`DROP TABLE IF EXISTS order_products;`);
};
