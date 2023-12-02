import { getDbConnection } from '@/data/db-connection';

async function handler(req, res) {
  const { id } = req.query;
  console.log(`[${req.method}] [Users] ${id}`);

  const dbConnection = await getDbConnection();

  switch(req.method) {
  case 'GET':
    var results = await dbConnection.execute(`
      SELECT *
      FROM users
      WHERE id = ${id}
    `);

    var user = results[0][0];

    console.log(user);
    res.status(200).json(user);
    break;

  case 'PUT':
    var user = req.body;
    console.log(user);

    var sql = `
      UPDATE users
      SET firstName = ?,
          lastName = ?,
          age = ?,
          weight = ?
      WHERE id = ?
    `;
    var values = [user.firstName, user.lastName, user.age, user.weight, id];

    await dbConnection.execute(sql, values);

    res.status(200).json(user);
    break;

  case 'DELETE':
    var sql = `
      DELETE FROM users
      WHERE id = ?
    `;

    await dbConnection.execute(sql, [id]);

    res.status(200).json({ msg: 'Deleted successfully' });
    break;

  default:
    res.status(400).json({ msg: 'Invalid route' });
  }
}

export default handler;
