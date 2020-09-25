import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack, {Configuration as WebpackConfiguration} from "webpack";
import {Configuration as WebpackDevServerConfiguration} from "webpack-dev-server";
import TsconfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";
import OpenBrowserPlugin from "open-browser-webpack-plugin";
import {CleanWebpackPlugin} from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";

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
        hot: true, // 开启HMR功能
        hotOnly: true // 即使HMR没有生效，浏览器也不自动刷新
    },
    plugins: [
        // 在为生产环境编译文件的时候，先把 build或dist (就是放生产环境用的文件) 目录里的文件先清除干净，再生成新的。
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["**/*"]
        }),
        // 生成html文件
        new HtmlWebpackPlugin({
            template: "./src/entries/index.html",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            hash: true
        }),
        // 在使用时将不再需要import和require进行引入，直接使用即可。
        new webpack.ProvidePlugin({
            "React": "react",
        }),
        // 模块热替换插件
        new webpack.HotModuleReplacementPlugin(),
        // start后自动打开浏览器
        new OpenBrowserPlugin({
            url: "http://localhost:8080/"
        }),
        // css单独打包成一个文件
        new MiniCssExtractPlugin({
            filename: "styles/[name].[contenthash:8].css"
        }),
        // 打包后的内容束展示为图，openAnalyzer设置为false，不自动打开
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            analyzerHost: "127.0.0.1",
            analyzerPort: 8888,
            reportFilename: "report.html",
            defaultSizes: "parsed",
            openAnalyzer: false,
            generateStatsFile: false,
            statsFilename: "stats.json",
            statsOptions: null,
            logLevel: "info"
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
                    isDev ? "style-loader" : {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../"
                        }
                    },
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
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
    },

    // 优化
    optimization: {
        runtimeChunk: {
            name: "mainfest"
        },
        splitChunks: {
            cacheGroups: {
                default: false,
                commons: {
                    test: /[\\/]node_moudles[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCssAssetsPlugin(),
        ]

    }
};

export default webpackConfig;