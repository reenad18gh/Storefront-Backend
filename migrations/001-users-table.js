'use strict';

var dbm;
exports.setup = function(options) { dbm = options.dbmigrate; };

exports.up = function(db) {
  return db.runSql(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      firstname VARCHAR(100),
      lastname VARCHAR(100),
      password_digest VARCHAR(255)
    );
  `);
};

exports.down = function(db) {
  return db.runSql(`DROP TABLE IF EXISTS users;`);
};
