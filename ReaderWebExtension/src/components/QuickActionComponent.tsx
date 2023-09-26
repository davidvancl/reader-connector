import React from 'react';
import { Col } from 'react-bootstrap';

interface IProps {
	icon: any;
	title: string;
	actionName: string;
	actionCallback?: () => void;
}

function QuickActionComponent(props: IProps) {
	return (
		<Col>
			<div className='service_box'>
				<div className='breakfast_img'>{props.icon}</div>
			</div>
			<h4 className='breakfast_text'>{props.title}</h4>
			<div
				className='seemore_bt'
				onClick={() => {
					if (typeof props.actionCallback === 'function') {
						props.actionCallback();
					}
				}}>
				<div className='action-button'>{props.actionName}</div>
			</div>
		</Col>
	);
}

export default QuickActionComponent;
