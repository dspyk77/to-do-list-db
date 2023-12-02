import { getDbConnection } from '@/data/db-connection';

async function handler(req, res) {
  console.log(`[${req.method}] [Users]`);

  const dbConnection = await getDbConnection();

  switch(req.method) {
  case 'GET':
    var results = await dbConnection.execute(`
      SELECT *
      FROM users
    `);

    const users = results[0];

    console.log(users);
    res.status(200).json(users);
    break;

  case 'POST':
    console.log(req.body);

    const user = req.body;

    var sql = `
      INSERT INTO users (firstName, lastName, age, weight)
      VALUES (?, ?, ?, ?)
    `;
    var values = [user.firstName, user.lastName, user.age, user.weight];

    await dbConnection.execute(sql, values)

    res.status(200).json(user);
    break;

  default:
    res.status(400).json({ msg: 'Invalid route' });
  }
}

export default handler;
