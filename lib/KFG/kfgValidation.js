
export default function kfgValidation(file) {
    // const { produktionen } = file
    // for (const jedeVariable of produktionen) {
    //     console.log(Object.keys(jedeVariable).length)
    //     if (Object.keys(jedeVariable).join().length > 1)
    //         return "die hochgeladene Datei entspricht keine kontexfreie Grammatik"
    // }
    if (typeof file !== "object")
        return "Error: Falsches Format gegeben! Bitte geben Sie ein richtiger JSON Format"

    const TupelDerGrammatik = [
        "startSymbol",
        "variablen",
        "terminaleSymbole",
        "produktionen"
    ];

    const grammatikKeys = Object.keys(file);
    if (!grammatikKeys.length)
        return "Error: Tupel Fehler ! Bitte Pruefen Sie Ihre JSON File !"

    for (const JedeTupel of TupelDerGrammatik) {
        if (!grammatikKeys.find((el) => el === JedeTupel))
            return ` Bitte Pruefen Sie Ihr JSON File und genau in dem Tupel --> ${grammatikKeys.find((el) => el !== JedeTupel)}`

    }
    return true
}
// module.exports = kfgValidation;