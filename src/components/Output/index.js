import React, {useEffect, useState} from 'react';

import './index.scss';

const Options = () => {
	const [output, setOutput] = useState();

	useEffect(() => {
		const query = location.search.replace(/^.*?=/, '');
		setOutput(decodeURIComponent(query));
	}, []);

	return (
		<pre className="output">
			{output}
		</pre>
	);
};

export default Options;
