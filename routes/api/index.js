const express = require("express");
const router = express.Router();



router.use("/book", require("./src/book"));
router.use("/author", require("./src/author"));


module.exports = router;