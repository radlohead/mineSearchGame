const webpack = require('webpack');

module.exports = {
    entry: __dirname + '/src/Main.js',
    output:{
        filename: 'bundle.js'
    },
    module:{
        loaders:[{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query:{
                presets: ['es2015', 'es2016']
            }
        }]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ],
    devServer:{
        inline: true,
        port: 3000,
        contentBase: __dirname,
        historyApiFallback: true
    }
}