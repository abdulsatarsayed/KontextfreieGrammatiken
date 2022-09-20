const resultsTree = {}
export default function DPDA(file, wort, lastStepTree, steps) {
    const startZustand = file.initState
    const bodenZeichen = file.initStackSymbol
    const konfigurationen = file.transitions
    const endZustand = file.finalState
    const leeresWort = ''
    const keller = [bodenZeichen]

    function startKonfiguration(wort, startZustand, kellerSymbol) {
        let ersteKonfiguration = [];
        for (const jedeEingabeSymbol in konfigurationen[startZustand]) {
            for (const jedeKellerSymbol in konfigurationen[startZustand][jedeEingabeSymbol]) {
                if (jedeEingabeSymbol == leeresWort && jedeKellerSymbol == kellerSymbol) {
                    const startpoint = [startZustand, leeresWort, kellerSymbol];
                    ersteKonfiguration.push(startpoint);
                }
                if (jedeEingabeSymbol !== leeresWort && jedeEingabeSymbol == wort[0] && jedeKellerSymbol == kellerSymbol) {
                    const startPoint = [startZustand, wort[0], kellerSymbol]
                    ersteKonfiguration.push(startPoint)
                }
            }
        }
        return ersteKonfiguration;
    }

    function nachFolgeKonfiguration(wort, zustand, vorherigerKeller) {
        const neachsteKonfiguration = []
        const nichtsGelesen = [...wort]
        const nochZuLesen = [...wort]
        const vorherigerKellerKopie = [...vorherigerKeller]
        vorherigerKellerKopie.splice(0, 1)

        for (const jedeEingabeSymbol in konfigurationen[zustand]) {
            for (const jedeKellerSymbol in konfigurationen[zustand][jedeEingabeSymbol]) {
                if (jedeEingabeSymbol === leeresWort && jedeKellerSymbol === vorherigerKeller[0]) {
                    const moeglicheKonfigurationen = konfigurationen[zustand][jedeEingabeSymbol][vorherigerKeller[0]]
                    const naechsteZustand = moeglicheKonfigurationen[0][0]
                    const kellerTupel = moeglicheKonfigurationen[0][1]
                    const stack = [...kellerTupel, ...vorherigerKellerKopie]
                    const akzeptiert = (!nochZuLesen.length && (endZustand === naechsteZustand) || (!stack.length) ? true : false)
                    neachsteKonfiguration.push({
                        moeglichkeit: moeglicheKonfigurationen[0],
                        wort: nichtsGelesen,
                        stack,
                        zustand,
                        akzeptiert
                    })
                }

                else if (jedeEingabeSymbol === nochZuLesen[0] && jedeKellerSymbol === vorherigerKeller[0]) {
                    const moeglicheKonfigurationen = konfigurationen[zustand][jedeEingabeSymbol][vorherigerKeller[0]]
                    const naechsteZustand = moeglicheKonfigurationen[0][0]
                    const kellerTupel = moeglicheKonfigurationen[0][1]
                    const stack = [...kellerTupel, ...vorherigerKellerKopie]
                    const akzeptiert = (!nochZuLesen.length && (endZustand === naechsteZustand) || (!stack.length) ? true : false)
                    neachsteKonfiguration.push({
                        moeglichkeit: moeglicheKonfigurationen[0],
                        wort: nochZuLesen,
                        stack,
                        zustand,
                        akzeptiert
                    })

                }
            }
        }

        nochZuLesen.splice(0, 1)
        return neachsteKonfiguration
    }

    function rekursiveAufruf(neachsteKonfiguration, parent) {
        steps--
        if (steps <= 0) return
        if (neachsteKonfiguration.length) {
            const { moeglichkeit, wort, stack } = neachsteKonfiguration[0]
            const naechsteZustand = moeglichkeit[0]
            const childObject = {
                zustand: `${naechsteZustand},`,
                wort: ` wort:${neachsteKonfiguration[0].wort.join()},`,
                stack: `stack:${neachsteKonfiguration[0].stack.join('')}`,
                akzeptiert: neachsteKonfiguration[0].akzeptiert,
                children: []
            }
            parent.push(childObject)
            const newParent = childObject.children


            const nachFolgeKonfigurationen = nachFolgeKonfiguration(wort, naechsteZustand, stack)
            rekursiveAufruf(nachFolgeKonfigurationen, newParent)


        }

    }

    const startConfigs = startKonfiguration(wort, startZustand, bodenZeichen)
    const rootText = startConfigs.map(el => `(${el.join(',')})`).join('\n')
    resultsTree.name = rootText
    resultsTree.children = []
    const iterateMe = nachFolgeKonfiguration(wort, startZustand, keller)
    rekursiveAufruf(iterateMe, resultsTree.children)
    return resultsTree
}

// module.exports = { validate, DPDA }