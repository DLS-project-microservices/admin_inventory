import { DataTypes } from "sequelize";
import sequelize from '../database/connection.js';
import ProductCategory from './productCategory.js'; 
import Category from './category.js';

const Product = sequelize.define('product', {
   id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
   },
   name: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'There is no description for this product yet.'
   },
   quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
   },
},
{ 
   paranoid: true
});
Product.belongsToMany(Category, { through: ProductCategory });
Category.belongsToMany(Product, { through: ProductCategory });

export default Product;

