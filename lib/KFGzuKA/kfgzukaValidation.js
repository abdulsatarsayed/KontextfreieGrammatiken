
export default function KFGzuKAValidation(GrammatikTupel) {
    if (typeof GrammatikTupel !== "object")
        return console.log(
            "Error: Falsches Format gegeben! Bitte geben Sie ein richtiger JSON Format"
        );

    const TupelDerGrammatik = [
        "startSymbol",
        "variablen",
        "terminaleSymbole",
        "produktionen"
    ];

    const grammatikKeys = Object.keys(GrammatikTupel);
    if (!grammatikKeys.length)
        return console.log(
            "Error: Tupel Fehler ! Bitte Pruefen Sie Ihre JSON File !"
        );

    for (const JedeTupel of TupelDerGrammatik) {
        if (!grammatikKeys.find((el) => el === JedeTupel))
            return ` Bitte Pruefen Sie Ihr JSON File und genau in den Tupel`
    }
    return true
}
// module.exports = KFGzuKAValidation 