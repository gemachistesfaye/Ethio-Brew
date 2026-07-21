const Category = require('../models/Category');

const categoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.findAll();
      res.json(categories);
    } catch (error) {
      console.error('getCategories error:', error);
      res.status(500).json({ error: 'Could not load categories.' });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) return res.status(404).json({ error: 'Category not found' });
      res.json(category);
    } catch (error) {
      console.error('getCategoryById error:', error);
      res.status(500).json({ error: 'Could not load category.' });
    }
  },

  createCategory: async (req, res) => {
    try {
      const id = await Category.create(req.body);
      res.status(201).json({ id, message: 'Category created successfully' });
    } catch (error) {
      console.error('createCategory error:', error);
      res.status(500).json({ error: 'Could not create category.' });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const affected = await Category.update(req.params.id, req.body);
      if (affected === 0) return res.status(404).json({ error: 'Category not found or no changes' });
      res.json({ message: 'Category updated successfully' });
    } catch (error) {
      console.error('updateCategory error:', error);
      res.status(500).json({ error: 'Could not update category.' });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const affected = await Category.delete(req.params.id);
      if (affected === 0) return res.status(404).json({ error: 'Category not found' });
      res.json({ message: 'Category deleted' });
    } catch (error) {
      console.error('deleteCategory error:', error);
      res.status(500).json({ error: 'Could not delete category.' });
    }
  },
};

module.exports = categoryController;
