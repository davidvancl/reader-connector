import React, { useEffect, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { browser } from "webextension-polyfill-ts";

function CommunicationComponent() {
  const updateText = (event: any) => {
    browser.runtime.sendMessage({ action: "changeText" });
  };

  return (
    <>
      <InputGroup>
        <InputGroup.Text>With textarea</InputGroup.Text>
        <Form.Control
          as="textarea"
          onChange={updateText}
          aria-label="With textarea"
        />
      </InputGroup>
    </>
  );
}

export default CommunicationComponent;
