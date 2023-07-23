// Webpack uses this to work with directories
import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// This is the main configuration object.
// Here, you write different options and tell Webpack what to do
export default {
    // Path to your entry point. From this file Webpack will begin its work
    entry: "./index.js",

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
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.ts$/,
                use: "ts-loader"
            }
        ]
    },

    mode: "development"
};
