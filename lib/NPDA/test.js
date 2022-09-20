// const resultsTree = {}
const file = require('./npda1.json')
console.log(file)


// function NPDA(file, zeichenkette, steps) {

//     const startTime = performance.now()
//     const startZustand = file.initState
//     const bodenZeichen = file.initStackSymbol
//     const konfigurationen = file.transitions
//     const leeresWort = ''
//     const keller = [bodenZeichen]

//     function nachFolgeKonfiguration(wort, zustand, vorherigerKeller) {
//         const listeDerMoeglichenKonfigurationen = []
//         const nichtsGelesen = [...wort]
//         const nochZuLesen = [...wort]
//         const vorherigerKellerKopie = [...vorherigerKeller]
//         vorherigerKellerKopie.splice(0, 1)

//         for (const jedeEingabeSymbol in konfigurationen[zustand]) {
//             for (const jedeKellerSymbol in konfigurationen[zustand][jedeEingabeSymbol]) {
//                 if (jedeEingabeSymbol === leeresWort && jedeKellerSymbol === vorherigerKeller[0]) {
//                     const moeglicheKonfigurationen = konfigurationen[zustand][jedeEingabeSymbol][vorherigerKeller[0]]
//                     for (const moeglicheKonfiguration of moeglicheKonfigurationen) {
//                         const kellerTupel = moeglicheKonfiguration[1]
//                         const stack = [...kellerTupel, ...vorherigerKellerKopie]
//                         const akzeptiert = (!nochZuLesen.length && !stack.length ? true : false)
//                         listeDerMoeglichenKonfigurationen.push({
//                             moeglichkeit: moeglicheKonfiguration,
//                             wort: nichtsGelesen,
//                             stack,
//                             zustand,
//                             akzeptiert,
//                             KellerBlockieren: false
//                         })
//                     }
//                 }

//                 if (jedeEingabeSymbol !== leeresWort && jedeEingabeSymbol === nochZuLesen[0] && jedeKellerSymbol === vorherigerKeller[0]) {
//                     const moeglicheKonfigurationen = konfigurationen[zustand][jedeEingabeSymbol][vorherigerKeller[0]]
//                     for (const moeglicheKonfiguration of moeglicheKonfigurationen) {
//                         const kellerTupel = moeglicheKonfiguration[1]
//                         const stack = [...kellerTupel, ...vorherigerKellerKopie]
//                         const akzeptiert = (!nochZuLesen.length && !stack.length ? true : false)
//                         const KellerBlockieren = (nochZuLesen.length && !stack.length ? true : false)
//                         listeDerMoeglichenKonfigurationen.push({
//                             moeglichkeit: moeglicheKonfiguration,
//                             wort: nochZuLesen,
//                             stack,
//                             zustand,
//                             akzeptiert,
//                             KellerBlockieren
//                         })
//                     }
//                 }
//             }
//         }
//         nochZuLesen.splice(0, 1)
//         return listeDerMoeglichenKonfigurationen
//     }

//     function rekursiveAufruf(listeDerMoeglichenKonfigurationen, parent) {
//         steps--
//         if (steps <= 0) return
//         for (const jede of listeDerMoeglichenKonfigurationen) {
//             const { moeglichkeit, wort, stack, KellerBlockieren } = jede
//             const naechsteZustand = moeglichkeit[0]
//             if (wort.length && !stack.length) {
//                 console.log(true)
//             }
//             const childObject = {
//                 zustand: `${naechsteZustand},`,
//                 wort: `${wort.join()},`,
//                 stack: `Stack:${stack.join('')}`,
//                 akzeptiert: (!wort.length && !stack.length ? true : false),
//                 KellerBlockieren: (wort.length && !stack.length ? true : false),
//                 children: []
//             }
//             parent.push(childObject)
//             const newParent = childObject.children
//             const nachFolgeKonfigurationen = nachFolgeKonfiguration(wort, naechsteZustand, stack)
//             rekursiveAufruf(nachFolgeKonfigurationen, newParent)
//         }
//     }
//     resultsTree.zustand = startZustand
//     resultsTree.wort = zeichenkette
//     resultsTree.stack = keller
//     resultsTree.akzeptiert = false
//     resultsTree.KellerBlockieren = false
//     resultsTree.children = []
//     const iterateMe = nachFolgeKonfiguration(zeichenkette, startZustand, keller)
//     rekursiveAufruf(iterateMe, resultsTree.children)
//     const endTime = (performance.now() - startTime) / 1000
//     console.log(endTime, "zweite")
//     return resultsTree


// }


// NPDA(file, wort["D"], 3073)