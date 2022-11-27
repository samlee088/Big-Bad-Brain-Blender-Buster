document.querySelectorAll('.selectedAnswer').forEach(e => e.addEventListener('click', submitAnswer));


console.log('script javascript correctly linked');


async function submitAnswer(event) {
    
    const questionGuess = event.target.getAttribute('data-id');
    console.log(questionGuess);

    const question_id = event.target.getAttribute('question-id');
    console.log(question_id);

    const categoryID = event.target.getAttribute('category-id');
    console.log(categoryID);


    const response = await fetch(`/api/results`, {
        method: 'POST',
        body: JSON.stringify({questionGuess, question_id}),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const responseresults = await response.json();
    console.log(responseresults);
    
    // const maxQuestionId = await fetch('/api/maximum', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // })
    
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

                // let nextQuestionIdentity = questionArray[i+1].id == undefined ? questionArray[i+1].id : 'lastQuestion';

                return nextQuestionIdentity
            }
            
        }
    }
    
    let determineNextQuestion = await queryNextQuestion(question_id, currentAllQuestionList);

    console.log(determineNextQuestion);

    if (determineNextQuestion == 'lastQuestion') {

        document.location.replace('/api/results');

    } else {
        
        document.location.replace(`/api/questions/${determineNextQuestion}`)

    }
    // const maxQuestionIdReturn = await maxQuestionId.json();

    // console.log(maxQuestionId);
    // console.log(maxQuestionIdReturn);

    // if(question_id >= maxQuestionIdReturn) {
    //     document.location.replace(`/api/results`)
    // } else {
    //     const next_question_id = Number(question_id) + 1
    //     document.location.replace(`/api/questions/${next_question_id}`);
    // }

}








