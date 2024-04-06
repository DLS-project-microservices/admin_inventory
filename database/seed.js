import Category from '../models/category.js';

async function insertCategories() {
    const categories = [{
        name: "Clothing",
        categoryDescription: 'A category for clothes'
    },
    {
        name: "Study Materials",
        categoryDescription: "A category including books, stationery, and other educational resources."
    },
    {
        name: "Furniture",
        categoryDescription: "A category for various types of household or office furniture."
    },
    {
        name: "Technology",
        categoryDescription: "A category encompassing electronic devices and gadgets."
    },
    {
        name: "Garden"
    }
    ];

    for (const category in categories) {
        await Category.create(categories[category]);
    }
}

export default insertCategories;