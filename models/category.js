import { DataTypes } from "sequelize";
import sequelize from '../database/connection.js';

const Category = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    categoryDescription: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'There is no description for this category yet.'
    }
})

export default Category;