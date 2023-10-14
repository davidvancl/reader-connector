import React from 'react';
import CreatableSelect from 'react-select/creatable';

export interface IOption {
	value: string;
	label: string;
}

interface IProps {
	placeholder: string;
	quartal: number;
	defaultValue: any;
	callback: (value: IOption) => void;
}

const IPAddressPartComponent = (props: IProps) => {
	const getQuartalOptions = () => {
		switch (props.quartal) {
			case 1:
				return [
					{ value: '192', label: '192' },
					{ value: '147', label: '147' },
					{ value: '172', label: '172' },
					{ value: '10', label: '10' }
				];
			case 2:
				return [
					{ value: '168', label: '168' },
					{ value: '8', label: '8' },
					{ value: '9', label: '9' },
					{ value: '0', label: '0' }
				];
			case 3:
				return [
					{ value: '1', label: '1' },
					{ value: '2', label: '2' },
					{ value: '10', label: '10' },
					{ value: '137', label: '137' }
				];
			case 4:
			default:
				return [
					{ value: '1', label: '1' },
					{ value: '44', label: '44' },
					{ value: '64', label: '64' },
					{ value: '200', label: '200' }
				];
		}
	};

	return (
		<CreatableSelect
			id={`ip-input-${props.quartal}`}
			key={props.defaultValue.value ?? ''}
			styles={{
				container: (base) => ({
					...base,
					flex: 1,
					borderRadius: 0
				}),
				control: (base) => ({
					...base,
					borderRadius: 0
				})
			}}
			defaultValue={props.defaultValue ?? ''}
			components={{ DropdownIndicator: null }}
			placeholder={props.placeholder ?? ''}
			options={getQuartalOptions()}
			onChange={(value, action) => {
				props.callback(value);
			}}
		/>
	);
};

export default IPAddressPartComponent;
