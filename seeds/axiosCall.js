const axios = require('axios');
const sequelize = require('../config/connection');
const Questions = require('../models/Questions')


// const getBreeds = async () => {
//   try {
//     return await axios.get('https://the-trivia-api.com/api/questions?limit=3&difficulty=medium')
//   } catch (error) {
//     console.error(error)
//   }
// }

// const countBreeds = async () => {
//   const breeds = await getBreeds()
// console.log(breeds.data[0].category);
// console.log(breeds.data)
//   if (breeds.data.message) {
//     console.log(`Got ${Object.entries(breeds.data.category).length} breeds`)
//   }
// }

// countBreeds()





// for each category
//    pull in 20 questions 
//      per difficulty
//          insert data set questions into database


/* 
async function fetchQuestions() {

let categories = [category one, category two]

  for (let i=0; i<categories.length, i++) {
    let url = 'actual url'
    const easyQuestions = await axios.get(`url ${categories[i]}`)
    const transformedQuestions = easyQuestions.map(transformQuestionData)
    Question.bulkCreate(transformedQuestions)

    // add in medium, hard questions
  
  }
}
 */

// let difficulty = ['&difficulty=easy','&difficulty=medium','&difficulty=hard'];
let difficulty = ['&difficulty=easy','&difficulty=hard'];
let categories = ['arts_and_literature', 'film_and_tv', 'food_and_drink', 'general_knowledge', 'geography', 'history', 'music', 'science', 'society_and_culture','sport_and_leisure'];
let urlQuestions = 'https://the-trivia-api.com/api/questions?limit=5&categories='

async function fetchQuestions() {

// let categories = ['&categories=arts_and_literature', '&categories=film_and_tv', '&categories=food_and_drink', '&categories=general_knowledge', '&categories=geography', '&categories=history', '&categories=music', '&categories=science', '&categories=society_and_culture','&categories=sport_and_leisure'];

// let categories = ['arts_and_literature', 'film_and_tv', 'food_and_drink', '&general_knowledge', 'geography', 'history', 'music', 'science', 'society_and_culture','sport_and_leisure'];

// let categories = ['arts_and_literature', 'film_and_tv', 'food_and_drink', 'general_knowledge', 'geography', 'history', 'music', 'science', 'society_and_culture','sport_and_leisure'];

// let categories = ["arts_and_literature,film_and_tv,food_and_drink,general_knowledge,geography,history,music,society_and_culture,sport_and_leisure,science"]

// https://the-trivia-api.com/api/questions?categories=arts_and_literature,film_and_tv,food_and_drink,general_knowledge,geography,history,music,society_and_culture,sport_and_leisure,science&limit=5


// let difficulty = ['&difficulty=easy','&difficulty=medium','&difficulty=hard'];


//seed for grabbing the questions from API call
  for (let i = 0; i < difficulty.length; i++ ) {

    for (let j=0; j< categories.length; j++) {
      
      console.log(`${urlQuestions}${categories}${difficulty[i]}`)

      const QuestionsRetreival= await axios.get(`${urlQuestions}${categories[j]}${difficulty[i]}`);
      console.log(QuestionsRetreival.data);

        const scrubbedQuestions = await QuestionsRetreival.data.map((a) => {
          let answersArray = [a.correctAnswer].concat(a.incorrectAnswers);
          let sortedAnswerArray = answersArray.sort();

          
            return {question: a.question,
                    answerOne: sortedAnswerArray[0],
                    answerTwo: sortedAnswerArray[1],
                    answerThree: sortedAnswerArray[2],
                    answerFour: sortedAnswerArray[3],
                  correctAnswer: a.correctAnswer,
                  category: a.category,
                  difficulty: a.difficulty,
              }
        })
          console.log(scrubbedQuestions)
          await sequelize.sync({ force:false});

      const newQuestions = await Questions.bulkCreate(scrubbedQuestions, {
        individualHooks: true,
        returning: true,
      })
    }

  }
  process.exit(0);
}


fetchQuestions();




















