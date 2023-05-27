const gulp = require("gulp");
const webpack = require("webpack-stream");
const path = require("path");

gulp.task("default", () => gulp
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
        filename: "human-writes.min.js",
      },

      module: {
        rules: [{
          test: /\.mjs$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        }],
      },

      // Default mode for Webpack is production.
      // Depending on mode Webpack will apply different things
      // on the final bundle. For now, we don't need production's JavaScript
      // minifying and other things, so let's set mode to development
      mode: "development",
    }),
  )
  .pipe(gulp.dest("dist/")));
