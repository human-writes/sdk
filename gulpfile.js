import gulp from "gulp";
import webpack from "webpack-stream";

import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

gulp.task("default", () =>
    gulp
        .src("./bootstrap.js")
        .pipe(
            webpack({
                // Any configuration options...
                // Path to your entry point. From this file Webpack will begin its work
                entry: "./bootstrap.js",

                // Path and filename of your result bundle.
                // Webpack will bundle all JavaScript into this file
                output: {
                    path: path.resolve(__dirname, "dist"),
                    publicPath: "",
                    filename: "human-writes.min.js"
                },

                module: {
                    rules: [
                        {
                            test: /\.mjs$/,
                            exclude: /(node_modules)/,
                            use: {
                                loader: "babel-loader",
                                options: {
                                    presets: ["@babel/preset-env"]
                                }
                            }
                        }
                    ]
                },

                mode: "production"
            })
        )
        .pipe(gulp.dest("dist/"))
);
