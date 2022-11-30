document.querySelector('.startButton').addEventListener('click', startQuiz);

console.log('script javascript correctly linked');

async function startQuiz() {    
    console.log("start quiz function called");

    const categorySelection = document.querySelector('#categorySelect').value;
    console.log(categorySelection);

    const difficultySelection = document.querySelector('#inputDifficulty').value;
    console.log(difficultySelection);

    const clearGuesses = await fetch(`/api/results`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const getQuizData = await fetch(`/api/questions`, {
        method: 'POST',
        body: JSON.stringify({categorySelection,difficultySelection}),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const quizDataGrab = await getQuizData.json();
    console.log(quizDataGrab);

    location.href = `/api/questions/${quizDataGrab}`;
    
}
























// const loadAllQuestions = document.querySelector('#LoadQuestions');

// async function getQuestions()  {

//     try{
//         const categorySelection = document.querySelector('#category').value;
//         const difficultySelection = document.querySelector('#difficulty').value;
//         const numberSelection = document.querySelector('#number').value;

//         let quizQuestionsLink = `https://the-trivia-api.com/api/questions?${categorySelection}${difficultySelection}${numberSelection}`;

//         console.log(categorySelection);
//         console.log(quizQuestionsLink);

//         const response = await fetch(quizQuestionsLink,);
//         const questionsSet = await response.json();
//         console.log(questionsSet);

//         console.log(questionsSet[0].correctAnswer);
//         console.log(questionsSet[0].incorrectAnswers);
//         console.log(questionsSet[0].question);

//         // let dataArray = {question:(questionsSet[0].question), correctAnswer:(questionsSet[0].correctAnswer),incorrectAnswerOne: (questionsSet[0].incorrectAnswers[0]), incorrectAnswerTwo:(questionsSet[0].incorrectAnswers[1]), incorrectAnswerThree: (questionsSet[0].incorrectAnswers[2]) };

//         // console.log(dataArray);

//         for (let i=0; i<questionsSet.length; i++) {
//             let dataArray = {question:(questionsSet[i].question), correctAnswer:(questionsSet[i].correctAnswer),incorrectAnswerOne: (questionsSet[i].incorrectAnswers[0]), incorrectAnswerTwo:(questionsSet[i].incorrectAnswers[1]), incorrectAnswerThree: (questionsSet[i].incorrectAnswers[2]) };

//             const response = await fetch('/api/quiz',
//             {
//                 method: 'POST',
//                 body: JSON.stringify(dataArray),
//                 headers: {
//                     'Content-Type': 'application/json',
//                   },
//             })

//             if(response.ok) {
//                 console.log('Success with quiz questions creation');
//             } else {
//                 console.log('failed to create quiz model question');
//             }

//         }

//         return questionsSet;
       

//     } catch(err) {
//         console.log(err);
        
//     }

// }


// //// create a new function that will create models with questions set with return question array



// loadAllQuestions.addEventListener('click', getQuestions);







