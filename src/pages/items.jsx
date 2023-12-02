import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';

function Page() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('/api/items', {
        method: 'GET'
      });

      if (response.ok) {
        const items = await response.json();
        console.log(`Items: ${JSON.stringify(items)}`);
        setItems(items);
      } else {
        console.error(response);
      }
    };

    fetchItems();
  }, []);

  // function deleteitem(previtems, id) {
  //   previtems.filter((item) => item.id !== id);
  // }

  const handleDelete = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this?');

    if (confirmation) {
      const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setItems((previtems) =>
          previtems.filter((item) => item.id !== id)
        );
      } else {
        console.error(response);
      }
    }
  };

  const rows = [];
  for (let item of items) {
    const key = `${item.id}`;

    const row = (
      <tr key={key}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.importance}</td>
        <td>{item.due}</td>
        <td>
          <Link href={`/items/${item.id}`}>Show</Link>
          <span> | </span>
          <Link href={`/items/${item.id}/edit`}>Edit</Link>
          <span> | </span>
          <Link href="" onClick={() => handleDelete(item.id)}>Delete</Link>
        </td>
      </tr>
    );

    rows.push(row);
  }

  return (
    <>
      <h1 className="my-4 text-2xl">List Items</h1>

      <Button variant="primary" href="items/new">Create</Button>

      <Table responsive="md" variant='dark' striped hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Importance</th>
            <th>Due</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {rows}
        </tbody>
      </Table>
    </>
  );
}

export default Page;
