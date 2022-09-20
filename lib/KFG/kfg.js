export default function KFG(file, wort, lastStepTree, steps) {
    const resultsTree = {}
    let { produktionen, startSymbol, terminaleSymbole } = file

    // function isVariable(input, variablen) {
    //     return variablen.find(el => {
    //         if (Array.isArray(el)) return el.join() === input
    //         return el === input
    //     }) ? true : false
    // }
    function nurTerminal(input, terminaleSymbole) {
        let results = []
        let endresult = true
        for (const jede of input) {
            const gefunden = terminaleSymbole.find(el => el === jede)
            gefunden ? results.push(true) : results.push(false)
        }
        for (const el of results) {
            endresult = el && endresult
        }
        return endresult
    }

    function Wortchecker(satzform, terminaleSymbole) {
        if (nurTerminal(satzform, terminaleSymbole) && satzform.length < wort.length) return true
        if (satzform == "" && satzform !== wort) return true
        return false
    }

    function Wortproblem(satzform, terminaleSymbole) {
        if (nurTerminal(satzform, terminaleSymbole) && satzform.length > wort.length) return true
        return false
    }


    function getCandidates(input) {
        const candidates = produktionen.find(el => Object.keys(el)[0] === input)
        if (!candidates) return []
        return candidates[input]
    }

    function generateTree(startSymbol) {
        let currentId = 1

        resultsTree.name = startSymbol
        resultsTree.children = []
        resultsTree.akzeptiert = false
        resultsTree.nurTerminal = false
        resultsTree.id = currentId

        let nodeMap = {};
        nodeMap[currentId] = resultsTree;

        const queue = [{ name: startSymbol, id: currentId }]
        while (queue.length && steps) {
            steps--
            const element = queue.shift()
            const currentParent = nodeMap[element.id]

            for (let i = 0; i < element.name.length; i++) {
                const elementNamePart = element.name[i]
                const candidates = getCandidates(elementNamePart)
                for (const candidate of candidates) {
                    let nameCopy = [...element.name]
                    nameCopy[i] = candidate
                    nameCopy = nameCopy.flat(1)
                    currentId++
                    queue.push({ name: nameCopy, id: currentId })
                    currentParent.children.push({
                        name: nameCopy,
                        children: [],
                        akzeptiert: nameCopy.join('') === wort.join(''),
                        nurTerminal: Wortchecker(nameCopy, terminaleSymbole),
                        wortProblem: Wortproblem(nameCopy, terminaleSymbole),
                        id: currentId
                    });
                    nodeMap[currentId] = currentParent.children[currentParent.children.length - 1];
                }
            }
        }
        return resultsTree
    }

    generateTree(startSymbol)
    return resultsTree
}