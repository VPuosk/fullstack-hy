const { DataTypes } = require('sequelize')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn('users', 'disabled', {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    })
    await queryInterface.addColumn('users', 'logged', {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    })
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('users', 'disabled')
    await queryInterface.removeColumn('users', 'logged')
  },
}