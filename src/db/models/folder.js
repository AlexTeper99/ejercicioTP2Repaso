'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Folder extends Model {

        static associate(models) {
            Folder.hasMany(models.File);
        }
    }
    Folder.init({
        id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        createdAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Folder',
        tableName: 'Folders'
    });
    return Folder;
};