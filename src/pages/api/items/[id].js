import { getDbConnection } from '@/data/db-connection';

async function handler(req, res) {
  const { id } = req.query;
  console.log(`[${req.method}] [Items] ${id}`);

  const dbConnection = await getDbConnection();

  switch(req.method) {
  case 'GET':
    var results = await dbConnection.execute(`
      SELECT *
      FROM items
      WHERE id = ${id}
    `);

    var item = results[0][0];

    console.log(item);
    res.status(200).json(item);
    break;

  case 'PUT':
    var item = req.body;
    console.log(item);

    var sql = `
      UPDATE items
      SET name = ?,
          importance = ?,
          due = ?,
      WHERE id = ?
    `;
    var values = [item.name, item.importance, item.due, id];

    await dbConnection.execute(sql, values);

    res.status(200).json(item);
    break;

  case 'DELETE':
    var sql = `
      DELETE FROM items
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
