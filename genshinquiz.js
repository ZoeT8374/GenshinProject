// makes the current div displayed invisible, & shows the div of the next question 
function nextQuestion() {
    let Nquestions = document.querySelectorAll("div.questions").length+1
    let firstQuestion = 1
    let lastQuestion = Nquestions - 1
    let secondLast = Nquestions - 2
    let nextButton = document.getElementById("nextButton")
    let prevButton = document.getElementById("previousButton")
    let submit = document.getElementById("submitButton2")
    prevButton.style.display = "";
    nextButton.style.display = "";
    submit.style.display = "none";
    for(let i=firstQuestion; i<Nquestions; i++){
        let currentQuestion = document.getElementById("question"+i.toString());
        if (currentQuestion.style.display != "none" && i < lastQuestion) {
            if (i == firstQuestion) {
                prevButton.style.display = "";
            }
            else if (i == secondLast) {
                nextButton.style.display = "none";
                submit.style.display = "";
            }
            currentQuestion.style.display = "none";
            document.getElementById("question"+(i+1).toString()).style.display = "block";
            break;
        }
    }
}

// makes the current div displayed invisible, & shows the div of the preivous question 
function previousQuestion() {
    let Nquestions = document.querySelectorAll("div.questions").length+1
    let firstQuestion = 1
    let secondQuestion = 2
    let lastQuestion = Nquestions - 1
    let nextButton = document.getElementById("nextButton")
    let prevButton = document.getElementById("previousButton")
    let submit = document.getElementById("submitButton2")
    prevButton.style.display = "";
    nextButton.style.display = "";
    submit.style.display = "none";
    for(let i=firstQuestion; i<Nquestions; i++){
        let currentQuestion = document.getElementById("question"+i.toString());
        if (currentQuestion.style.display != "none" && i != firstQuestion){
            if (i == lastQuestion) {
                nextButton.style.display = ""
            }
            else if (i == secondQuestion){
                prevButton.style.display = "none"
            }
            currentQuestion.style.display = "none";
            document.getElementById("question"+(i-1).toString()).style.display = "block";
            break;
        }
    }
}

// makes the current div displayed invisible, & shows the div of the question clicked 
function jumpToQuestion() {
    let firstQuestion = 1
    let Nquestions = document.querySelectorAll("div.questions").length+1
    let allQuestions = document.querySelectorAll("div.questions")
    let prevButton = document.getElementById("previousButton")
    let nextButton = document.getElementById("nextButton")
    let submit = document.getElementById("submitButton2")
    for(let i=firstQuestion; i<Nquestions; i++) {
        let selectedQuestion = document.getElementById("question"+i.toString());
        let currentButton = document.getElementById("linkToQ"+i.toString());
        currentButton.onclick = function() {
            submit.style.display = "none";
            for(let question of allQuestions) {
                question.style.display = "none"
            }
            selectedQuestion.style.display = "block";
            if (i > firstQuestion && i < Nquestions-1){
                prevButton.style.display = "";
                nextButton.style.display = "";
            }
            else if (i == Nquestions-1){
                prevButton.style.display = "";
                nextButton.style.display = "none";
                submit.style.display = "";
            }
            else if (i == firstQuestion){
                prevButton.style.display = "none"
                nextButton.style.display = "";
            }
        }
    }
}

function calculateScore() {
    let Nquestions = document.querySelectorAll("div.questions").length+1;
    let userAnswers = getUserAnswers(Nquestions);
    let correctAnswers = [["A"],["B"],["C"],["C"],["B"],["A","C","D","F","G"],["A"],["C"],["E"],["A"],["A","B","C","D","E"],["A","B","C","D"],["A","C","D"],["D"],["D"],["A"]]
    if (userAnswers.length == Nquestions-1){
        getUserCorrect(userAnswers, correctAnswers, Nquestions)
    }
}
// returns a list of input values user has selected (stored within a list), alerts if not all questions answered 
function getUserAnswers(Nquestions) {
    userAnswers = []
    firstQuestion = 1
    answered = 0
    for(let i=firstQuestion; i<Nquestions; i++){
        currentQuestion = document.getElementById("question"+i.toString());
        allInputs = document.getElementsByName("question"+i.toString());
        currentButton = document.getElementById("linkToQ"+i.toString());  
        inputList = []
        for(let input of allInputs) {
            if (input.checked) {
                currentButton.style.background="#B1AFD7"
                inputList.push(input.value)
            }
        }
        if (inputList.length != 0) {
            userAnswers.push(inputList)
            answered += 1
        }
    }
    if (answered < Nquestions-1) {
        alert("You haven't answered all questions! "+answered.toString()+"/"+(Nquestions-1)+" answered.")
    }
    return userAnswers
}
// compares the list of user answers and list of correct answers 
function getUserCorrect(userAnswers, correctAnswers, Nquestions) {
    let resultSection = document.getElementById("userResult")
    let feedbackSection = document.getElementById("userFeedback")
    totalQuestions = Nquestions - 1
    numberOfCorrect = 0
    feedbackSection.innerHTML = ""
    for(answer=0; answer<totalQuestions; answer++) {
        currentQuestion = document.getElementById("linkToQ"+(answer+1).toString());
        let user = userAnswers[answer]
        let correct = correctAnswers[answer]
        // if value within user answers list matches value of correct answers list, change button colour to green, correct answers += 1 
        if (user.toString() === correct.toString()) {
            currentQuestion.style.borderColor="#50C878"
            currentQuestion.style.backgroundColor = "#50C878"
            numberOfCorrect += 1
        }
        // if value within user answers list doesn't match value of correct answers list, change button colour to red, incorrect answers += 1 
        else {
            currentQuestion.style.borderColor="#D2042D"
            currentQuestion.style.backgroundColor = "#D2042D"

            // creates a div to display each incorrect result along with actual correct answer 
            let section = document.createElement("div")
            let Incorrectquestion = document.createElement("p")
            let feedbackIncorrect = document.createElement("p")
            let feedbackCorrect = document.createElement("p")

            Incorrectquestion.textContent = "QUESTION "+(answer+1).toString()
            feedbackIncorrect.textContent = "You chose: "+user.toString()
            feedbackCorrect.textContent = "Correct answer: "+correct.toString()
            feedbackIncorrect.style.color = "#D2042D"
            feedbackCorrect.style.color = "#50C878"
            
            section.appendChild(Incorrectquestion)
            section.appendChild(feedbackIncorrect)
            section.appendChild(feedbackCorrect)
            feedbackSection.appendChild(section)
        }
    }

    overallFeedback = "SCORE: "+numberOfCorrect.toString()+"/16 correct!"
    document.getElementById("feedback").textContent = overallFeedback
    comment = document.getElementById("feedback2")
    resultSection.style.display = "block"
    feedbackSection.style.display = "block"

    greatScore = 12
    goodScore = 7

    if (numberOfCorrect == totalQuestions) {
        comment.textContent = "Superstar!!";
        feedbackSection.style.display = "none";
    }
    else if (numberOfCorrect > greatScore) {
        comment.textContent = "Great job!!"
    }
    else if (numberOfCorrect > goodScore) {
        comment.textContent = "A good attempt!!"
    }
    else {
        comment.textContent = "You tried..."
    }
}