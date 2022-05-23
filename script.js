var main = document.querySelector("#main");
var timeEl = document.querySelector(".time");
var pageHeadEl = document.querySelector("#pageHead");
var pageBodyEl = document.querySelector("#pageBody");
var viewScoresEl = document.querySelector(".viewScores");

var q1 = '{"question":"Commonly used data types DO NOT include:", "a1":"strings", "a2":"booleans","a3":"alerts","a4":"numbers", "correctAnswer":"alerts"}'; //CORRECT ANSWER: a3
var q2 = '{"question":"The condition in an if/else statement is enclosed within ________.", "a1":"quotes", "a2":"curly brackets","a3":"parentheses","a4":"square brackets", "correctAnswer":"parentheses"}'; //CORRECT ANSWER: a3
var q3 = '{"question":"Arrays in JavaScript can be used to store _______.", "a1":"numbers and strings", "a2":"other arrays","a3":"booleans","a4":"all of the above", "correctAnswer":"all of the above"}'; //CORRECT ANSWER: a4
var q4 = '{"question":"String values must be enclosed within _________ when being assigned to variables.", "a1":"commas", "a2":"curly brackets","a3":"quotes","a4":"parentheses", "correctAnswer":"quotes"}'; //CORRECT ANSWER: a3
var q5 = '{"question":"A very useful tool used during development and debugging for printing content to the debugger is:", "a1":"JavaScript", "a2":"terminal/bash","a3":"for loops","a4":"console.log", "correctAnswer":"console.log"}'; //CORRECT ANSWER: a4

var questionsStrings = [q1, q2, q3, q4, q5];
var questions = [];
var highScores = [];
var score = 0;
var index = 0;
var secondsLeft = 60;

/* create objects out of each question string in the questionStrings array */
for (var i = 0; i < questionsStrings.length; i++) {
    console.log(questionsStrings[i]);
    questions.push(JSON.parse(questionsStrings[i]));
    console.log("question #" + (i+1) + " created");
}

startScreen();

function startScreen() {

    clearSection(pageBodyEl);

    pageHeadEl.textContent = "Coding Quiz Challenge";
    var cqIntro = document.createElement("p");
    cqIntro.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    pageBodyEl.appendChild(cqIntro);
    var startButton = document.createElement("button");
    pageBodyEl.appendChild(startButton);
    score = 0;
    index = 0;
    secondsLeft = 60;
    
    startButton.addEventListener("click", setTimer);
    startButton.addEventListener("click", displayQuestions);
}


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


function clearSection(sectionID) {
    while(sectionID.firstChild) {
        sectionID.removeChild(sectionID.firstChild);
    }
}


function displayQuestions() {
    
    clearSection(pageBodyEl);

    var ans1 = document.createElement("button");
    var ans2 = document.createElement("button");
    var ans3 = document.createElement("button");
    var ans4 = document.createElement("button");

    pageBodyEl.appendChild(ans1);
    pageBodyEl.appendChild(ans2);
    pageBodyEl.appendChild(ans3);
    pageBodyEl.appendChild(ans4);

    if (index === questions.length) {
        allDone();
    }
    else {
        pageHeadEl.textContent = questions[index].question;
        ans1.textContent = questions[index].a1;
        console.log("answer 1 loaded");
        ans2.textContent = questions[index].a2;
        console.log("answer 2 loaded");
        ans3.textContent = questions[index].a3;
        console.log("answer 3 loaded");
        ans4.textContent = questions[index].a4;
        console.log("answer 4 loaded");

        ans1.addEventListener("click", function () {
            answered(questions[index].a1);
        });
        ans2.addEventListener("click", function () {
            answered(questions[index].a2);
        });
        ans3.addEventListener("click", function () {
            answered(questions[index].a3);
        });
        ans4.addEventListener("click", function () {
            answered(questions[index].a4);
        });
    }
}



function allDone() {

    clearSection(pageBodyEl);
    pageHeadEl.textContent = "All Done!";

    var bodyContent = document.createElement("ul");
    var scoreLine = document.createElement("li");
    scoreLine.textContent = "Your final score is " + score;
    var initialsLine = document.createElement("li");

    var initialForm = document.createElement("form");
    initialForm.setAttribute("class","form-inline");
    var initialLabel = document.createElement("label");
    initialLabel.textContent = "Enter Initials: ";
    var initialsInput = document.createElement("input");
    initialsInput.setAttribute("type","text");
    initialsInput.setAttribute("class","initialsClass");
    var submitButton = document.createElement("button");
    submitButton.setAttribute("type","submit");
    submitButton.textContent = "Submit";
    
    initialForm.appendChild(initialLabel);
    initialForm.appendChild(initialsInput);
    initialForm.appendChild(submitButton);
    initialsLine.appendChild(initialForm);

    bodyContent.appendChild(scoreLine);
    bodyContent.appendChild(initialsLine);

    pageBodyEl.appendChild(bodyContent);

    submitButton.addEventListener("click", function() {
        highScores = JSON.parse(localStorage.getItem("highScores"));
        console.log("current highScores: " + highScores);

        console.log("initialsInput.value: " + initialsInput.value);
        var scoreObj = {
            initials: initialsInput.value,
            score: score
        }

        console.log("ScoreObj: " + scoreObj);

        if( localStorage.getItem("highScores") == null ) {
            var highScores = [scoreObj];
        }
        else {
            highScores.push(scoreObj);
            console.log("calling sort");
            highScores.sort((a, b) => b.score - a.score);
            console.log("sort called");
        }

        console.log("highScores.stringify(): " + JSON.stringify(highScores));

        if (highScores.length > 5) {
            highScores.pop();
        }

        localStorage.setItem("highScores", JSON.stringify(highScores));

        viewHighScores();

    });
}

function answered(ans) {
    console.log("clicked answer: " + ans);
    var check = document.createElement("p");
    console.log("check element created");
    var corrAns = questions[index].correctAnswer;
    console.log(corrAns);
    if (corrAns === ans) {
        score++;
        check.textContent = "Correct!";
        console.log("answer is correct");
    }
    else {
        secondsLeft -=5;
        check.textContent = "Wrong!";
        console.log("answer is wrong");
        if (secondsLeft <= 0) {
            allDone();
        }
    }
    pageBodyEl.appendChild(check);
    index++;
    displayQuestions();
}



function viewHighScores() {

    clearSection(pageBodyEl);

    pageHeadEl.textContent = "High Scores";

    var highScores = JSON.parse(localStorage.getItem("highScores"));

    var scoreList = document.createElement("ol");
    console.log("highscores:"  + JSON.stringify(highScores));
    var linesArray = [];

    if (highScores != null) {
        for (var i = 0; i < highScores.length; i++) {
            linesArray[i] = document.createElement("li");
            linesArray[i].textContent = (i+1) + ". " + highScores[i].initials.toUpperCase() + " - " + highScores[i].score;
            scoreList.appendChild(linesArray[i]);
        }
    }

    pageBodyEl.appendChild(scoreList);

    var backButton = document.createElement("button");
    var clearHSButton = document.createElement("button");

    backButton.textContent = "Go Back";
    clearHSButton.textContent = "Clear Highscores";

    pageBodyEl.appendChild(backButton);
    pageBodyEl.appendChild(clearHSButton);

    backButton.addEventListener("click", startScreen);
    clearHSButton.addEventListener("click", clearHS);

}

function clearHS () {
    localStorage.clear();
    viewHighScores();
}


viewScoresEl.addEventListener("click", viewHighScores);