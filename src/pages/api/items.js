// import { getDbConnection } from '@/data/db-connection';

// async function handler(req, res) {
//   console.log(`[${req.method}] [Items]`);

//   const dbConnection = await getDbConnection();

//   switch(req.method) {
//   case 'GET':
//     var results = await dbConnection.execute(`
//       SELECT *
//       FROM items
//     `);

//     const items = results[0];

//     console.log(items);
//     res.status(200).json(items);
//     break;

//   case 'POST':
//     console.log(req.body);

//     const item = req.body;

//     var sql = `
//       INSERT INTO items (name, importance, due)
//       VALUES (?, ?, ?)
//     `;
//     var values = [item.name, item.importance, item.due];

//     await dbConnection.execute(sql, values);

//     res.status(200).json(item);
//     break;

//   default:
//     res.status(400).json({ msg: 'Invalid route' });
//   }
// }

// export default handler;

import { getDbConnection } from '@/data/db-connection';

export default class Items {

  // static dbConnection = await getDbConnection();

  static async findAll() {
    const dbConnection = await getDbConnection();

    var results = await dbConnection.execute(`
      SELECT *
      FROM items
    `);

    const items = results[0];

    return items;
  }

  static async findById(id) {
    const dbConnection = await getDbConnection();

    var results = await dbConnection.execute(`
      SELECT *
      FROM items
      WHERE id = ${id}
    `);

    var item = results[0][0];

    return item;
  }
}
