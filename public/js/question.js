document.querySelectorAll('.selectedAnswer').forEach(e => e.addEventListener('click', submitAnswer));

async function submitAnswer(event) {
    
    /* Button attributes regarding information about the quiz to store for further use */
    const questionGuess = event.target.getAttribute('data-id');
    const questionId = event.target.getAttribute('question-id');
    const correctAnswer = event.target.getAttribute('correctAnswer-id');
    const categoryID = event.target.getAttribute('category-id');
    const difficultySelection = event.target.getAttribute('difficulty-id');

    /* Function to determine if a user selected the correct answer */
    let correctGuess;

    if(questionGuess == correctAnswer) {
        correctGuess = 1
    } else {
        correctGuess = 0
    }
    

    /* Storing the users selection to later render with results */
    const response = await fetch(`/api/results`, {
        method: 'POST',
        body: JSON.stringify({questionGuess, questionId, correctGuess}),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    /* Method to query all available questions based on category and difficulty to determine the next question to render, or end of quiz */
    const allSelectedCategoryQuestionIds = await fetch('/api/questions/questionArray', {
        method: 'POST',
        body: JSON.stringify({categoryID, difficultySelection}),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    let currentAllQuestionList = await allSelectedCategoryQuestionIds.json();

    /* Query to determine the next question based on the returned array of the previous fetch/post of available questions based on the current category and difficulty selection */
    async function queryNextQuestion(questionID, questionArray)  {

        for (let i=0; i<questionArray.length; i++) {

            if (i == (questionArray.length -1)) {

                let nextQuestionIdentity = 'lastQuestion'

                return nextQuestionIdentity

            } else if (questionArray[i].id == questionID) {

                let nextQuestionIdentity = questionArray[i+1].id

                return nextQuestionIdentity
            }
            
        }
    }
    
    let determineNextQuestion = await queryNextQuestion(questionId, currentAllQuestionList);

    /* If the last question was answered, render the results paged. Otherwise render the next quiz question */
    if (determineNextQuestion == 'lastQuestion') {

        document.location.replace('/api/results');

    } else {
        
        document.location.replace(`/api/questions/${determineNextQuestion}`)

    }

}








