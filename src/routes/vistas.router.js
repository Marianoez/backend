const Router = require("express").Router;
const router = Router();

router.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.status(200).render("index", {});
});

module.exports = router;
