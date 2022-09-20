export default function npdaValidation(kfg_Tupel) {
    try {
        if (typeof kfg_Tupel !== 'object')
            throw new Error('Falsches Format gegeben! Bitte geben Sie ein richtiger JSON Format')


        const Automaten_Tupel = [
            'states',
            'inputSymbols',
            'stackSymbols',
            'transitions',
            'initState',
            'initStackSymbol',
        ]

        const KonfigsKeys = Object.keys(kfg_Tupel)
        if (!KonfigsKeys.length)
            throw new Error('Tupel Fehler! Bitte Pruefen Sie Ihre JSON File!')

        for (const JedeTupel of Automaten_Tupel) {
            if (!KonfigsKeys.find(el => el === JedeTupel))
                throw new Error(`Bitte Pruefen Sie Ihr JSON File und genau in dem Tupel ${el}`)
        }
        return true
    } catch (err) {
        throw new Error(err)
    }

}
// module.exports = npdaValidation