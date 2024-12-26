const luck = [[1, 0.600], [2, 0.596], [3, 0.592], [4, 0.591], [5, 0.586], [6, 0.582], [7, 0.579], [8, 0.575], [9, 0.571], [10, 0.568], [11, 0.565], [12, 0.561], [13, 0.558], [14, 0.554], [15, 0.552], [16, 0.549], [17, 0.545], [18, 0.541], [19, 0.539], [20, 0.536], [21, 0.531], [22, 0.528], [23, 0.525], [24, 0.523], [25, 0.519], [26, 0.517], [27, 0.513], [28, 0.511], [29, 0.507], [30, 0.503], [31, 0.501], [32, 0.498], [33, 0.495], [34, 0.491], [35, 0.489], [36, 0.486], [37, 0.483], [38, 0.480], [39, 0.477], [40, 0.475], [41, 0.471], [42, 0.469], [43, 0.467], [44, 0.464], [45, 0.461], [46, 0.457], [47, 0.456], [48, 0.453], [49, 0.448], [50, 0.447], [51, 0.445], [52, 0.442], [53, 0.439], [54, 0.437], [55, 0.434], [56, 0.430], [57, 0.428], [58, 0.426], [59, 0.423], [60, 0.420], [61, 0.418], [62, 0.416], [63, 0.413], [64, 0.410], [65, 0.408], [66, 0.406], [67, 0.404], [68, 0.401], [69, 0.399], [70, 0.396], [71, 0.393], [72, 0.392], [73, 0.388], [74, 0.387], [75, 0.384], [76, 20.627], [77, 13.946], [78, 9.429], [79, 6.375], [80, 4.306], [81, 2.914], [82, 1.970], [83, 1.332], [84, 0.901], [85, 0.608], [86, 0.411], [87, 0.278], [88, 0.187], [89, 0.126], [90, 0.265]]

function getValues() {
    let primo = parseInt(document.querySelector('input#calcPrimoNum').value)
    let fates = parseInt(document.querySelector('input#calcFateNum').value)
    let pity = parseInt(document.querySelector('input#calcPityNum').value)
    let currentPulls = Math.floor(primo / 160) + fates + pity

    let message = nextFiveStar(primo, fates, pity, currentPulls)
    let pPulls = document.querySelector('p#calcCurrentPulls')

    if (currentPulls) {
        pPulls.textContent = 'You currently have ' + (currentPulls - pity) + ' pulls.'
    }
    let pAns = document.querySelector('p#calcAnswer')
    pAns.textContent = message
    
    let style = document.getElementById('calcResults')
    style.style.display = "block"
}

function nextFiveStar(primo, fates, pity, currentPulls) {
    // returns a try again statement if the number is invalid, and returns 100% chance if primos or fates are over the roof pity.
    if (fates >= 90 || Math.floor(primo / 160) >= 90 || currentPulls >= 90) {
        return "There is a 100.00% chance you'll get a 5 star if you use all your pulls."
    }
    else if (currentPulls < 0 || pity < 0 || pity >= 90 || fates < 0 || primo < 0 || !currentPulls && currentPulls != 0 || !primo && primo != 0 || !fates && fates != 0 || !pity && pity != 0) {
        return "One of the numbers entered is invalid. Please try again."
    }

    // calculates the percentage that user will get a 5 star in the next pull
    else {
        let totalPercent = 0

        // if use has no primos and fates to do a pull, it will calculate and return the percentage for the next 5 star, however gives a friendly reminder to get some
        if (primo < 160 && fates == 0) {
            for (let i = 0; i <= currentPulls; i++) {
                totalPercent += luck[i][1]
            }
            return "There is a " + totalPercent.toFixed(2) + "% chance you'll get a 5 star in the next pull. Make sure to grind some more primogems :D"
        }

        // if user has primos, it will calculate and return the percentage for the next 5 star
        else {
            for (let i = 0; i < currentPulls; i++) {
                totalPercent += luck[i][1]
            }
            return "There is a " + totalPercent.toFixed(2) + "% chance you'll get a 5 star if you use all your pulls."
        }
    }
}

