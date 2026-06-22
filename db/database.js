const Database = require('better-sqlite3'); // loads sqlite package
const path = require('path'); // loads path package for handling file paths
const fs = require('fs'); // loads file system package for reading files

const db = new Database(path.join(__dirname, 'links.db')); // creates a new SQLite database file named 'links.db' in the current directory

const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8'); // reads the SQL schema from 'schema.sql' file in the current directory as a UTF-8 string
db.exec(schema); // executes the SQL schema to create the necessary tables in the database if they do not already exist

module.exports = db; // exports the database connection for use in other parts of the application