const production  = 'https://brodi-db.herokuapp.com/api/v1';
const development = 'http://localhost:5000/api/v1';
const url = (process.env.NODE_ENV ? production : development);

module.exports = url;