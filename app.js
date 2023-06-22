require("dotenv").config();
const Koa = require("koa");
const KoaRouter = require("koa-router");
const json = require("koa-json");
const bodyparser = require("koa-bodyparser");
const cors = require("@koa/cors");
const winston = require("winston");
const logger = require("./utils/eventLoggerUtil");
const getLikes = require("./utils/getLikes");

const dbConnect = require("./utils/dbUtil");
const authorRoutes = require("./routes/authorRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = new Koa();
const router = new KoaRouter();

app.use(bodyparser());
app.use(cors());
app.use(json());
app.use(router.routes()).use(router.allowedMethods());
app.use(authorRoutes.routes());
app.use(bookRoutes.routes());

app.listen(process.env.PORT, () => {
  dbConnect();
  getLikes();

  // Schedule the execution of getLikes every 5 minutes
  // setInterval(() => {
  //   getLikes();
  // }, 5 * 60 * 1000);
  logger.info(`App running on http://localhost:${process.env.PORT}`);
});
