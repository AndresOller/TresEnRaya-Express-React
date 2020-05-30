// First step of 'Tres en raya' app backend
const app = require('./config/app');

// Run app
async function main() {
  await app.listen(app.get('port'));
  console.log('✔ Runned server on port', app.get('port'));
}

main();
module.exports = app;