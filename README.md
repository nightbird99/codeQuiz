# codeQuiz

## Start Screen
The user is given an explanation and intstruction for how the coding quiz will work. There is a button
to start the quiz as well as a button to view the current highscores.

## The Quiz
An object is created for each question of the quiz. The objects contain the question itself, four answer 
choices, and the correct answer to the question. When the "start quiz" button is clicked, the first question
is loaded onto the screen. Once an answer is clicked, a message appears to tell the user whether their
answer was correct or wrong. The message remains on the screen for one second. In the meantime, the 
next question is loaded onto the screen.

## Checking Answers
When the user clicks on one of the answer choices, the value of the choice is compared to the correct answer
that was stored within the object. If the two values match, the user's answer was correct and the user is 
awared a point. If the answer is incorrect, the remaining time to complete the quiz is decreased by ten 
seconds.

## Finishing the Quiz
The quiz is over when the user has completed all the questions or when there is no more time remaining. In 
either case, the "All Done" screen appears and the user is given their score and prompted to enter their
initials. Once they have clicked the "submit" button, the "View HighScore" page appears.

## High Scores
Only the top 5 high scores are displayed on the high score screen. When a user finishes the quiz and submits 
their initials, an object is created containing their initials and their score. That object is then added to 
an array containing the objects with the current top five scores. The array is then sorted by score in descending
order. Once the array has been sorted, the object with the lowest score is removed from the array. The objects
are then turned into strings containing their place, initials, and score and added to a list of scores which
are then printed to the "view high scores" screen. This screen appears after a user has finished the quiz and 
submitted their initials as well as when the "View HighScores" button is selected at any point.

### The Buttons
Under the printed list of high scores, there are two buttons: "clear highscores" and "go back". When the 
"clear highscores" button is clicked, the highscores are removed from local storage and the screen is 
cleared. When the "go back" button is clicked, the user is returned to the start screen. 
