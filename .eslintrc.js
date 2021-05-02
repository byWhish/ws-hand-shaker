module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
	},
	'extends': [
		'plugin:react/recommended',
		'google',
	],
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true,
		},
		'ecmaVersion': 12,
		'sourceType': 'module',
	},
	'plugins': [
		'react',
	],
	'rules': {
		'indent': [
			'warn',
			'tab',
		],
		'no-tabs': [
			'off',
		],
		'quotes': [
			'warn',
			'single',
		],
		'semi': [
			'warn',
			'always',
		],
		'camelcase': [
			'off',
		],
		'max-len': [
			'warn',
			220,
			2,
			{
				'ignoreUrls': true,
				'ignoreComments': false,
			},
		],
		'react/prop-types': [
			'off',
		],
	},
};
