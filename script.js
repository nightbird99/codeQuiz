var main = document.querySelector("#main");
var timeEl = document.querySelector(".time");
//var startButton = document.getElementById("#start-button");
var pageHeadEl = document.querySelector("#pageHead");
var pageBodyEl = document.querySelector("#pageBody");

var q1 = {"question":"Commonly used data types DO NOT include:", "a1":"strings", "a2":"booleans","a3":"alerts","a4":"numbers", "correctAnswer":"alerts"}; //CORRECT ANSWER: a3
var q2 = {"question":"The condition in an if/else statement is enclosed within ________.", "a1":"quotes", "a2":"curly brackets","a3":"parentheses","a4":"square brackets", "correctAnswer":"parentheses"}; //CORRECT ANSWER: a3
var q3 = {"question":"Arrays in JavaScript can be used to store _______.", "a1":"numbers and strings", "a2":"other arrays","a3":"booleans","a4":"all of the above", "correctAnswer":"all of the above"}; //CORRECT ANSWER: a4
var q4 = {"question":"String values must be enclosed within _________ when being assigned to variables.", "a1":"commas", "a2":"curly brackets","a3":"quotes","a4":"parentheses", "correctAnswer":"quotes"}; //CORRECT ANSWER: a3
var q5 = {"question":"A very useful tool used during development and debugging for printing content to the debugger is:", "a1":"JavaScript", "a2":"terminal/bash","a3":"for loops","a4":"console.log", "correctAnswer":"console.log"}; //CORRECT ANSWER: a4

var questionsStrings = [q1, q2, q3, q4, q5];

var questions = [];

for (var i = 0; i < questionsStrings.length; i++) {
    questions.push(JSON.parse(questionsStrings[i]));
}

//var quest = document.createElement("h1");
//var answers = document.createElement("section");

//main.appendChild(quest);
//main.appendChild(answers);

var score = 0;

var index = 0;

var secondsLeft = 60;
function setTimer() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = "Time: " + secondsLeft;

        if(secondsLeft === 0) {
            clearInterval(timerInterval);

            allDone();
        }
    }, 1000);
}

function displayQuestions() {
    
    var ans1 = document.createElement("button");
    var ans2 = document.createElement("button");
    var ans3 = document.createElement("button");
    var ans4 = document.createElement("button");

    if (index === questions.length) {
        allDone();
    }
    else {
        pageHeadEl.textContent = questions[index].question;
        ans1.textContent = questions[index].a1;
        ans2.textContent = questions[index].a2;
        ans3.textContent = questions[index].a3;
        ans4.textContent = questions[index].a4;

        answers.appendChild(ans1);
        answers.appendChild(ans2);
        answers.appendChild(ans3);
        answers.appendChild(ans4);

        ans1.addEventListener("click", answered);
        ans2.addEventListener("click", answered);
        ans3.addEventListener("click", answered);
        ans4.addEventListener("click", answered);

        pageBodyEl.appendChild(answers);
    }
}



function allDone() {
    quest.textContent = "All Done!";
    answers.remove();
    var endContent = document.createElement("section");
    var scoreMessage = document.createElement("p");
    var initialsForm = document.createElement("form");
    initialsForm.setAttribute("method","POST");
    var initialsLabel =document.createElement("label");
    initialsLabel.setAttribute("for","initials");
    var initialsInput = document.createElement("input");
    initialsInput.setAttributes({
        "type":"text",
        "name":"initials",
        "placeholder":"JD"
    });
    var userInitials = initialsInput.value;
    var enterButton = document.createElement("button");
    enterButton.textContent("Enter");
    
    initialsLabel.textContent("Enter Initials: ");
    scoreMessage.textContent = "Your final score is " + score;

    endContent.appendChild(scoreMessage);
    initialsForm.appendChild(initialsLabel);
    initialsForm.appendChild(initialsInput);
    initialsForm.appendChild(enterButton);
    endContent.appendChild(initialsForm);
    main.append(endContent);

    enterButton.addEventListener("click", addScore(userInitials));
    


}

function answered() {
    var check = document.createElement("h3");
    if (questions[i].correctAnswer === this.textContent) {
        score++;
        check.textContent("Correct!");
    }
    else {
        secondsLeft -=5;
        check.textContent("Wrong!")
        if (secondsLeft <= 0) {
            allDone();
        }
    }
    main.appendChild(check);
    index++;
    displayQuestions;
}

startButton.addEventListener("click", setTimer);
startButton.addEventListener("click", displayQuestions);