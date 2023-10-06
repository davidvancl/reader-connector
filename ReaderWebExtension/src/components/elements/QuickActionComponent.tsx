import React from 'react';

interface IProps {
	icon?: any;
	title: string;
	dataTestid?: string;
	description?: string;
	actionTitle?: string;
	callback?: () => void;
}

function QuickActionComponent(props: IProps) {
	const handleOnClick = () => {
		if (typeof props.callback === 'function') {
			props.callback();
		}
	};

	return (
		<div
			className='media text-muted pt-3'
			data-testid={`${props.dataTestid ?? ''}`}>
			{props.icon ?? ''}
			<div className='media-body pb-3 mb-0 small lh-125 border-bottom border-gray'>
				<div className='d-flex justify-content-between align-items-center w-100'>
					<strong
						className='text-gray-dark'
						data-testid='action-title'>
						{props.title ?? ''}
					</strong>
					{props.actionTitle ? (
						<button
							type='button'
							data-testid='action-button'
							onClick={handleOnClick}
							className='btn btn-primary btn-sm'
							style={{ minWidth: 100 }}>
							{props.actionTitle ?? ''}
						</button>
					) : (
						''
					)}
				</div>
				<span
					className='d-block fst-italic'
					data-testid='action-description'>
					{props.description ?? ''}
				</span>
			</div>
		</div>
	);
}

export default QuickActionComponent;
