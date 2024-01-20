// authorController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Tüm yazarları getir
const getAllAuthors = async (req, res) => {
  try {
    const allAuthors = await prisma.author.findMany({
      include: { book: true }, // Bu, her yazarın kitaplarını da getirmek için bir örnektir
    });
    res.json(allAuthors);
  } catch (error) {
    console.error('Error fetching authors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Belirli bir yazarı getir
const getAuthorById = async (req, res) => {
  const { id } = req.params;

  try {
    const author = await prisma.author.findUnique({
      where: { id: parseInt(id) },
      include: { book: true },
    });

    if (!author) {
      res.status(404).json({ error: 'Author not found' });
    } else {
      res.json(author);
    }
  } catch (error) {
    console.error('Error fetching author:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Yeni yazar oluştur
const createAuthor = async (req, res) => {
  const { name } = req.body;
  try {
    const newAuthor = await prisma.author.create({
      data: {
        name,
      },
    });

    res.status(201).json(newAuthor);
  } catch (error) {
    console.error('Error creating author:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Yazarı güncelle
const updateAuthor = async (req, res) => {
  const { id } = req.query;
  const {name} = req.body;
  const updatedData = {name};

  try {
    const updatedAuthor = await prisma.author.update({
      where: { id: parseInt(id) },
      data: updatedData,
    });

    res.json(updatedAuthor);
  } catch (error) {
    console.error('Error updating author:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Yazarı sil
const deleteAuthor = async (req, res) => {
  const { id } = req.query;

  try {
    const deletedAuthor = await prisma.author.delete({
      where: { id: parseInt(id) },
    });

    res.json(deletedAuthor);
  } catch (error) {
    console.error('Error deleting author:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
