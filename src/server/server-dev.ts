import app, { NAMESPACE, CLIENT_HTML_FILE } from "./app";
import { createRoutes } from "./routes";

// start DEV SERVER IMPORTS AND MIDDLWARE
import webpack, { Configuration } from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "../../webpack.dev.config.js";

const compiler = webpack(config as Configuration);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: NAMESPACE > "" ? `/${NAMESPACE}` : "/",
  })
);

app.use(webpackHotMiddleware(compiler));
// end DEV SERVER IMPORTS AND MIDDLWARE

// Shared logic
const port = app.get("port");

createRoutes(app, CLIENT_HTML_FILE, NAMESPACE);

app.listen(port, () => {
  console.log(
    "---> Dev App is running at http://localhost:%d in %s mode",
    port,
    process.env.NODE_ENV
  );
});
