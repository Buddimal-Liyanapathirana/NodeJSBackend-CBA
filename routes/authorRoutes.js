const KoaRouter = require("koa-router");
const {
  addAuthor,
  getAuthor,
  getAuthors,
  deleteAuthor,
  editAuthor,
} = require("../controllers/authorContorller");

const router = new KoaRouter({ prefix: "/author" });

router.post("/addAuthor", addAuthor);
router.put("/:id", editAuthor);
router.delete("/:id", deleteAuthor);
router.get("/:id", getAuthor);
router.get("/", getAuthors);

module.exports = router;
