const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

let menu = [];
let idCounter = 1;

// Validation Middleware
const validateMenuItem = [
    body('name')
        .isString().withMessage('Name must be a string')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

    body('description')
        .isString().withMessage('Description must be a string')
        .isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),

    body('price')
        .isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),

    body('category')
        .isIn(['appetizer', 'entree', 'dessert', 'beverage'])
        .withMessage('Invalid category'),

    body('ingredients')
        .isArray({ min: 1 }).withMessage('Ingredients must be an array with at least one item'),

    body('available')
        .optional()
        .isBoolean().withMessage('Available must be boolean')
];

// GET all menu items
router.get('/', (req, res) => {
    res.status(200).json(menu);
});

// GET single item
router.get('/:id', (req, res) => {
    const item = menu.find(m => m.id === parseInt(req.params.id));

    if (!item) {
        return res.status(404).json({ error: "Menu item not found" });
    }

    res.status(200).json(item);
});

// POST new item
router.post('/', validateMenuItem, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const newItem = {
        id: idCounter++,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        ingredients: req.body.ingredients,
        available: req.body.available ?? true
    };

    menu.push(newItem);

    res.status(201).json(newItem);
});

// PUT update item
router.put('/:id', validateMenuItem, (req, res) => {
    const item = menu.find(m => m.id === parseInt(req.params.id));

    if (!item) {
        return res.status(404).json({ error: "Menu item not found" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    item.name = req.body.name;
    item.description = req.body.description;
    item.price = req.body.price;
    item.category = req.body.category;
    item.ingredients = req.body.ingredients;
    item.available = req.body.available ?? true;

    res.status(200).json(item);
});

// DELETE item
router.delete('/:id', (req, res) => {
    const index = menu.findIndex(m => m.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ error: "Menu item not found" });
    }

    menu.splice(index, 1);

    res.status(200).json({ message: "Menu item deleted successfully" });
});

module.exports = router;
