
 module.exports = {
  context: __dirname + "/src",
  entry: './index.js',

  output: {
        filename: "bundle.js",
        path: __dirname + "/build",
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.(png|jpg)$/, loader: 'url?limit=25000'}
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx','.css'],
  }

};

