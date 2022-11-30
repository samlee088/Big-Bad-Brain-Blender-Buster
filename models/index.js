//This is where we are going to create relationships between data tables

const Categories = require('./Categories');
const Questions = require('./Questions');
const Guesses = require('./Guesses');
const Users = require('./Users')

// Categories.hasMany(Questions, {
//    foreignKey: 'category',
//    onDelete: 'Cascade'

// })


Guesses.belongsTo(Questions, {
   foreignKey: 'questionId'
});


Questions.hasOne(Guesses, {
 foreignKey: 'questionId',
 onDelete: 'CASCADE'
});



Users.hasMany(Guesses, {
   foreignKey: 'user_id',
   onDelete: 'CASCADE',
})


Guesses.belongsTo(Users, {
   foreignKey: 'user_id',
   onDelete: 'CASCADE',
})
   


module.exports = {Users, Categories, Questions, Guesses}
