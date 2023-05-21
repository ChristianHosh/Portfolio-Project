const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice'));
const score_el = document.getElementById('score-text');
const question_num_el = document.getElementById('question-num-text');
const game = document.getElementById('game');
const loader = document.getElementById('loader');

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

let current_question = {};
let accepting_answers = true;
let score = 0;
let question_counter = 0;
let available_questions = [];

let questions = [];
fetch("https://opentdb.com/api.php?amount=10&category=9&type=multiple&encode=base64")
    .then( res => {
        return res.json();
    })
    .then(loaded_questions => {
        console.log(loaded_questions.results);
        questions = loaded_questions.results.map( loaded_question => {
            const formatted_question = {
                question : atob(loaded_question.question),

            }
            const answer_choices = [...loaded_question.incorrect_answers];
            formatted_question.answer = Math.floor(Math.random() * 3) + 1;
            answer_choices.splice(formatted_question.answer - 1, 0, loaded_question.correct_answer);

            answer_choices.forEach((choice, index) => {
                formatted_question["choice" + (index+1)] = atob(choice);
            })
            return formatted_question;
        })

        start_game();
    })
    .catch(err => {
        console.error(err);
    })

function start_game() {
    question_counter = 0;
    score = 0;
    available_questions = [...questions];
    console.log(available_questions);
    get_new_question();
    game.classList.remove('visually-hidden');
    loader.classList.add('visually-hidden');
}

function get_new_question() {
    if (available_questions.length === 0 || question_counter >= MAX_QUESTIONS){
        // GO TO END PAGE
        console.log("END" + available_questions + ", " + question_counter);
        localStorage.setItem('most_recent_score', score);
        return window.location.assign('end.html');
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