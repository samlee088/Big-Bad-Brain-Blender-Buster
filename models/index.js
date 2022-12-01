//This is where we are going to create relationships between data tables

const Categories = require('./Categories');
const Questions = require('./Questions');
const Guesses = require('./Guesses');
const Users = require('./Users')



/* One to many relationship between the quiz questions and the guesses due to the possibility of multiple users answering the same quiz */
Questions.hasMany(Guesses, {
   foreignKey: 'questionId',
   onDelete: 'CASCADE'
  });


Guesses.belongsTo(Questions, {
   foreignKey: 'questionId'
});



/* One to many relationship between the user and the user's guesses for a quiz. */
Users.hasMany(Guesses, {
   foreignKey: 'user_id',
   onDelete: 'CASCADE',
})


Guesses.belongsTo(Users, {
   foreignKey: 'user_id',
   onDelete: 'CASCADE',
})
   


module.exports = {Users, Categories, Questions, Guesses}
