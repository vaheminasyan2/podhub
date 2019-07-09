'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
        return Promise.all([
            queryInterface.addColumn('notifications', 'actorId', {
                type: Sequelize.INTEGER
            }, { transaction: t }),
            queryInterface.addColumn('notifications', 'actorImage', {
                type: Sequelize.STRING
            }, { transaction: t })
        ])
    })
},

down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
        return Promise.all([
            queryInterface.removeColumn('notifications', 'actorId', { transaction: t }),
            queryInterface.removeColumn('notifications', 'actorImage', { transaction: t })
        ])
    })
}
};