

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Tüm kitapları getir
const getAllBooks = async (req, res) => {
  try {
    const allBooks = await prisma.book.findMany();
    res.json(allBooks);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Belirli bir kitabı getir
const getBookById = async (req, res) => {
  const { id } = req.query;

  try {
    const book = await prisma.book.findUnique({
      where: { id: parseInt(id) },
    });

    if (!book) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.json(book);
    }
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Yeni kitap oluştur
const createBook = async (req, res) => {
  const { name, price, type, language, authorId } = req.body;

  try {
    const newBook = await prisma.book.create({
      data: {
        name,
        price,
        type,
        language,
        authorId,
      },
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Kitabı güncelle
const updateBook = async (req, res) => {
  const { id } = req.query;
  const updatedData = req.body;

  try {
    const updatedBook = await prisma.book.update({
      where: { id: parseInt(id) },
      data: updatedData,
    });

    res.json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Kitabı sil
const deleteBook = async (req, res) => {
  const { id } = req.query;

  try {
    const deletedBook = await prisma.book.delete({
      where: { id: parseInt(id) },
    });

    res.json(deletedBook);
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};