import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';

function Page() {
  const [name, setName] = useState('');
  const [importance, setImportance] = useState('');
  const [due, setDue] = useState('');

  const router = useRouter();

  const sendCreateItemRequest = async () => {
    const newItem = {
      name: name,
      importance: importance,
      due: due,
    };

    console.log(newItem);

    const response = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    });

    console.log(response);

    if (response.ok) {
      const createdItem = await response.json();
      console.log(`Created item: ${JSON.stringify(createdItem)}`);

      router.push('/items');
    } else {
      console.error(response);
    }
  };

  return (
    <Form className="mt-3">
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>

        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="importance" className="mt-3">
        <Form.Label>Importance</Form.Label>
        <Form.Control
          type="text"
          value={importance}
          onChange={(e) => setImportance(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="age" className="mt-3">
        <Form.Label>Due by</Form.Label>
        <Form.Control
          type="text"
          value={due}
          onChange={(e) => setDue(e.target.value)}
        />
      </Form.Group>

      <Button className="mt-3" variant="primary" type="button" onClick={sendCreateItemRequest}>
        Submit
      </Button>
    </Form>
  );
};

export default Page;
