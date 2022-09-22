const background = document.querySelector(".background");
const timerCount = document.querySelector(".timer-count");
const scoreCount = document.querySelector(".score-count");
const goodJob = document.querySelector(".try-harder-background");
const wellDone = document.querySelector(".well-done-background");
const restart = document.querySelectorAll(".restart");
const restartBackground = document.querySelector(".restart-background");
const resultScoreCount = document.querySelectorAll(".result-score-count");

let startGame = false;
let previewGame = true;
let player = {step: 1}
let time;
let score = 0;
let border

var objects = [ "flower1","flower2", "leaf1", "twig1","flower1","flower2", "leaf2", "twig2"]
function updateCountDown(){
    if(startGame == true || previewGame == true){
        timerCount.innerHTML = `${time} s`;
        scoreCount.innerHTML = `${score} pt`;
        if(time == 0){
            startGame = false
            if(score >= 100){
                game.classList.add("hide")
                restartBackground.classList.remove("hide")
                wellDone.classList.remove("hide")
                resultScoreCount.forEach(function(item){
                    item.innerHTML = `${score}`
                })
            }
            else{
                game.classList.add("hide")
                restartBackground.classList.remove("hide")
                goodJob.classList.remove("hide")
                resultScoreCount.forEach(function(item){
                    item.innerHTML = `${score}`
                })
            }
        }
        time--;
    }
}
function updateScore(){
    if(startGame == true){
        scoreCount.innerHTML = `${score} pt`;
    }
}

function spawnFlower(){
        border = background.getBoundingClientRect();
        let flower = document.createElement("div");
        var index = randomInt(objects.length);
        flower.classList.add(objects[index])
        flower.y = 0;
        flower.style.top = flower.y + 'px';
        flower.style.left = Math.floor(Math.random() * (border.width - 100)) + 'px';
        background.appendChild(flower);
        if(objects[index] == "flower1"){
            flower.addEventListener("click", () => {
                if(!flower.classList.contains("fadeOut")){
                    flower.classList.add("fadeOut")
                    score = score + 10;
                }
            })
        }
        if(objects[index] == "flower2"){
            flower.addEventListener("click", () => {
                if(!flower.classList.contains("fadeOut")){
                    flower.classList.add("fadeOut")
                    score = score + 5;
                }
            })
        }
        if(objects[index] == "leaf1"){
            flower.addEventListener("click", () => {
                if(!flower.classList.contains("fadeOut")){
                    flower.classList.add("fadeOut")
                }
            })
        }
        if(objects[index] == "leaf2"){
            flower.addEventListener("click", () => {
                if(!flower.classList.contains("fadeOut")){
                    flower.classList.add("fadeOut")
                }
            })
        }
        if(objects[index] == "twig1"){
            flower.addEventListener("click", () => {
                if(!flower.classList.contains("fadeOut")){
                    flower.classList.add("fadeOut")
                    score = score -5;
                }
            })
        }
        if(objects[index] == "twig2"){
            flower.addEventListener("click", () => {
                if(!flower.classList.contains("fadeOut")){
                    flower.classList.add("fadeOut")
                    score = score -10;
                }
        })
        }
}

function fallingObject(){
    if(startGame){
        moveFlower()
        window.requestAnimationFrame(fallingObject);
    }
}

function moveFlower(){
    let flowers = document.querySelectorAll(".flower1");
    let flower1 = document.querySelectorAll(".flower2");
    let leafs = document.querySelectorAll(".leaf1");
    let leaf1 = document.querySelectorAll(".leaf2");
    let twigs = document.querySelectorAll(".twig1");
    let twig1 = document.querySelectorAll(".twig2");
    
    function condition(item){
        console.log(Math.floor(border.height /4))
        if(item.y >= Math.floor(border.height /4) && item.y < (Math.floor(border.height /4) + 1)){
            spawnFlower();
        }
        if(item.y > border.height){
            background.removeChild(item);
        }
        item.y = item.y + player.step;
        item.style.top = item.y +"px";
    }

    flowers.forEach(function(item){
        condition(item)
    })
    flower1.forEach(function(item){
        condition(item)
    })
    leafs.forEach(function(item){
        condition(item)
    })
    leaf1.forEach(function(item){
        condition(item)
    })
    twigs.forEach(function(item){
        condition(item)
    })
    twig1.forEach(function(item){
        condition(item)
    })
}

function randomInt(limit){
    return Math.floor(Math.random() * Math.floor(limit))
}
function start(){
    if(startGame == true){
        window.requestAnimationFrame(fallingObject);
        spawnFlower()
    }
}

function remove(){
    let flowers = document.querySelectorAll(".flower1");
    let flower1 = document.querySelectorAll(".flower2");
    let leafs = document.querySelectorAll(".leaf1");
    let leaf1 = document.querySelectorAll(".leaf2");
    let twigs = document.querySelectorAll(".twig1");
    let twig1 = document.querySelectorAll(".twig2");
    
    flowers.forEach(function(item){
        background.removeChild(item);
    })
    flower1.forEach(function(item){
        background.removeChild(item);
    })
    leafs.forEach(function(item){
        background.removeChild(item);
    })
    leaf1.forEach(function(item){
        background.removeChild(item);
    })
    twigs.forEach(function(item){
        background.removeChild(item);
    })
    twig1.forEach(function(item){
        background.removeChild(item);
    })
}

setInterval(updateCountDown, 1000)
setInterval(updateScore, 1)

const startContainer = document.querySelector(".start");
const startButtton = document.querySelector(".startButtton");
const game = document.querySelector(".game");
const gamebackground = document.querySelector(".game-background");


startButtton.addEventListener("click", () => {
    startContainer.classList.add("hide")
    game.classList.remove("hide")
    startGame = true
    previewGame = false
    remove()
    time = 70
    timerCount.innerHTML = `${time} s`;
    score = 0
    gamebackground.classList.remove("hide")
    start()
})

restart.forEach(function(item){
    item.addEventListener("click", () => {
    startContainer.classList.remove("hide")
    game.classList.add("hide")
    goodJob.classList.add("hide")
    wellDone.classList.add("hide")
    restartBackground.classList.add("hide")
    previewGame = true
    gamebackground.classList.add("hide")
    remove()
})
})

