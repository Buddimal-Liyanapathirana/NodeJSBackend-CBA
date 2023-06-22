require("dotenv").config();
const Koa = require("koa");
const KoaRouter = require("koa-router");
const json = require("koa-json");
const bodyparser = require("koa-bodyparser");
const cors = require("@koa/cors");

const app = new Koa();
const router = new KoaRouter();

app.use(bodyparser());
app.use(cors());
app.use(json());
app.use(router.routes()).use(router.allowedMethods());

router.get("/", (ctx) => {
  ctx.body = { message: "Hello" };
});

app.listen(process.env.PORT, () => {
  console.log(`App running on http://localhost:${process.env.PORT}`);
});
