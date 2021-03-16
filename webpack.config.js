const path = require('path');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './images',
              publicPath: './images',
              emitFile: true,
              esModule: true
            },
          },
        ], // End use array 
      }
    ]
  },

  plugins: [
    // Make sure that the plugin is after any plugins that add images, example `CopyWebpackPlugin`
    new ImageMinimizerPlugin({
      // bail: false, // Ignore errors on corrupted images
      maxConcurrency: 3,
      minimizerOptions: {
        // Before using imagemin plugins make sure you have added them in `package.json` (`devDependencies`) and installed them
 
        // Lossless optimization with custom option
        // Feel free to experiment with options for better result for you
        plugins: [
          // ["pngquant", { quality: [0.5, 0.5] }],
          // ["optipng", { optimizationLevel: 5 }],
          // ["jpegtran", { progressive: true }],
          // ["gifsicle", { interlaced: true, optimizationLevel:  3}],
          ["mozjpeg", { quality: 50,  progressive: true}],
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
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