// import { getDbConnection } from '@/data/db-connection';

// async function handler(req, res) {
//   const { id } = req.query;
//   console.log(`[${req.method}] [Items] ${id}`);

//   const dbConnection = await getDbConnection();

//   switch(req.method) {
//   case 'GET':
//     var results = await dbConnection.execute(`
//       SELECT *
//       FROM items
//       WHERE id = ${id}
//     `);

//     var item = results[0][0];

//     console.log(item);
//     res.status(200).json(item);
//     break;

//   case 'PUT':
//     var item = req.body;
//     console.log(item);

//     var sql = `
//       UPDATE items
//       SET name = ?,
//           importance = ?,
//           due = ?,
//       WHERE id = ?
//     `;
//     var values = [item.name, item.importance, item.due, id];

//     await dbConnection.execute(sql, values);

//     res.status(200).json(item);
//     break;

//   case 'DELETE':
//     var sql = `
//       DELETE FROM items
//       WHERE id = ?
//     `;

//     await dbConnection.execute(sql, [id]);

//     res.status(200).json({ msg: 'Deleted successfully' });
//     break;

//   default:
//     res.status(400).json({ msg: 'Invalid route' });
//   }
// }

// export default handler;

import { getDbConnection } from '@/data/db-connection';

class Items {
  static async findById(id) {
    const dbConnection = await getDbConnection();

    const [results] = await dbConnection.execute(`
      SELECT *
      FROM items
      WHERE id = ?
    `, [id]);

    return results[0];
  }

  static async updateById(id, newItem) {
    const dbConnection = await getDbConnection();

    const sql = `
      UPDATE items
      SET name = ?,
          importance = ?,
          due = ?
      WHERE id = ?
    `;
    const values = [newItem.name, newItem.importance, newItem.due, id];

    await dbConnection.execute(sql, values);
  }

  static async deleteById(id) {
    const dbConnection = await getDbConnection();

    const sql = `
      DELETE FROM items
      WHERE id = ?
    `;

    await dbConnection.execute(sql, [id]);
  }
}

async function handler(req, res) {
  const { id } = req.query;
  console.log(`[${req.method}] [Items] ${id}`);

  switch (req.method) {
  case 'GET':
    try {
      const item = await Items.findById(id);
      console.log(item);
      res.status(200).json(item);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
    break;

  case 'PUT':
    try {
      const newItem = req.body;
      console.log(newItem);

      await Items.updateById(id, newItem);

      res.status(200).json(newItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
    break;

  case 'DELETE':
    try {
      await Items.deleteById(id);
      res.status(200).json({ msg: 'Deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
    break;

  default:
    res.status(400).json({ msg: 'Invalid route' });
  }
}

export { handler, Items as default };
