const KoaRouter = require("koa-router");
const {
  addBook,
  getBookByIsbn,
  getBook,
  getBooks,
  deleteBook,
  editBook,
  likeBook,
  getBooksByCategory,
} = require("../controllers/bookContorller");

const router = new KoaRouter({ prefix: "/book" });

router.post("/addBook", addBook);
router.put("/likeBook", likeBook);
router.put("/:id", editBook);
router.delete("/:id", deleteBook);
router.get("/findByCategory", getBooksByCategory);
router.get("/findByIsbn", getBookByIsbn);
router.get("/:id", getBook);
router.get("/", getBooks);

module.exports = router;
