import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';

function Page() {
  const [name, setName] = useState('');
  const [importance, setImportance] = useState('');
  const [due, setDue] = useState('');

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchItem = async () => {
      const response = await fetch(`/api/items/${id}`, {
        method: 'GET',
      });

      console.log(response);

      if (response.ok) {
        const itemData = await response.json();

        SetName(itemData.name);
        setImportance(itemData.importance);
        setDue(itemData.due);
      } else {
        console.error(response);
      }
    };

    fetchItem();
  }, [id]);

  const sendUpdateItemRequest = async () => {
    const updatedItem = {
      name: name,
      importance: importance,
      due: due
    };

    const response = await fetch(`/api/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem)
    });

    if (response.ok) {
      const createdItem = await response.json();
      console.log(`Updated item: ${JSON.stringify(createdItem)}`);

      router.push(`/items/${id}`);
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

      <Form.Group controlId="due" className="mt-3">
        <Form.Label>Due By</Form.Label>
        <Form.Control
          type="text"
          value={due}
          onChange={(e) => setAge(e.target.value)}
        />
      </Form.Group>

      <Button className="mt-3" variant="primary" type="button" onClick={sendUpdateItemRequest}>
        Submit
      </Button>
    </Form>
  );
};

export default Page;
