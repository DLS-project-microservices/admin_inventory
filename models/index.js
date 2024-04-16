import Product from './product.js'
import Category from './category.js';
import ProductCategory from './productCategory.js'; // Assuming you named your through table model as productCategory.js


Category.belongsToMany(Product, { through: ProductCategory });
Product.belongsToMany(Category, { through: ProductCategory })

export { Category, Product }