'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Files', [{
                name: 'archivo1.jpg',
                folderId: 1,
                createdAt: new Date,
                updatedAt: new Date
            },
            {
                name: 'archivo2.txt',
                folderId: 1,
                createdAt: new Date,
                updatedAt: new Date
            },
            {
                name: 'archivo3.txt',
                folderId: 2,
                createdAt: new Date,
                updatedAt: new Date
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Files', null, {});
    }
};