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
let player = {step: 5}
let time;
let score = 0;

var objects = [ "flower1", "leaf1", "twig1","flower2", "leaf2", "twig2"]
function updateCountDown(){
    if(startGame == true || previewGame == true){
        timerCount.innerHTML = `${time}`;
        scoreCount.innerHTML = `${score}`;
        if(time == 0){
            startGame = false
            if(score >= 15){
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
        scoreCount.innerHTML = `${score}`;
    }
}

function spawnFlower(){
        let flower = document.createElement("div");
        var index = randomInt(objects.length);
        flower.classList.add(objects[index])
        flower.y = ((x+1) * 200) * -1;
        flower.style.top = flower.y + 'px';
        flower.style.right = Math.floor(Math.random() * 600) + 'px';
        background.appendChild(flower);
        if(objects[index] == "flower1"){
            flower.addEventListener("click", () => {
                    flower.classList.add("hide")
                    score = score + 10;
            })
        }
        if(objects[index] == "flower2"){
            flower.addEventListener("click", () => {
                flower.classList.add("hide")
                score = score + 5;
        })
        }
        if(objects[index] == "leaf1"){
            flower.addEventListener("click", () => {
                flower.classList.add("hide")
        })
        }
        if(objects[index] == "leaf2"){
            flower.addEventListener("click", () => {
                flower.classList.add("hide")
        })
        }
        if(objects[index] == "twig1"){
            flower.addEventListener("click", () => {
                flower.classList.add("hide")
                score = score -5;
        })
        }
        if(objects[index] == "twig2"){
            flower.addEventListener("click", () => {
                flower.classList.add("hide")
                score = score -10;
        })
        }
}

function fallingObject(){
    if(startGame){
        moveFlower()
        window.requestAnimationFrame(fallingObject);
    }
}
function previewFall(){
    if(previewGame){
        moveFlower()
        window.requestAnimationFrame(previewFall);
    }
}

function moveFlower(){
    let flowers = document.querySelectorAll(".flower1");
    let flower1 = document.querySelectorAll(".flower2");
    let leafs = document.querySelectorAll(".leaf1");
    let leaf1 = document.querySelectorAll(".leaf2");
    let twigs = document.querySelectorAll(".twig1");
    let twig1 = document.querySelectorAll(".twig2");
    
    flowers.forEach(function(item){
        if(item.y > 400){
            item.y = -300;
            background.removeChild(item);
            spawnFlower();
        }
        item.y = item.y + player.step;
        item.style.top = item.y +"px";
    })
    flower1.forEach(function(item){
        if(item.y > 400){
            item.y = -300;
            background.removeChild(item);
            spawnFlower();
        }
        item.y = item.y + player.step;
        item.style.top = item.y +"px";
    })
    leafs.forEach(function(item){
        if(item.y > 400){
            item.y = -300;
            background.removeChild(item);
            spawnFlower();
        }
        item.y = item.y + player.step;
        item.style.top = item.y +"px";
    })
    leaf1.forEach(function(item){
        if(item.y > 400){
            item.y = -300;
            background.removeChild(item);
            spawnFlower();
        }
        item.y = item.y + player.step;
        item.style.top = item.y +"px";
    })
    twigs.forEach(function(item){
        if(item.y > 400){
            item.y = -300;
            background.removeChild(item);
            spawnFlower();
        }
        item.y = item.y + player.step;
        item.style.top = item.y +"px";
    })
    twig1.forEach(function(item){
        if(item.y > 400){
            item.y = -300;
            background.removeChild(item);
            spawnFlower();
        }
        item.y = item.y + player.step;
        item.style.top = item.y +"px";
    })
}

function randomInt(limit){
    return Math.floor(Math.random() * Math.floor(limit))
}
function start(){
    if(startGame == true){
        window.requestAnimationFrame(fallingObject);
        for(x = 0; x < 5; x++){
            spawnFlower()
        }
    }
}
function preview(){
    if(previewGame == true){
        window.requestAnimationFrame(previewFall);
        for(x = 0; x < 5; x++){
            spawnFlower()
        }
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

preview()
setInterval(updateCountDown, 1000)
setInterval(updateScore, 1)

const startContainer = document.querySelector(".start");
const startButtton = document.querySelector(".startButtton");
const game = document.querySelector(".game");


startButtton.addEventListener("click", () => {
    startContainer.classList.add("hide")
    game.classList.remove("hide")
    startGame = true
    previewGame = false
    remove()
    time = 15
    score = 0
    timerCount.innerHTML = `15`
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
    remove()
    preview()
})
})
