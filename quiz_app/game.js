const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice'));

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

let current_question = {};
let accepting_answers = true;
let score = 0;
let question_counter = 0;
let available_questions = [];

let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
];

function start_game() {
    question_counter = 0;
    score = 0;
    available_questions = [...questions];
    console.log(available_questions);
    get_new_question();
}

function get_new_question() {
    question_counter++;
    const question_index = Math.floor(Math.random() * available_questions.length)

    current_question = available_questions[question_index];
    const correct_answer = current_question.answer;

    question.innerText = current_question.question;
    choices[0].innerText = current_question.choice1;
    choices[1].innerText = current_question.choice2;
    choices[2].innerText = current_question.choice3;
    choices[3].innerText = current_question.choice4;

}



start_game();