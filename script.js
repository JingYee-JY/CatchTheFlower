const startButtton = document.querySelector(".start");
const easyButtton = document.querySelector(".easy");
const normalButtton = document.querySelector(".normal");
const hardButtton = document.querySelector(".hard");
const beganButton = document.querySelector(".startGame")
const again = document.querySelector(".again");
const home = document.querySelector(".home")

const startPage = document.querySelector(".startPage");
const selection = document.querySelector(".selectionPage");
const instructionPage = document.querySelector(".instructionPage");
const gamePage = document.querySelector(".gamePage");
const finalPage = document.querySelector(".finalPage");

const details = document.querySelector(".details");
const text = document.querySelector(".text");
const background = document.querySelector(".background");
const countDown = document.querySelector(".countDown");
const scoreCount = document.querySelector(".score-count");
const result = document.querySelector(".result");

const clickSound = document.getElementById("click")
const completed = document.getElementById("completed")
const clap = document.getElementById("clap")

let startGame = false;
let player = {step: 1.2}
let time;
let totalFlower;
let countDownTimer;
let countingDown;
let score = 0;
let border
let flowerWidth
let spawnPoint
let once

//CHANGE HERE ONLY FOR WIN CONDITION FOR DIFFERENT LEVEL
let easyTotalFlower = 20;
let normalTotalFlower = 30;
let hardTotalFlower = 40;

var objects = [ "flower1","flower2", "leaf1", "flower3"]

function updateTimer(){
    if(startGame == true){
        scoreCount.innerHTML = `<p>${score}</p>`;
        if(time == 0){
            startGame = false
            completed.currentTime = 0
            finalPage.classList.remove("hide")
            result.src = "../img/lose.png"
            }
    }
    time--;
}

function updateCountDown(){
    if(startGame == true && countDownTimer > 0){
        countDown.innerHTML = `<p>${countDownTimer}</p>`;
        countDownTimer -= 1;
    }
    else{
        clearInterval(countingDown)
        countDown.classList.add("hide");
    }
}

function updateScore(){
    if(startGame == true){
        scoreCount.innerHTML = `<p>${score}</p>`;
    }
}

function checkEnd(){
    if(score == totalFlower){
        let delay = setTimeout(() => {
            if(!once){
                clap.currentTime = 0
                clap.play()
                startGame = false
                once = true
                finalPage.classList.remove("hide")
                result.src = "../img/win.png"
                return
            }
        },1200)
    }
}

function spawnFlower(){
        border = background.getBoundingClientRect();
        let flower = document.createElement("div");
        var index = randomInt(objects.length);
        flower.classList.add("object")
        flower.classList.add(objects[index])
        flower.y = 0;

        //Checking phone size
        //phone & computer
        if(border.width < 500){
            flowerWidth = 150
            spawnPoint = 110

            //CHANGE HERE ONLY FOR OBJECT SPEED FOR PHONE AND COMPUTER
            if(totalFlower == easyTotalFlower){
                player.step = 2.5
            }
            if(totalFlower == normalTotalFlower){
                player.step = 3.5
            }
            if(totalFlower == hardTotalFlower){
                player.step = 4.5
            }            
        }
        //ipad
        if(border.width > 500){
            flowerWidth = 250
            spawnPoint = 210

            //CHANGE HERE ONLY FOR OBJECT SPEED FOR IPAD
            if(totalFlower == easyTotalFlower){
                player.step = 4
            }
            if(totalFlower == normalTotalFlower){
                player.step = 6
            }
            if(totalFlower == hardTotalFlower){
                player.step = 8
            }            
        }

        flower.style.top = flower.y + 'px';
        flower.style.left = Math.floor(Math.random() * (border.width - flowerWidth)) + 'px';
        background.appendChild(flower);

        function addCorrectInput(){
            flower.addEventListener("touchstart", () => {
                if(!flower.classList.contains("fadeOut")){
                    playClickSound()
                    flower.classList.add("fadeOut")
                    score += 1;
                    checkEnd()
                }
            })
            flower.addEventListener("click", () => {
                if(!flower.classList.contains("fadeOut")){
                    playClickSound()
                    flower.classList.add("fadeOut")
                    score += 1;
                }
            })
        }

        function addWrongInput(){
            flower.addEventListener("touchstart", () => {
                if(!flower.classList.contains("wrong")){
                    playClickSound()
                    flower.classList.add("wrong")
                }
                checkEnd()
            })
            flower.addEventListener("click", () => {
                if(!flower.classList.contains("wrong")){
                    playClickSound()
                    flower.classList.add("wrong")
                    checkEnd()
                }
            })
        }
        if(objects[index] == "flower1"){
            addCorrectInput()
        }
        if(objects[index] == "flower2"){
            addCorrectInput()
        }
        if(objects[index] == "leaf1"){
            addWrongInput(0)
        }
        if(objects[index] == "flower3"){
            addCorrectInput()
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
    let flower3 = document.querySelectorAll(".flower3");
    
    function condition(item){
        console.log(Math.floor(border.height /4))
        if(item.y >= spawnPoint && item.y < (spawnPoint + player.step)){
            spawnFlower();
        }
        if(item.y > (border.height + flowerWidth)){
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
    flower3.forEach(function(item){
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
    let flower3 = document.querySelectorAll(".flower3");
    
    flowers.forEach(function(item){
        background.removeChild(item);
    })
    flower1.forEach(function(item){
        background.removeChild(item);
    })
    leafs.forEach(function(item){
        background.removeChild(item);
    })
    flower3.forEach(function(item){
        background.removeChild(item);
    })
}

setInterval(updateTimer, 1000)
setInterval(updateScore, 1)

startButtton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        once = false
        startPage.classList.add("hide")
        selection.classList.remove("hide")
    }, 200);
})

easyButtton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        totalFlower = easyTotalFlower
        began()
    }, 200);
})

normalButtton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        totalFlower = normalTotalFlower
        began()
    }, 200);
})

hardButtton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        totalFlower = hardTotalFlower
        began()
    }, 200);
})

beganButton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        instructionPage.classList.add("hide")
        start()
        countingDown = setInterval(updateCountDown, 1000);
    }, 200);
})

function began(){
    instructionPage.classList.remove("hide")
    selection.classList.add("hide")
    gamePage.classList.remove("hide")
    countDown.classList.remove("hide");
    details.innerHTML = `
    <p>
    Successfully Tab a <br>
    flower will get 1 <br>
    point. Once Get ${totalFlower} <br>
    point will win the game
    </p>`
    text.innerHTML = `Catch ${totalFlower} flowers`
    startGame = true
    remove()
    countDownTimer = 3;
    countDown.innerHTML = `<p>${countDownTimer}</p>`;
    time = 240
    score = 0
}

again.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        startPage.classList.remove("hide")
        gamePage.classList.add("hide")
        finalPage.classList.add("hide")
        remove()
    }, 200);
})


home.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
      location.assign('https://gimme.sg/activations/dementia/');
    }, 200);
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