const { Categories } = require('../models/Categories')

const CategoryData = [
    {
        category_name: 'Society & Culture'
    },
    {
        category_name: 'General Knowledge'
    },
    {
        category_name: 'Food & Drink'
    },
]


const CategoriesCreation = () => Categories.bulkCreate(CategoryData);

module.exports = CategoriesCreation;



