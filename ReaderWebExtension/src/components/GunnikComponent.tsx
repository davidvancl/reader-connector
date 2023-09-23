import React, { useEffect, useState } from 'react';
import Gunn, { IGunInstance } from 'gun';
import { Form, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function GunnikComponent() {
  const [text, setText] = useState<string>();
  const [gun, setGun] = useState<IGunInstance<any>>();

  useEffect(() => {
    console.log('Starting server ...');
    setGun(Gunn('http://147.230.236.150:8765/gun'));
  }, []);

  useEffect(() => {
    if (gun !== undefined) {
      console.log('Registering event ...');
      gun.get('mark').on((data) => {
        setText(data.live);
      });
    }
  }, [gun]);

  const updateText = (event: any) => {
    setText(event.target.value);
    if (gun !== undefined) {
      gun.get('mark').get('live').put(event.target.value);
    }
  };

  return (
    <>
      <InputGroup>
        <InputGroup.Text>With textarea</InputGroup.Text>
        <Form.Control
          as="textarea"
          value={text}
          onChange={updateText}
          aria-label="With textarea"
        />
      </InputGroup>
    </>
  );
}

export default GunnikComponent;
