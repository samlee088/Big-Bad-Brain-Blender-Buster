document.querySelectorAll('.selectedAnswer').forEach(e => e.addEventListener('click', submitAnswer));

document.querySelector('.startButton').addEventListener('click', startQuiz);


console.log('script javascript correctly linked');


async function submitAnswer(event) {
    
    const questionGuess = event.target.getAttribute('data-id');
    console.log(questionGuess);

    const question_id = event.target.getAttribute('question-id');
    console.log(question_id);


    const response = await fetch(`/api/scores`, {
        method: 'POST',
        body: JSON.stringify({questionGuess, question_id}),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const maxQuestionId = await fetch('/api/maximum', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    
    const maxQuestionIdReturn = await maxQuestionId.json();

    console.log(maxQuestionId);
    console.log(maxQuestionIdReturn);

    if(question_id >= maxQuestionIdReturn) {
        document.location.replace(`/api/results`)
    } else {
        const next_question_id = Number(question_id) + 1
        document.location.replace(`/api/questions/${next_question_id}`);
    }

}




async function startQuiz() {

    const categorySelection = document.querySelector('#categorySelect').value;


    console.log(categorySelection);

    // const quizRender = await fetch(`/api/questions`, {
    //     method: 'GET',
    //     body: JSON.stringify({categorySelection}),
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // })

    const clearGuesses = await fetch(`/api/results`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })




    const getQuizData = await fetch(`/api/questions`, {
        method: 'POST',
        body: JSON.stringify({categorySelection}),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const quizRenderResults = await getQuizData.json();
    console.log(quizRenderResults);


    location.href = `/api/questions/${quizRenderResults}`;

    // const renderQuiz = await fetch(`/api/questions/${quizRenderResults}`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     }
    // })
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







