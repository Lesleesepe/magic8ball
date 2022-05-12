const question = document.getElementById("question");
const eightball = document.getElementById("eightBall");
const ask = document.getElementById("ask");


ask.addEventListener("click", () => {
    if (question.value == '') {
        alert("please ask a question.")
    }
    else {
        let randNum = Math.floor(Math.random()*19+1);
        eightball.style.background = `url("../imgs/${randNum}.png")`;
        eightball.style.backgroundSize = "contain";
    }
});