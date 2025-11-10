'use strict';

var dbm;
exports.setup = function(options) { dbm = options.dbmigrate; };

exports.up = function(db) {
  return db.runSql(`
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      price INTEGER NOT NULL,
      category VARCHAR(100)
    );
  `);
};

exports.down = function(db) {
  return db.runSql(`DROP TABLE IF EXISTS products;`);
};
