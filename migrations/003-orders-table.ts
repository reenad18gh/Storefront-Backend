'use strict';

var dbm;
exports.setup = function(options) { dbm = options.dbmigrate; };

exports.up = function(db) {
  return db.runSql(`
    CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      status VARCHAR(20) CHECK (status IN ('active','complete')) NOT NULL
    );
  `);
};

exports.down = function(db) {
  return db.runSql(`DROP TABLE IF EXISTS orders;`);
};
