document.querySelectorAll('.selectedAnswer').forEach(e => e.addEventListener('click', submitAnswer));


console.log('script javascript correctly linked');


async function submitAnswer(event) {
    
    const questionGuess = event.target.getAttribute('data-id');
    console.log(questionGuess);

    const questionId = event.target.getAttribute('question-id');
    console.log(questionId);

    const categoryID = event.target.getAttribute('category-id');
    console.log(categoryID);

    const correctAnswer = event.target.getAttribute('correctAnswer-id');
    console.log(correctAnswer);


    let correctGuess;

    if(questionGuess == correctAnswer) {
        correctGuess = 1
    } else {
        correctGuess = 0
    }
    

    
    const response = await fetch(`/api/results`, {
        method: 'POST',
        body: JSON.stringify({questionGuess, questionId, correctGuess}),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const responseresults = await response.json();
    console.log(responseresults);
    
    const allSelectedCategoryQuestionIds = await fetch('/api/questions/questionArray', {
        method: 'POST',
        body: JSON.stringify({categoryID}),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    let currentAllQuestionList = await allSelectedCategoryQuestionIds.json();
    console.log(currentAllQuestionList);

    async function queryNextQuestion(questionID, questionArray)  {

        for (let i=0; i<questionArray.length; i++) {

            console.log(questionArray[i].id);

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

    console.log(determineNextQuestion);

    if (determineNextQuestion == 'lastQuestion') {

        document.location.replace('/api/results');

    } else {
        
        document.location.replace(`/api/questions/${determineNextQuestion}`)

    }


    
}








