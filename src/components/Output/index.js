import React, {useEffect, useState} from 'react';
import {decodeDeepLink} from '../helper';

import './index.scss';

const Options = () => {
	const [output, setOutput] = useState();

	useEffect(() => {
		const query = location.search.replace(/^.*?=/, '');
		setOutput(decodeDeepLink(decodeURIComponent(query)));
	}, []);

	return (
		<div className="output">
			{output}
		</div>
	);
};

export default Options;
