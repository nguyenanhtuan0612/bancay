'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.addColumn('users', 'address', {
            type: Sequelize.STRING,
            allowNull: true, // Đặt allowNull thành true hoặc false tùy theo yêu cầu của bạn
        });
        await queryInterface.addColumn('users', 'hsl', {
            type: Sequelize.STRING,
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn('users', 'address');
        await queryInterface.removeColumn('users', 'hsl');
    },
};
