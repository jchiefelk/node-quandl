var path = require('path');

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
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=25000'},
      {
        test: /\.(png|gif|jpg)$/,
        include: [
          path.join(__dirname, 'static')
        ],
        loader: 'file-loader',
      }



    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css']
  }

};



