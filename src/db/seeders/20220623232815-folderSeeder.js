'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.bulkInsert('Folders', [{
                name: 'Carpeta1',
                userId: 1,
                createdAt: new Date,
                updatedAt: new Date
            },
            {
                name: 'Carpeta2',
                userId: 1,
                createdAt: new Date,
                updatedAt: new Date
            },
            {
                name: 'Carpeta3',
                userId: 2,
                createdAt: new Date,
                updatedAt: new Date
            },
        ], {});

    },

    async down(queryInterface, Sequelize) {

        await queryInterface.bulkDelete('Folders', null, {});

    }
};