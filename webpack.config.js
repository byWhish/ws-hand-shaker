const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
	devServer: {
		contentBase: path.resolve(__dirname, './src'),
		historyApiFallback: true,
	},
	entry: {
		popup: path.resolve(__dirname, './src/popup-index.js'),
		output: path.resolve(__dirname, './src/output-index.js'),
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
								'@babel/preset-react',
								{
									'plugins': ['@babel/plugin-proposal-class-properties'],
								},
							],
						},
					},
				],
			},
			{
				test: /\.html$/,
				use: ['html-loader'],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'popup.html',
			template: 'src/popup.html',
			chunks: ['popup'],
		}),
		new HtmlWebpackPlugin({
			filename: 'output.html',
			template: 'src/output.html',
			chunks: ['output'],
		}),
		new CopyWebpackPlugin({
			patterns: [
				{from: 'src/manifest.json', to: '[name][ext]'},
				{from: 'src/*.png', to: '[name][ext]'},
				{from: 'src/img/*.gif', to: 'img/[name][ext]'},
				{from: 'src/img/*.png', to: 'img/[name][ext]'},
			],
		}),
		new CleanWebpackPlugin(),
	],
};
