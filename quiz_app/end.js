const most_recent_score = localStorage.getItem('most_recent_score');
const username = document.getElementById('username');
const save_score_btn = document.getElementById('submit-btn');
const final_score_text = document.getElementById('final-score');

const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

const MAX_HIGH_SCORES = 5;


final_score_text.innerText = most_recent_score;

username.addEventListener("keyup", () => {
    save_score_btn.disabled = !username.value;
})

save_score = e => {
    e.preventDefault();

    const score = {
        score: Math.floor(Math.random() * 100),
        name: username.value
    };
    highscores.push(score);

    highscores.sort( (a,b) => b.score - a.score);
    highscores.splice(MAX_HIGH_SCORES);

    console.log(highscores)

    localStorage.setItem('highscores', JSON.stringify(highscores));
    window.location.assign('game_index.html');
}