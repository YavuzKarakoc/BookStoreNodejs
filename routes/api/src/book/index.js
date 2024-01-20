const express = require('express');
const router = express.Router();
const bookController = require('../../../../controllers/src/book');


router.get('/books', bookController.getAllBooks);
router.get('/book', bookController.getBookById);
router.post('/create-book', bookController.createBook);
router.put('/update-book', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;