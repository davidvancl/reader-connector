import React from 'react';
import { Col } from 'react-bootstrap';

interface IProp {
	title: string;
	body: string;
}

function TextAreaComponent(props: IProp) {
	return (
		<Col className='col-md-4'>
			<h4 className='customer_text'>{props.title}</h4>
			<p className='many_text'>{props.body}</p>
		</Col>
	);
}

export default TextAreaComponent;
