export default function fileFilter(file) {
    let { produktionen, startSymbol, variablen } = file
    let nichtErreichbaren = [...variablen]

    function getCandidates(input) {
        const candidates = produktionen.find(el => Object.keys(el)[0] === input)
        if (!candidates) return []
        return candidates[input]
    }

    function isVariable(input, variablen) {
        return variablen.find(el => {
            if (Array.isArray(el)) return el.join() === input
            return el === input
        }) ? true : false
    }

    const removeFromArray = (array, value) => array.filter(el => el !== value)

    const removeVariable = (variable) => {
        variablen = variablen.filter(el => el !== variable)
        produktionen = produktionen.filter(el => Object.keys(el)[0] !== variable)
        for (const produktion of produktionen) {
            const key = Object.keys(produktion)[0]
            produktion[key] = produktion[key].filter(el => !el.find(el2 => el2 === variable))
        }
    }

    const produktive = (produktion) => {
        const key = Object.keys(produktion)[0]
        const candidates = produktion[key]
        const filteredProduktionen = produktion[key].filter(el => el.find(el2 => el2 === key))
        return filteredProduktionen.length !== candidates.length
    }



    nichtErreichbaren = removeFromArray(nichtErreichbaren, startSymbol[0])

    const recursiveNichtErreichbarFilter = (candidates) => {
        for (const candidate of candidates) {
            for (const char of candidate) {
                if (!isVariable(char, variablen)) continue
                const nextCandidates = getCandidates(char)

                if (!nichtErreichbaren.find(el => el === char)) continue
                nichtErreichbaren = removeFromArray(nichtErreichbaren, char)
                if (!nichtErreichbaren.length) return
                if (!nextCandidates.length) {
                    for (const produktion2 of produktionen) removeVariable(char)
                    continue
                }

                recursiveNichtErreichbarFilter(nextCandidates)
            }
        }
    }

    const startSymbolCandidates = produktionen.find(el => el[startSymbol])[startSymbol]
    recursiveNichtErreichbarFilter(startSymbolCandidates)

    for (const nichtErreichbar of nichtErreichbaren) {
        variablen = removeFromArray(variablen, nichtErreichbar)
        produktionen = produktionen.filter(el => Object.keys(el)[0] !== nichtErreichbar)
    }

    for (const produktion of produktionen) {
        if (!produktive(produktion)) {
            removeVariable(Object.keys(produktion)[0])
        }
    }
    file.produktionen = produktionen
    file.variablen = variablen
    return file
}
