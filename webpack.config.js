const path = require('path');
const ImageminPlugin = require("imagemin-webpack");


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg|webp)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './images',
              publicPath: './images',
              emitFile: true,
              esModule: false
            },
          },
        ], // End use array 
      }
    ]
  },

  plugins: [
    // Make sure that the plugin is after any plugins that add images, example `CopyWebpackPlugin`
    new ImageminPlugin({
      bail: false, // Ignore errors on corrupted images
      cache: true,
      imageminOptions: {
        // Before using imagemin plugins make sure you have added them in `package.json` (`devDependencies`) and installed them
 
        // Lossless optimization with custom option
        // Feel free to experiment with options for better result for you
        plugins: [
          ["pngquant", { quality: [0.5, 0.5] }],
          ["mozjpeg", { quality: 50,  progressive: true}],
          ["gifsicle", { interlaced: true, optimizationLevel:  3}],
          ["jpegtran", { progressive: true }],
          ["optipng", { optimizationLevel: 5 }],
          [
            "svgo",
            {
              plugins: [
                {
                  removeViewBox: false
                }
              ]
            }
          ]
        ]
      }
    })
  ]

  
};



// 75 MB