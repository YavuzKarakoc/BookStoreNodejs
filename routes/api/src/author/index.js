const express = require('express');
const router = express.Router();
const authorController = require('../../../../controllers/src/author');


router.get('/authors', authorController.getAllAuthors);
router.get('/author/:id', authorController.getAuthorById);
router.post('/create-author', authorController.createAuthor);
router.put('/update-author', authorController.updateAuthor);
router.delete('/delete-author', authorController.deleteAuthor);

module.exports = router;