/* eslint global-require: 0, import/no-dynamic-require: 0 */
import path from "path";
import webpack from "webpack";
import { spawn } from "child_process";
import ExtractTextPlugin from "extract-text-webpack-plugin";

const port = process.env.PORT || 1212;
const publicPath = `http://localhost:${port}/dist`;

export default {
    devtool: "inline-source-map",

    target: "electron-renderer",

    entry: [
        "react-hot-loader/patch",
        `webpack-dev-server/client?http://localhost:${port}/`,
        "webpack/hot/only-dev-server",
        path.join(__dirname, "src/frontend/index.js")
    ],

    output: {
        path: path.join(__dirname, "src"),
        publicPath: `http://localhost:${port}/dist/`,
        filename: "renderer.dev.js",
        libraryTarget: "commonjs2"
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"],
        modules: [path.join(__dirname, "src"), "node_modules"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                        plugins: [
                            // Here, we include babel plugins that are only required for the
                            // renderer process. The 'transform-*' plugins must be included
                            // before react-hot-loader/babel
                            "transform-class-properties",
                            "transform-es2015-classes",
                            "react-hot-loader/babel"
                        ]
                    }
                }
            },
            {
                test: /\.global\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /^((?!\.global).)*\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: "[name]__[local]__[hash:base64:5]"
                        }
                    }
                ]
            },
            // SASS support - compile all .global.scss files and pipe it to style.css
            {
                test: /\.global\.(scss|sass)$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            includePaths: [path.resolve(__dirname, "./node_modules/")]
                        }
                    }
                ]
            },
            // SASS support - compile all other .scss files and pipe it to style.css
            {
                test: /^((?!\.global).)*\.(scss|sass)$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: "[name]__[local]__[hash:base64:5]"
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            includePaths: [path.resolve(__dirname, "./node_modules/")]
                        }
                    }
                ]
            },
            // WOFF Font
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff"
                    }
                }
            },
            // WOFF2 Font
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff"
                    }
                }
            },
            // TTF Font
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "application/octet-stream"
                    }
                }
            },
            // EOT Font
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: "file-loader"
            },
            // SVG Font
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "image/svg+xml"
                    }
                }
            },
            // Common Image Formats
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
                use: "url-loader"
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin({
            multiStep: true
        }),

        new webpack.NoEmitOnErrorsPlugin(),

        /**
         * Create global constants which can be configured at compile time.
         *
         * Useful for allowing different behaviour between development builds and
         * release builds
         *
         * NODE_ENV should be production so that modules do not perform certain
         * development checks
         *
         * By default, use 'development' as NODE_ENV. This can be overriden with
         * 'staging', for example, by changing the ENV variables in the npm scripts
         */
        new webpack.NamedModulesPlugin(),
        new webpack.EnvironmentPlugin({
            NODE_ENV: "development"
        }),

        new webpack.LoaderOptionsPlugin({
            debug: true
        }),

        new ExtractTextPlugin({
            filename: "[name].css"
        })
    ],

    node: {
        __dirname: false,
        __filename: false
    },

    devServer: {
        port,
        publicPath,
        compress: true,
        noInfo: true,
        stats: "errors-only",
        inline: true,
        lazy: false,
        hot: true,
        headers: { "Access-Control-Allow-Origin": "*" },
        contentBase: path.join(__dirname, "dist"),
        watchOptions: {
            aggregateTimeout: 300,
            ignored: /node_modules/,
            poll: 100
        },
        historyApiFallback: {
            verbose: true,
            disableDotRule: false
        },
        before() {
            if (process.env.START_HOT) {
                console.log("Starting Main Process...");
                spawn("npm", ["run", "start-main-dev"], {
                    shell: true,
                    env: process.env,
                    stdio: "inherit"
                })
                    .on("close", code => process.exit(code))
                    .on("error", spawnError => console.error(spawnError));
            }
        }
    }
};
