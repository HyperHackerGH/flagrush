const flagelem = document.getElementById("flag")

const sizes = [160, 320, 640, 1280, 2560]
var currentflag = ""
var score = 0
var timer = 30

document.getElementById("restart").addEventListener("click", () => {location.reload()})

function getsize() {
    let w = window.innerWidth
    let s = sizes[0]

    for (let i = 0; i < sizes.length; i++) {
        if (w >= sizes[i]) {s = sizes[i - 1]}
    }

    return s
}

function end() {
    document.getElementById("end").style.display = "block"
    document.getElementById("container").style.display = "none"
    document.getElementById("menu").style.display = "none"

    document.getElementById("finalscore").innerHTML = "Score: " + score
}

document.getElementById("start").addEventListener("click", () => {
    document.getElementById("menu").style.display = "none"
    document.getElementById("container").style.display = "block"

    newflag()

    var total = timer * 1000
    var interval = 50

    newflag()

    var countdown = setInterval(() => {
        total -= interval

        if (total <= 0) {
            clearInterval(countdown)
            document.getElementById("timer").innerHTML = "Time: 0.000"
            end()
        }
        
        else {
            var seconds = Math.floor(total / 1000)
            var millis = total % 1000
            var display = "Time: " + seconds + "." + millis.toString()

            document.getElementById("timer").innerHTML = display
        }
    }, interval)
})

var size = getsize()

window.addEventListener("resize", () => {
    size = getsize()
    newflag(true)
})

function newflag(resize = false) {
    if (!resize) {
        for (let i of document.getElementsByClassName("option")) {i.classList.remove("correct")}

        const keys = Object.keys(flags)
        const correctindex = Math.floor(Math.random() * keys.length)
        const correctkey = keys[correctindex]
        const correctpos = Math.floor(Math.random() * 4)
        
        currentflag = correctkey
        flagelem.src = "https://flagcdn.com/w" + size + "/" + correctkey + ".png"
        
        const used = [correctkey]

        for (let i = 0; i < 4; i++) {
            const optionelem = document.getElementById("o" + (i + 1))

            if (i == correctpos) {
                optionelem.innerHTML = flags[correctkey]
                optionelem.classList.add("correct")
            }

            else {
                let randkey
                
                do {
                    randkey = keys[Math.floor(Math.random() * keys.length)]
                } while (used.includes(randkey))

                used.push(randkey)
                optionelem.innerHTML = flags[randkey]
            }
        }
    }

    else {flagelem.src = "https://flagcdn.com/w" + size + "/" + currentflag + ".png"}
}

newflag()

for (let i of document.getElementsByClassName("option")) {
    i.addEventListener("click", () => {
        if (i.classList.contains("correct")) {
            const scoreelem = document.getElementById("score")
            score++
            scoreelem.innerHTML = "Score: " + score
        }

        newflag()
    })
}