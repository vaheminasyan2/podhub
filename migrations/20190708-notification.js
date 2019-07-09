'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('notifications', 'actorAwsImage', {
                    type: Sequelize.STRING
                }, { transaction: t })
            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('notifications', 'actorAwsImage', { transaction: t })
            ])
        })
    }
};