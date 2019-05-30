'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
        return Promise.all([
            queryInterface.addColumn('users', 'awsImageUrl', {
                type: Sequelize.DATE
            }, { transaction: t })
        ])
    })
},

down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
        return Promise.all([
            queryInterface.removeColumn('users', 'awsImageUrl', { transaction: t })
        ])
    })
}
};