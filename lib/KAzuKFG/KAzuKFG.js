// const validate = require('./umwandlungValidation.js')

export default function KAzuKFG(file) {
    const zustaende = file.states;
    const eingabeAlphabet = file.inputSymbols;
    const kellerAlphabet = file.stackSymbols;
    const konfigurationen = file.transitions;
    const startZustand = file.initState;
    const bodenZeichen = file.initStackSymbol;
    const startVariabel = "S";
    var variablen = [startVariabel];
    const newProduktionen = []


    function combineArrays(array_of_arrays) {
        if (!array_of_arrays) {
            return [];
        }

        if (!Array.isArray(array_of_arrays)) {
            return [];
        }

        if (array_of_arrays.length == 0) {
            return [];
        }

        for (let i = 0; i < array_of_arrays.length; i++) {
            if (!Array.isArray(array_of_arrays[i]) || array_of_arrays[i].length == 0) {
                return [];
            }
        }

        let odometer = new Array(array_of_arrays.length);

        odometer.fill(0);
        let output = [];

        let newCombination = formCombination(odometer, array_of_arrays);

        output.push(newCombination);

        while (odometer_increment(odometer, array_of_arrays)) {
            newCombination = formCombination(odometer, array_of_arrays);
            output.push(newCombination);
        }
        return output;
    }

    function formCombination(odometer, array_of_arrays) {
        return odometer.reduce(
            function (accumulator, odometer_value, odometer_index) {
                return [accumulator, array_of_arrays[odometer_index][odometer_value]].flat().filter(el => el);
            },
            ""
        );
    }

    function odometer_increment(odometer, array_of_arrays) {
        for (let i_odometer_digit = odometer.length - 1; i_odometer_digit >= 0; i_odometer_digit--) {
            let maxee = array_of_arrays[i_odometer_digit].length - 1;
            if (odometer[i_odometer_digit] + 1 <= maxee) {
                odometer[i_odometer_digit]++;
                return true;
            }
            else {
                if (i_odometer_digit - 1 < 0) {
                    return false;
                }
                else {
                    odometer[i_odometer_digit] = 0;
                    continue;
                }
            }
        }
    }

    function getVariablen(arr) {
        for (const zustand1 of zustaende) {
            for (const kellerSymbol of kellerAlphabet) {
                for (const zustand2 of zustaende) {
                    arr.push([zustand1, kellerSymbol, zustand2].join());
                }
            }
        }
        return arr;
    }

    function getStartProduktion() {
        const moeglichkeiten = []
        for (const zustand1 of zustaende) {
            for (const kellerSymbol of kellerAlphabet) {
                for (const zustand2 of zustaende) {
                    if (zustand1 === startZustand && kellerSymbol === bodenZeichen) {
                        moeglichkeiten.push([[zustand1, kellerSymbol, zustand2].join()])
                    }
                }
            }
        }
        return [{ [startVariabel]: moeglichkeiten }]
    }

    function schneiden(Anzahl, array) {
        const arrayKopie = [...array]
        const ergebnis = []
        while (arrayKopie.length) {
            ergebnis.push(arrayKopie.splice(0, array.length / Anzahl))
        }
        return ergebnis
    }


    function getProduktionen(konfigurationen) {
        const res = []
        for (const Erstezustand in konfigurationen) {

            for (const eingabeSymbol in konfigurationen[Erstezustand]) {
                for (const KellerSymbol in konfigurationen[Erstezustand][eingabeSymbol]) {
                    for (const neuTupel of konfigurationen[Erstezustand][eingabeSymbol][KellerSymbol]) {
                        const [zweiterZustand, neuKellerSymbol] = neuTupel
                        if (!neuKellerSymbol.length) {
                            res.push({ [`${Erstezustand},${KellerSymbol},${zweiterZustand}`]: [eingabeSymbol] })
                        }
                        else {
                            const kombination = combineArrays([neuKellerSymbol, zustaende])
                            const zweiteKombination = schneiden(neuKellerSymbol.length, kombination)
                            for (const result of combineArrays(zweiteKombination)) {
                                const moeglichkeiten = schneiden(neuKellerSymbol.length, result)
                                const secondOptions = moeglichkeiten.map((el, i) => {
                                    if (moeglichkeiten[i - 1]) {
                                        return [moeglichkeiten[i - 1][moeglichkeiten[i - 1].length - 1], ...el]
                                    }

                                    else {
                                        return [zweiterZustand, ...el]
                                    }
                                })

                                res.push({ [`${Erstezustand},${KellerSymbol},${result[result.length - 1]}`]: [eingabeSymbol, secondOptions.map(el => el.join())].flat(1) })
                            }

                        }
                    }
                }
            }

        }
        return res

    }

    const listeDerProduktionen = getProduktionen(konfigurationen);

    function produktionenZusammenfuehren() {
        const keys = [...new Set(listeDerProduktionen.map(el => Object.keys(el)).flat())]
        for (const key of keys) {
            newProduktionen.push({
                [key]: listeDerProduktionen.filter(el => el[key]).map(el => el[key])
            })
        }
        return newProduktionen;
    }

    return {
        "startSymbol": [startVariabel],
        "terminaleSymbole": eingabeAlphabet,
        "variablen": getVariablen(variablen),
        "produktionen": [...getStartProduktion(), ...produktionenZusammenfuehren()],

    }
}

// module.exports = { validate, KAzuKFG }