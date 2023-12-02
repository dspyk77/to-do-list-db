import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';

function Page() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users', {
        method: 'GET'
      });

      if (response.ok) {
        const users = await response.json();
        console.log(`Users: ${JSON.stringify(users)}`);
        setUsers(users);
      } else {
        console.error(response);
      }
    };

    fetchUsers();
  }, []);

  // function deleteuser(prevusers, id) {
  //   prevusers.filter((user) => user.id !== id);
  // }

  const handleDelete = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this?');

    if (confirmation) {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setUsers((prevusers) =>
          prevusers.filter((user) => user.id !== id)
        );
      } else {
        console.error(response);
      }
    }
  };

  const rows = [];
  for (let user of users) {
    const key = `${user.id}`;

    const row = (
      <tr key={key}>
        <td>{user.id}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.age}</td>
        <td>{user.weight}</td>
        <td>
          <Link href={`/users/${user.id}`}>Show</Link>
          <span> | </span>
          <Link href={`/users/${user.id}/edit`}>Edit</Link>
          <span> | </span>
          <Link href="" onClick={() => handleDelete(user.id)}>Delete</Link>
        </td>
      </tr>
    );

    rows.push(row);
  }

  return (
    <>
      <h1 className="my-4 text-2xl">Users</h1>

      <Button variant="primary" href="users/new">Create</Button>

      <Table responsive="md" variant='dark' striped hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Weight</th>
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
