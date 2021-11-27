const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = (env, argv) => {
  const SERVER_PATH =
    argv.mode === "production"
      ? "./src/server/server-prod.ts"
      : "./src/server/server-dev.ts";

  const OUTPUT_PATH =
    argv.mode === "production"
      ? path.join(__dirname, "dist_prod")
      : path.join(__dirname, "dist_dev");

  return {
    entry: {
      server: SERVER_PATH,
    },
    output: {
      path: OUTPUT_PATH,
      filename: "server.js",
    },
    target: "node",
    node: {
      // Need this when working with express, otherwise the build fails
      __dirname: false, // if you don't put this is, __dirname
      __filename: false, // and __filename return blank or /
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
            },
          ],
        },
      ],
    },
  };
};
