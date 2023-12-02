import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';

function Page() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${id}`, {
        method: 'GET',
      });

      console.log(response);

      if (response.ok) {
        const userData = await response.json();

        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setAge(userData.age);
        setWeight(userData.weight);
      } else {
        console.error(response);
      }
    };

    fetchUser();
  }, [id]);

  const sendUpdateUserRequest = async () => {
    const updatedUser = {
      firstName: firstName,
      lastName: lastName,
      age: age,
      weight: weight
    };

    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser)
    });

    if (response.ok) {
      const createdUser = await response.json();
      console.log(`Updated user: ${JSON.stringify(createdUser)}`);

      router.push(`/users/${id}`);
    } else {
      console.error(response);
    }
  };

  return (
    <Form className="mt-3">
      <Form.Group controlId="first-name">
        <Form.Label>First Name</Form.Label>

        <Form.Control
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="last-name" className="mt-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="age" className="mt-3">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="weight" className="mt-3">
        <Form.Label>Weight</Form.Label>
        <Form.Control
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </Form.Group>

      <Button className="mt-3" variant="primary" type="button" onClick={sendUpdateUserRequest}>
        Submit
      </Button>
    </Form>
  );
};

export default Page;
