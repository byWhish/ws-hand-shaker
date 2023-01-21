import React from 'react';

import './index.scss';

const Popup = () => {
	const handleCreateTab = () => {
		const url = chrome.runtime.getURL('output.html?q=NewTab');
		chrome.tabs.create({url}, function(tab) {});
	};

	const handleGetCurrentUrl = () => {
		chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
			const url = tabs[0].url;
			let _url = url.replace(/(https?:\/\/)?(www.)?/i, '');
			_url = _url.split('.');
			_url = _url.slice(_url.length - 2).join('.');
			if (_url.indexOf('/') !== -1) {
				alert(_url.split('/')[0]);
			}
			// alert(url.substring(url.lastIndexOf('.', url.lastIndexOf('.') - 1) + 1));
		});
	};

	const handleRedirect = () => {
		chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
			const myNewUrl = 'https://www.google.com';
			const tab = tabs[0];
			chrome.tabs.update(tab.id, {url: myNewUrl});
		});
	};

	return (
		<div className="c-popup">
			<button onClick={handleCreateTab}>Create tab</button>
			<button onClick={handleGetCurrentUrl}>Get url</button>
			<button onClick={handleRedirect}>Redirect</button>
		</div>
	);
};

export default Popup;
