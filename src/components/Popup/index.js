import React, {useState} from 'react';
import SnackBar from '../SnackBar';
import {encodeDeepLink, decodeDeepLink} from './helper';

import './index.scss';

const Popup = () => {
	const [result, setResult] = useState('');
	const [decoded, setDecoded] = useState('');
	const [url, setUrl] = useState('');
	const [urlTitle, setUrlTitle] = useState('');
	const [deepLink, setDeepLink] = useState('');

	const handleUrlChange = (event) => {
		setUrlTitle(event.target.value);
		setUrl(event.target.value);
	};

	const handleChange = (event) => {
		setResult(event.target.value);
	};

	const handleCopyToClipboard = (event) => {
		if (event.target.value) {
			navigator.clipboard.writeText(event.target.value);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const {deepLink, title, url, authentication_mode, bar_color, loading_mode, back_style, back_action} = event.target;
		setResult(encodeDeepLink({
			deepLink: deepLink.value,
			title: title.value,
			url: url.value,
			authentication_mode: authentication_mode.value,
			bar_color: bar_color.value,
			loading_mode: loading_mode.value,
			back_style: back_style.value,
			back_action: back_action.value,
		}));
	};

	const handleDecodeDeepLink = () => {
		if (result.length) {
			setDecoded(decodeDeepLink(result));
		}
	};

	const handleGetCurrentUrl = () => {
		chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
			setUrl(tabs[0].url);
		});
	};

	const handleClearUrl = () => {
		setUrl('');
	};

	const handleDeepLinkChange = (e) => {
		setDeepLink(e.target.value);
	};

	const handleSetDeeplink = (value) => () => {
		setDeepLink(value);
	};

	return (
		<div className="c-popup">
			<SnackBar message="Error" show={false} />
			<div className="c-popup__header">
				<img alt="" src="img/walking.gif"/>
				<h3>encodeDeepLink to the past</h3>
				<img alt="" src="img/walking.gif"/>
			</div>
			<form className="c-popup__form" onSubmit={handleSubmit}>
				<label className="c-popup__label" htmlFor="deepLink">deepLink -
					<span className="c-popup__action" onClick={handleSetDeeplink('mercadopago://webview')}> Mercado Pago</span> -
					<span className="c-popup__action" onClick={handleSetDeeplink('meli://webview/')}> Meli</span> -
					<span className="c-popup__action" onClick={handleSetDeeplink('mercadopago://cx/help')}> Mario</span> -
					<span className="c-popup__action" onClick={handleSetDeeplink('')}> Clear</span>
				</label>
				<input type="edit" name="deepLink" value={deepLink} onChange={handleDeepLinkChange} placeholder="mercadopago://webview" id="deepLink"/>

				<label className="c-popup__label" htmlFor="url">url -
					<span className="c-popup__action" onClick={handleGetCurrentUrl}> Get current url</span> -
					<span className="c-popup__action" onClick={handleClearUrl}> Clear</span>
				</label>
				<input type="edit" name="url" id="url" value={url} title={urlTitle} placeholder={'https://mercadopago.com.ar/path?q=something'} onChange={handleUrlChange}/>

				<label className="c-popup__label" htmlFor="title">title:</label>
				<input type="edit" name="title" id="title"/>

				<div className="c-popup__items-wrapper">
					<div className="c-popup__items-inner-wrapper">
						<label className="c-popup__label" htmlFor="barColor">bar_color (ffffff):</label>
						<input type="barColor" name="bar_color" id="barColor"/>
					</div>
					<div className="c-popup__items-inner-wrapper">
						<label className="c-popup__label" htmlFor="auth">authentication_mode:</label>
						<select name="authentication_mode" id="auth">
							<option value="required">required</option>
							<option value="optional">optional</option>
							<option value="none">none</option>
							<option />
						</select>
					</div>
				</div>
				<div className="c-popup__items-wrapper">
					<div className="c-popup__items-inner-wrapper">
						<label className="c-popup__label" htmlFor="loading">loading_mode:</label>
						<select name="loading_mode" id="loading">
							<option value="none">none</option>
							<option value="loading">loading</option>
							<option />
						</select>
					</div>
					<div className="c-popup__items-inner-wrapper">
						<label className="c-popup__label" htmlFor="webTitle">use_web_title:</label>
						<select name="use_web_title" id="webTitle">
							<option />
							<option value="false">false</option>
							<option value="true">true</option>
						</select>
					</div>
				</div>
				<div className="c-popup__items-wrapper">
					<div className="c-popup__items-inner-wrapper">
						<label className="c-popup__label" htmlFor="backStyle">back_style:</label>
						<select name="back_style" id="backStyle">
							<option />
							<option value="arrow">arrow</option>
							<option value="cross">cross</option>
							<option value="none">none</option>
							<option value="menu">menu (Android)</option>
							<option value="default">default (IOS)</option>
						</select>
					</div>
					<div className="c-popup__items-inner-wrapper">
						<label className="c-popup__label" htmlFor="backAction">back_action:</label>
						<select name="back_action" id="backAction">
							<option />
							<option value="back">back</option>
							<option value="close">close</option>
						</select>
					</div>
				</div>

				<button>Generar</button>
			</form>

			<label className="c-popup__label--white" htmlFor="encoded">
				{`encoded deepLink (${result.length} caracteres)`}
				<img className="c-popup__copy-icon" alt="copy icon" src="img/copy-white.png" title="copiar encoded to clipboard" onClick={handleCopyToClipboard}/>
			</label>
			<textarea title={result} value={result} name="result" id="encoded" rows={5} onChange={handleChange} />
			<button onClick={handleDecodeDeepLink}>Decode</button>
			<label className="c-popup__label--white" htmlFor="decoded">
                decoded deepLink
				<img className="c-popup__copy-icon" alt="copy icon" src="img/copy-white.png" title="copiar decoded to clipboard" onClick={handleCopyToClipboard}/>
			</label>
			<textarea title={decoded} value={decoded} name="result" id="decoded" rows={4} wrap="off" readOnly />
		</div>
	);
};

export default Popup;
