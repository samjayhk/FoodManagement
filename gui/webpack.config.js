const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/public/index.html`,
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: [
	'webpack-dev-server/client?http://0.0.0.0:4000',
    './src/index.js',
  ],
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
		loader: 'babel-loader',
		query: {
		  presets: ['@babel/preset-env', '@babel/preset-react'],
		},
      }, {
		test: /\.css$/,
        use: [
          { loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
	  }, {
		test: /\.svg$/,
	    loader: 'svg-react-loader'
	  }, {
		test: /\.(png|jpg|gif|ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
				name: '[hash].[ext]'
			}  
          }
        ]
	  }
    ],
  },
  devServer: {
	  historyApiFallback: true,
    inline: true,
    port: 4000,
	disableHostCheck: true,
  },
  plugins: [HTMLWebpackPluginConfig],
};