const axios = require('axios');
const sequelize = require('../config/connection');
const Questions = require('../models/Questions')


let difficulty = ['&difficulty=easy','&difficulty=hard'];
let categories = ['arts_and_literature', 'film_and_tv', 'food_and_drink', 'general_knowledge', 'geography', 'history', 'music', 'science', 'society_and_culture','sport_and_leisure'];
let urlQuestions = 'https://the-trivia-api.com/api/questions?limit=5&categories='

async function fetchQuestions() {
//seed for grabbing the questions from API call
  for (let i = 0; i < difficulty.length; i++ ) {

    for (let j=0; j< categories.length; j++) {

      const QuestionsRetrieval= await axios.get(`${urlQuestions}${categories[j]}${difficulty[i]}`);
 
        const scrubbedQuestions = await QuestionsRetrieval.data.map((a) => {
          let answersArray = [a.correctAnswer].concat(a.incorrectAnswers);
          let sortedAnswerArray = answersArray.sort();

            return {
                    question: a.question,
                    answerOne: sortedAnswerArray[0],
                    answerTwo: sortedAnswerArray[1],
                    answerThree: sortedAnswerArray[2],
                    answerFour: sortedAnswerArray[3],
                    correctAnswer: a.correctAnswer,
                    category: a.category,
                    difficulty: a.difficulty,
            }
        })
         
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




















