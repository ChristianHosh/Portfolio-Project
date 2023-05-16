const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice'));
const score_el = document.getElementById('score-text');
const question_num_el = document.getElementById('question-num-text');

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
    if (available_questions.length === 0 || question_counter >= MAX_QUESTIONS){
        // GO TO END PAGE
        console.log("END" + available_questions + ", " + question_counter);
        // return window.location.assign('/end.html');
    }

    question_counter++;
    question_num_el.innerText = `${question_counter}/${MAX_QUESTIONS}`;
    score_el.innerText = score;

    const question_index = Math.floor(Math.random() * available_questions.length);

    current_question = available_questions[question_index];
    const correct_answer = current_question.answer;

    question.innerText = current_question.question;
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = current_question['choice' + number];

    })
    available_questions.splice(question_index, 1);

    accepting_answers = true;

}

function increment_score(CORRECT_BONUS) {
    score += CORRECT_BONUS;
    score_el.innerText = score;
}

choices.forEach(choice => {
    choice.addEventListener('click', event => {
        if (!accepting_answers) return;

        accepting_answers = false;
        const selected_choice = event.target;
        const selected_answer = selected_choice.dataset['number'];

        const classToApply = selected_answer == current_question.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct')
            increment_score(CORRECT_BONUS);

        selected_choice.parentElement.classList.add(classToApply);
        setTimeout( () => {
            selected_choice.parentElement.classList.remove(classToApply);
            get_new_question();
        }, 1000);
    })
})

start_game();