import mysql from 'mysql2/promise';

const configuration = {
  host: 'mysql', // This is the service name defined in the docker-compose file
  user: 'root',
  password: 'super',
  database: 'myDatabase'
};

let dbConnection = null;

async function getDbConnection() {
  if (dbConnection != null) {
    return dbConnection;
  }

  dbConnection = await mysql.createConnection(configuration);
  // .then(function(createdConnection) {
  //   dbConnection = createdConnection // This makes it globally available
  // });

  await dbConnection.connect();

  console.log('[Initiated database connection]');
  return dbConnection;
}

export { getDbConnection };
