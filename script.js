const background = document.querySelector(".background");
const timerCount = document.querySelector(".timer-count");
const scoreCount = document.querySelector(".score-count");
const goodJob = document.querySelector(".try-harder-background");
const wellDone = document.querySelector(".well-done-background");
const restart = document.querySelectorAll(".restart");
const restartBackground = document.querySelector(".restart-background");
const resultScoreCount = document.querySelectorAll(".result-score-count");
const homeButton = document.querySelectorAll(".home")

const clickSound = document.getElementById("click")
const completed = document.getElementById("completed")
const clap = document.getElementById("clap")

let startGame = false;
let player = {step: 1.2}
let time;
let score = 0;
let border
let flowerWidth
let spawnPoint
let difficulty
let once

var objects = [ "flower1","flower2", "leaf1", "twig1","flower1","flower2", "leaf2", "twig2"]

function updateCountDown(){
    if(startGame == true){
        timerCount.innerHTML = `${time} s`;
        scoreCount.innerHTML = `${score} pt`;
        if(time == 0){
            startGame = false
            if(score >= 50 && difficulty == 1 || score >= 75 && difficulty == 2 || score >= 100 && difficulty == 3){
                game.classList.add("hide")
                restartBackground.classList.remove("hide")
                wellDone.classList.remove("hide")
                resultScoreCount.forEach(function(item){
                    item.innerHTML = `${score}`
                })
            }
            else{
                completed.currentTime = 0
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

function checkEnd(){
    if(time > 10){
        if(score >= 50 && difficulty == 1 || score >= 75 && difficulty == 2 || score >= 100 && difficulty == 3){
            let delay = setTimeout(() => {
                if(!once){
                    clap.currentTime = 0
                    clap.play()
                    once = true
                    return
                }
            },(time + 1) * 1000)
        }
        else{
            let delay = setTimeout(() => {
                if(!once){
                    completed.currentTime = 0
                    completed.play()
                    once = true
                    return
                }
            },(time + 1) * 1000)
        }
        
    }
}

function spawnFlower(){
        border = background.getBoundingClientRect();
        let flower = document.createElement("div");
        var index = randomInt(objects.length);
        flower.classList.add(objects[index])
        flower.y = 0;
        if(border.width < 500){
            flowerWidth = 100
            spawnPoint = 110
            if(difficulty == 1){
                player.step = 2.5
            }
            if(difficulty == 2){
                player.step = 3.5
            }
            if(difficulty == 3){
                player.step = 4.5
            }            
        }
        if(border.width > 500){
            flowerWidth = 200
            spawnPoint = 210
            if(difficulty == 1){
                player.step = 4
            }
            if(difficulty == 2){
                player.step = 6
            }
            if(difficulty == 3){
                player.step = 8
            }            
        }
        flower.style.top = flower.y + 'px';
        flower.style.left = Math.floor(Math.random() * (border.width - flowerWidth)) + 'px';
        background.appendChild(flower);
        function addCorrectInput(point){
            flower.addEventListener("touchstart", () => {
                if(!flower.classList.contains("fadeOut")){
                    playClickSound()
                    flower.classList.add("fadeOut")
                    score = score + point;
                }
                checkEnd()
            })
            flower.addEventListener("click", () => {
                if(!flower.classList.contains("fadeOut")){
                    playClickSound()
                    flower.classList.add("fadeOut")
                    score = score + point;
                }
                checkEnd()
            })
        }
        function addWrongInput(point){
            flower.addEventListener("touchstart", () => {
                if(!flower.classList.contains("wrong")){
                    playClickSound()
                    flower.classList.add("wrong")
                    score = score + point;
                }
                checkEnd()
            })
            flower.addEventListener("click", () => {
                if(!flower.classList.contains("wrong")){
                    playClickSound()
                    flower.classList.add("wrong")
                    score = score + point;
                }
                checkEnd()
            })
        }
        if(objects[index] == "flower1"){
            addCorrectInput(10)
        }
        if(objects[index] == "flower2"){
            addCorrectInput(5)
        }
        if(objects[index] == "leaf1" || objects[index] == "leaf2"){
            addWrongInput(0)
        }
        if(objects[index] == "twig1"){
            addWrongInput(-5)
        }
        if(objects[index] == "twig2"){
            addWrongInput(-10)     
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
        if(item.y >= spawnPoint && item.y < (spawnPoint + player.step)){
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
const easyButtton = document.querySelector(".easyButtton");
const normalButtton = document.querySelector(".normalButtton");
const hardButtton = document.querySelector(".hardButtton");
const selection = document.querySelector(".selection");
const game = document.querySelector(".game");
const gamebackground = document.querySelector(".game-background");

startButtton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        once = false
        startContainer.classList.add("hide")
        selection.classList.remove("hide")
    }, 200);
})

easyButtton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        difficulty = 1
        began()
    }, 200);
})

normalButtton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        difficulty = 2
        began()
    }, 200);
})

hardButtton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        difficulty = 3
        began()
    }, 200);
})

function began(){
    selection.classList.add("hide")
    game.classList.remove("hide")
    startGame = true
    remove()
    time = 30
    timerCount.innerHTML = `${time} s`;
    score = 0
    gamebackground.classList.remove("hide")
    start()
}

restart.forEach(function(item){
    item.addEventListener("click", () => {
        playClickSound()
    let delay = setTimeout(() => {
        startContainer.classList.remove("hide")
        game.classList.add("hide")
        goodJob.classList.add("hide")
        wellDone.classList.add("hide")
        restartBackground.classList.add("hide")
        gamebackground.classList.add("hide")
    remove()
    }, 200);
})
})

homeButton.forEach(function(item){
    item.addEventListener("click", () => {
        playClickSound()
        let delay = setTimeout(() => {
          location.assign('https://gimme.sg/activations/dementia/');
        }, 200);
    })
})

function playClickSound(){
    console.log(clickSound)
    clickSound.currentTime = 0
    clickSound.play()
}

/*prevent double tag zoom*/
document.addEventListener('dblclick', function(event) {
event.preventDefault();
}, { passive: false });