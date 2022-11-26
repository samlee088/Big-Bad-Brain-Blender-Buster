const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


class Attributes extends Model{

}


Attributes.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            PrimaryKey: true,
            autoIncrement: true,   
        }
    }   





)






