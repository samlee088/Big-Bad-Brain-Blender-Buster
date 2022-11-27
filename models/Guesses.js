const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection')


class Guesses extends Model{};

Guesses.init(
    {
        
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true

        },
        questionGuess: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        question_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'quizzes',
                key: 'id'
            }
        },
        // user_id: {
        //     type: DataTypes.STRING,
        //     references: {
        //         model: 'user',
        //         key:'id'
        //     }
        // }
    },
    {
        sequelize,
        timeStamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'guesses'
    }
    )

module.exports = Guesses