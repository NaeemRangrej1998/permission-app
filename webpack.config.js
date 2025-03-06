// const { ModuleFederationPlugin } = require('webpack').container;
// const fs = require('fs');
// const path = require('path');
//
// const webpackConfigPath = 'react-scripts/config/webpack.config';
// const webpackConfig = require(webpackConfigPath);
//
// const override = (config) => {
//     const mfConfigPath = path.resolve(__dirname, 'moduleFederation.config.js');
//
//     if (fs.existsSync(mfConfigPath)) {
//         const mfConfig = require(mfConfigPath);
//         config.plugins.push(new ModuleFederationPlugin(mfConfig));
//         config.output.publicPath = 'auto';
//     }
//     return config;};
// require.cache[require.resolve(webpackConfigPath)].exports = (env) =>
//     override(webpackConfig(env));
// module.exports = require(webpackConfigPath);
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const webpack = require('webpack');

const deps = require("./package.json").dependencies;

const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
    let isDevelopment = true;
    let envFile = 'dev';
    if (env.qa || env.uat || env.prod) {
        isDevelopment = false;
        envFile = env.prod ? 'prod' : env.qa ? 'qa' : 'uat';
    }
    console.log("isDevelopment" + ":" + envFile + " " + "isDevelopment:" +isDevelopment)
    return {
        entry: './src/index.js',  // Entry point
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "dist"),
            publicPath: "auto", // ✅ Fixes issues with loading remoteEntry.js
        },
        mode: argv.mode,
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,   // For JS and JSX files
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    }
                },
                {
                    test: /\.css$/,  // For CSS files
                    use: [MiniCssExtractPlugin.loader, 'css-loader']
                },
                {
                    test: /\.scss$/, // For SCSS files
                    use: [
                        MiniCssExtractPlugin.loader, // Extracts CSS into separate files
                        "css-loader",   // Translates CSS into CommonJS
                        "sass-loader"   // Compiles Sass to CSS
                    ],
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,  // Image assets
                    type: 'asset/resource'
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,  // Font assets
                    type: 'asset/resource'
                }
            ]
        },
        plugins: [
            new ModuleFederationPlugin({
                name: "permissionApp",
                filename: "remoteEntry.js",
                remotes: {
                    "container": "container@http://localhost:3000/remoteEntry.js",
                },
                exposes: {
                    "./Course":"./src/App"
                },
                shared: {
                    react: { singleton: true, strictVersion: true, requiredVersion: deps.react },
                    "react-dom": { singleton: true, strictVersion: true, requiredVersion: deps["react-dom"] },
                    "react-redux": { singleton: true, strictVersion: true, requiredVersion: deps["react-redux"] },
                    "@reduxjs/toolkit": { singleton: true, strictVersion: true, requiredVersion: deps["@reduxjs/toolkit"] },
                    "redux-persist": { singleton: true, strictVersion: true, requiredVersion: deps["redux-persist"] }
                },
            }),
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                template: "./public/index.html", // ✅ Ensure the correct path
                filename: "index.html",
                inject: "body",
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
            new Dotenv({
                path: path.resolve(__dirname, `env/.env.${envFile}`), // ✅ Ensures correct path
            })
        ],
        devServer: {
            historyApiFallback: true,
            static: {
                directory: path.resolve(__dirname, 'dist'),
            },
            compress: true,
            port: 3010,
            hot: true,
            open: true,  // ✅ Automatically open the browser
        },
        resolve: {
            extensions: ['.js', '.jsx'],
        }
    }
};
