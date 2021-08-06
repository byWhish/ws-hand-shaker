import React from 'react';

const ParamSelect = ({id, name, label, options}) => (
	<div className="c-popup__items-inner-wrapper">
		<label className="c-popup__label" htmlFor={id}>{label}</label>
		<select name={name} id={id}>
			{options.map((value) => (
				<option key={id} value={value}>{value}</option>
			))}
			<option />
		</select>
	</div>
);

export default ParamSelect;
