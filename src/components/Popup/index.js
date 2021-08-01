import React, {useState, useEffect} from 'react';
import SnackBar from '../SnackBar';
import {encodeDeepLink} from '../helper';

import './index.scss';

const Popup = () => {
	const [result, setResult] = useState('');
	const [url, setUrl] = useState('');
	const [urlTitle, setUrlTitle] = useState('');
	const [deepLink, setDeepLink] = useState('');

	const handleUrlChange = (event) => {
		setUrlTitle(event.target.value);
		setUrl(event.target.value);
		localStorage.setItem('deeplink_url', event.target.value);
	};

	const handleChange = (event) => {
		setResult(event.target.value);
	};

	const handleCopyToClipboard = (event) => {
		if (event.target.value) {
			navigator.clipboard.writeText(event.target.value);
		}
	};

	useEffect(() => {
		setUrl(localStorage.getItem('deeplink_url') ?? '');
		setResult(localStorage.getItem('deepLink') ?? '');
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		const {deepLink, title, url, authentication_mode, bar_color, loading_mode, back_style, back_action} = event.target;
		const resultDeepLink = encodeDeepLink({
			deepLink: deepLink.value,
			title: title.value,
			url: url.value,
			authentication_mode: authentication_mode.value,
			bar_color: bar_color.value,
			loading_mode: loading_mode.value,
			back_style: back_style.value,
			back_action: back_action.value,
		});
		localStorage.setItem('deepLink', resultDeepLink);
		setResult(resultDeepLink);
	};

	const handleDecodeDeepLink = () => {
		if (result.length) {
			const url = chrome.runtime.getURL(`output.html?q=${result}`);
			chrome.tabs.create({url}, function(tab) {});
		}
	};

	const handleGetCurrentUrl = () => {
		chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
			setUrl(tabs[0].url);
			localStorage.setItem('deeplink_url', event.target.value);
		});
	};

	const handleClearUrl = () => {
		setUrl('');
	};

	const handleClearResult = () => {
		setResult('');
		localStorage.setItem('deepLink', '');
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
							<option value="false">false</option>
							<option value="true">true</option>
							<option />
						</select>
					</div>
				</div>
				<div className="c-popup__items-wrapper">
					<div className="c-popup__items-inner-wrapper">
						<label className="c-popup__label" htmlFor="backStyle">back_style:</label>
						<select name="back_style" id="backStyle">
							<option value="arrow">arrow</option>
							<option value="cross">cross</option>
							<option value="none">none</option>
							<option value="menu">menu (Android)</option>
							<option value="default">default (IOS)</option>
							<option />
						</select>
					</div>
					<div className="c-popup__items-inner-wrapper">
						<label className="c-popup__label" htmlFor="backAction">back_action:</label>
						<select name="back_action" id="backAction">
							<option value="back">back</option>
							<option value="close">close</option>
							<option />
						</select>
					</div>
				</div>
				<div className="c-popup__items-wrapper">
					<div className="c-popup__items-inner-wrapper">
						<label className="c-popup__label" htmlFor="backStyle">refresh_mode:</label>
						<select name="back_style" id="backStyle">
							<option value="arrow">pull</option>
							<option value="none">none</option>
							<option value="menu">invalid</option>
							<option />
						</select>
					</div>
				</div>

				<button>Generar</button>
			</form>

			<label className="c-popup__label--white" htmlFor="encoded">
				{`encoded deepLink (${result.length} caracteres)`}
				<img className="c-popup__copy-icon" alt="copy icon" src="img/copy-white.png" title="copiar encoded to clipboard" onClick={handleCopyToClipboard}/>
				<span className="c-popup__action" onClick={handleClearResult}> Clear</span>
			</label>
			<textarea title={result} value={result} name="result" id="encoded" rows={5} onChange={handleChange} />
			<button onClick={handleDecodeDeepLink}>Decode</button>
		</div>
	);
};

export default Popup;
