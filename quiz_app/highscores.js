const highscores_list = document.getElementById('highscore-list');
const highscores = JSON.parse(localStorage.getItem('highscores')) || [];

highscores_list.innerHTML = highscores
    .map(score => {
        return (`<li class="list-group-item">${score.name} <em style="font-style: normal; color: #0D6EFD">${score.score}</em></li>`)
    }).join("");
