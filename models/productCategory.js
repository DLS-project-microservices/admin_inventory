import { DataTypes } from "sequelize";
import sequelize from '../database/connection.js';

const ProductCategory = sequelize.define('product_category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
});

export default ProductCategory;