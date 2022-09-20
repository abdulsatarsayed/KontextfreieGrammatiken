export default function npdaValidation(file) {

    if (typeof file !== 'object')
        return 'Falsches Format gegeben! Bitte geben Sie ein richtiger JSON Format'


    const Automaten_Tupel = [
        'states',
        'inputSymbols',
        'stackSymbols',
        'transitions',
        'initState',
        'initStackSymbol',
    ]

    const KonfigsKeys = Object.keys(file)
    if (!KonfigsKeys.length)
        return 'Tupel Fehler! Bitte Pruefen Sie Ihre JSON File!'

    for (const JedeTupel of Automaten_Tupel) {
        if (!KonfigsKeys.find(el => el === JedeTupel))
            return ` Bitte Pruefen Sie Ihr JSON File und genau in den Tupel`
    }
    return true

}
// module.exports = npdaValidation