const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScores.forEach(scoreObj => {
    const listItem = document.createElement('li');
    listItem.innerText = `${scoreObj.name} - ${scoreObj.score}`;
    listItem.classList.add('high-score');
    highScoresList.appendChild(listItem);
   })
