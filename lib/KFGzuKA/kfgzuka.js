
// const validate = require('./kfgzukaValidation.js')
export default function KFGzuKA(file) {
    const initStackSymbol = file.startSymbol[0]
    const inputSymbols = file.terminaleSymbole
    const stackSymbols = Array.from(new Set(file.terminaleSymbole.concat(file.variablen)))
    const produktionen = file.produktionen
    const states = "Z"

    function eingabeKonfig(eingabeSymbol) {
        let eingabeKonfigList = []
        let result = {};
        let neachstKonfig = ["Z", []]
        if (!eingabeSymbol.length) {
            return false
        }
        for (const jedeSymbol of eingabeSymbol) {
            let eingabeUndKeller = {
                [jedeSymbol]: { [jedeSymbol]: [neachstKonfig] }
            }
            eingabeKonfigList.push(eingabeUndKeller)
        }


        for (const el of eingabeKonfigList) {
            var tmp = Object.assign(result, el)
        }
        return tmp
    }

    function getKonfiguration(produktionen) {
        const innerResults = {}
        for (const produktion of produktionen) {
            const key = Object.keys(produktion)[0]
            const tuplen = produktion[key]
            innerResults[key] = []
            for (const tuple of tuplen) {
                innerResults[key].push([states, tuple])
            }
        }
        return { "": innerResults }

    }
    const konfiguration = getKonfiguration(produktionen)
    const eingabeKonfiguration = eingabeKonfig(inputSymbols)
    const finalResults = {
        states: [states],
        inputSymbols,
        stackSymbols,
        transitions: {
            [states]: {
                ...konfiguration,
                ...eingabeKonfiguration
            }
        },
        initState: states,
        initStackSymbol,

    }
    return finalResults
}
// module.exports = { validate, kfgzuKa }
