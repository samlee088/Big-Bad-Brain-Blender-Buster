const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Questions extends Model{}

Questions.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,

        },
        question: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        answerOne: {
            type: DataTypes.STRING,
            allowNull:false,

        },
        answerTwo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        answerThree: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        answerFour: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        correctAnswer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull:false
        },
        difficulty: {
            type: DataTypes.STRING,
            allowNull:false
        },

    },
    {
        sequelize,
        timeStamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'quizzes'
    }
);

module.exports = Questions