'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class File extends Model {
        static associate(models) {
            File.belongsTo(models.Folder);
            // timestamps: false to  ignore time stamps from table
            File.belongsToMany(models.User, { through: 'files_users', timestamps: false });
        }
    }
    File.init({
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
        folderId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        createdAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'File',
        tableName: 'Files'
    });
    return File;
};