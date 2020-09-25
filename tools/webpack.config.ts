import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack, {Configuration as WebpackConfiguration} from "webpack";
import {Configuration as WebpackDevServerConfiguration} from "webpack-dev-server";
import TsconfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";
import OpenBrowserPlugin from "open-browser-webpack-plugin";

import * as paths from "./path.config";

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const isDev = process.argv.includes("--dev");

const webpackConfig: Configuration = {
    mode: isDev ? "development" : "production",
    devtool: isDev ? "cheap-module-eval-source-map" : "cheap-module-source-map",
    entry: {
        main: ["react-hot-loader/patch", "./src/entries/index.tsx"]
    },
    output: {
        path: paths.BUILD_DIR,
        filename: "scripts/[name].js",
        chunkFilename: "scripts/[name].js",
        publicPath: ""
    },
    devServer: {
        port: 8080,
        host: "localhost",
        contentBase: paths.BUILD_DIR,
        hot: true,
        hotOnly: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/entries/index.html",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            hash: true
        }),
        new webpack.ProvidePlugin({
            "React": "react",
        }),
        new webpack.NamedChunksPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({
            url: "http://localhost:8080/"
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    //在一些性能开销较大的loader之前添加cache-loader,以将结果缓存到磁盘里。
                    {
                        loader: "cache-loader"
                    },
                    {
                        loader: "babel-loader",
                        options: {
                            //@babel/preset-env，可以在项目中使用所有ECMAScript标准里的最新特性。
                            //@babel/preset-react，可以在项目中使用 react 语法。
                            //@babel/plugin-syntax-dynamic-import，可以在项目中使用import()这种语法
                            presets: ["@babel/preset-env", "@babel/preset-react"],
                            babelrc: false,
                            plugins: ["@babel/plugin-syntax-dynamic-import", "react-hot-loader/babel"]
                        }
                    },
                    //ts-loader用于将ts代码编译成js代码
                    {
                        loader: "ts-loader",
                        options: {}
                    }
                ],
                include: paths.SRC_DIR
            },
            {
                test: /.(css|scss)$/,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: "url-loader",
                options: {
                    limit: 8192,
                    name: "[name].[hash:8].[ext]",
                    outputPath: "images/"
                }
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg)$/,
                loader: "file-loader",
                options: {
                    name: "[hash].[ext]",
                    outputPath: "fonts/"
                }
            },
            {
                test: /\.(avi|mp3|mp4|mpg|ogg|wav|wmv)$/,
                loader: "file-loader",
                options: {
                    name: "[hash].[ext]",
                    outputPath: "media/"
                }
            }
        ]
    },
    resolve: {
        modules: ["node_modules"],
        extensions: [".js", ".ts", ".tsx"],
        plugins: [
            new TsconfigPathsWebpackPlugin({
                configFile: paths.SRC_DIR
            })
        ]
    }
};

export default webpackConfig;