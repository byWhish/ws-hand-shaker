import React, { useState } from 'react';

import './index.scss';

const Popup = () => {
	const [number, setNumber] = useState();
	const [show, setShow] = useState(false);
	const [message, setMessage] = useState('');

	const sendMessage = () => {
		if (number) {
			const url = `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
			chrome.tabs.create({ url });
		}
	};

	const handlePhoneNumberChange = (e) => {
		setNumber(e.target.value);
	};

	const handleCheckChange = (e) => {
		setShow(e.target.checked);
	};

	const handleMessageChange = (e) => {
		setMessage(e.target.value);
	};

	return (
		<div>
			<div className="c-popup">
				<div className="c-popup__layout">
					<input type="number" placeholder="Phone number" onChange={handlePhoneNumberChange} />
					<button onClick={sendMessage}>Init chat</button>
				</div>
				<img alt="ws_icon" src="icon.png" />
			</div>
			<div className="c-popup__message">
				<label>
					<input type="checkbox" onChange={handleCheckChange} /> Message
				</label>
				{show && <textarea rows={3} onChange={handleMessageChange} />}
			</div>
		</div>
	);
};

export default Popup;
