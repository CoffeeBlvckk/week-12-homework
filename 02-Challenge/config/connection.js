const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3001,
  user: 'root',
  password: '0719',
  database: 'employee_db'
})
module.exports = connection