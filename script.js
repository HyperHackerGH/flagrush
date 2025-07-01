const flagelem = document.getElementById("flag")

function newflag() {
    for (let i of document.getElementsByClassName("option")) {
        i.classList.remove("correct")
    }

    const keys = Object.keys(flags)
    const correctindex = Math.floor(Math.random() * keys.length)
    const correctkey = keys[correctindex]
    const correctpos = Math.floor(Math.random() * 4)
    
    flagelem.src = "https://flagcdn.com/w640/" + correctkey + ".png"
    
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

newflag()

for (let i of document.getElementsByClassName("option")) {
    i.addEventListener("click", () => {
        if (i.classList.contains("correct")) {
            const scoreelem = document.getElementById("score")
            scoreelem.innerHTML = "Score: " + (parseInt(scoreelem.innerHTML.split(": ")[1]) + 1)

            newflag()
        }

        else {
            alert("lose")
        }
    })
}