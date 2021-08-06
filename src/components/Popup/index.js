import React, {useState, useEffect} from 'react';
import SnackBar from '../SnackBar';
import {encodeDeepLink} from '../helper';
import ParamSelect from './ParamSelect';

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
		const {target} = event;
		const resultDeepLink = encodeDeepLink({
			deepLink: target.deepLink.value,
			title: target.title.value,
			url: target.url.value,
			authentication_mode: target.authentication_mode.value,
			bar_color: target.bar_color.value,
			loading_mode: target.loading_mode.value,
			back_style: target.back_style.value,
			back_action: target.back_action.value,
			refresh_mode: target.refresh_mode.value,
			opv: target.opv.value,
			hides_bottom_bar: target.hides_bottom_bar.value,
			toolbar_elevation: target.toolbar_elevation.value,
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
			const url = tabs[0].url;
			setUrl(url);
			localStorage.setItem('deeplink_url', url);
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
					<ParamSelect id="auth" name="authentication_mode" label="authentication_mode:" options={['required', 'optional', 'none']} />
				</div>
				<div className="c-popup__items-wrapper">
					<ParamSelect id="loading" name="loading_mode" label="loading_mode:" options={['none', 'loading']} />
					<ParamSelect id="webTitle" name="use_web_title" label="use_web_title:" options={['false', 'true']} />
				</div>
				<div className="c-popup__items-wrapper">
					<ParamSelect id="backStyle" name="back_style" label="back_style:" options={['arrow', 'cross', 'none', 'menu', 'default']} />
					<ParamSelect id="backAction" name="back_action" label="back_action:" options={['back', 'close']} />
				</div>
				<div className="c-popup__items-wrapper">
					<ParamSelect id="refreshMode" name="refresh_mode" label="refresh_mode:" options={['pull', 'none', 'invalid']} />
					<ParamSelect id="opv" name="opv" label="opv:" options={['fend', 'native']} />
				</div>
				<div className="c-popup__items-wrapper">
					<ParamSelect id="hidesBottomBar" name="hides_bottom_bar" label="hides_bottom_bar:" options={['true', 'false']} />
					<ParamSelect id="toolbarElevation" name="toolbar_elevation" label="toolbar_elevation:" options={['none', 'default']} />
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
