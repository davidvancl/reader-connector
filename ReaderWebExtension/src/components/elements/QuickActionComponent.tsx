import React from 'react';

interface IProps {
    icon: any;
    title: string;
    description: string;
    actionTitle: string;
    callback?: () => void;
}

function QuickActionComponent(props: IProps) {
    const handleOnClick = () => {
        if (typeof props.callback === 'function') {
            props.callback();
        }
    }

    return (
        <div className="media text-muted pt-3">
            {props.icon ?? ''}
            <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                <div className="d-flex justify-content-between align-items-center w-100">
                    <strong className="text-gray-dark">{props.title ?? ''}</strong>
                    <button type="button" onClick={handleOnClick} className="btn btn-primary btn-sm" style={{ minWidth: 100 }}>{props.actionTitle ?? ''}</button>
                </div>
                <span className="d-block fst-italic">{props.description ?? ''}</span>
            </div>
        </div>
    );
}

export default QuickActionComponent;