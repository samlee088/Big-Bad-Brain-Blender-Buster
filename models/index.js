//This is where we are going to create relationships between data tables

const Categories = require('./Categories');
const Questions = require('./Questions');
const Guesses = require('./Guesses');


// Categories.hasMany(Questions, {
//    foreignKey: 'category',
//    onDelete: 'Cascade'

// })


Guesses.belongsTo(Questions,
   {
      foreignKey: 'question_id'
   });


Questions.hasOne(Guesses,
    {
      foreignKey: 'question_id'
   });




   

module.exports = {Categories, Questions, Guesses}
