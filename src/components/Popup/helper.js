const paramsToObject = (entries) => {
	const result = {};
	for (const [key, value] of entries) { // each 'entry' is a [key, value] tupple
		result[key] = value;
	}
	return result;
};

const encodeDeepLink = ({deepLink, url, title, ...rest}) => {
	if (!deepLink) return 'Error: se debe ingresar el deepLink';
	if (!url) return 'Error: se debe ingresar la url';

	const encodedTitle = title && typeof title === 'string' ? `&title=${encodeURIComponent(title)}` : '';

	const encodedParams = new URLSearchParams({
		url,
		...pickBy(rest),
	}).toString();

	return `${deepLink}?${encodedParams}${encodedTitle}`;
};

const decodeDeepLink = (deepLink) => {
	const baseRegExp = /^.+[?]/;
	const deepLinkBase = baseRegExp.exec(deepLink) ? baseRegExp.exec(deepLink)[0] : '';
	const cleanQS = new URLSearchParams(deepLink.replace(baseRegExp, ''));
	const params = paramsToObject(cleanQS);
	return JSON.stringify(pickBy({base: deepLinkBase, ...params}), null, 2);
};

/**
 * Remove empty attributes
 * @param {object} object
 * @returns {object}
 */
/* istanbul ignore next */
const pickBy = (object) => {
	const obj = {};
	Object.keys(object).forEach((key) => {
		if (object[String(key)]) {
			obj[String(key)] = object[String(key)];
		}
	});
	return obj;
};

export {encodeDeepLink, pickBy, decodeDeepLink};
