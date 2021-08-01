import React from 'react';

import './index.scss';

const SnackBar = ({message, show, onClose = (x) => x}) => {
	// eslint-disable-next-line no-unused-vars
	const handleClose = () => {
		onClose();
	};

	return show && (
		<div className="c-snack-bar">
			{message}
			<div className="c-snack-bar__button">Cerrar</div>
		</div>
	);
};

export default SnackBar;
