const KoaRouter = require("koa-router");
const {
  addBook,
  getBookByIsbn,
  getBook,
  getBooks,
  deleteBook,
  editBook,
} = require("../controllers/bookContorller");

const router = new KoaRouter({ prefix: "/book" });

router.post("/addBook", addBook);
router.put("/:id", editBook);
router.delete("/:id", deleteBook);
router.get("/findBook", getBookByIsbn);
router.get("/:id", getBook);
router.get("/", getBooks);

module.exports = router;
