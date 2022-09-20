
// const fs = require("fs");
// const file = JSON.parse(fs.readFileSync("./beispiele/CFGLars1.json"));

export default function WortProblem(file, wort) {
    const resultsTree = {}
    let { produktionen, startSymbol, terminaleSymbole } = file

    function nurTerminal(input, terminaleSymbole) {
        let results = []
        let endresult = true
        for (const jede of input) {
            const gefunden = terminaleSymbole.find(el => el === jede)
            gefunden ? results.push(true) : results.push(false)
        }
        for (el of results) {
            endresult = el && endresult
        }
        return endresult
    }

    function getCandidates(input) {
        const candidates = produktionen.find(el => Object.keys(el)[0] === input)
        if (!candidates) return []
        return candidates[input]
    }

    function getNodeById(treeObj, id) {
        if (treeObj.id == id) {
            return treeObj
        }
        else {
            for (const newObj of treeObj.children) {
                if (getNodeById(newObj, id)) return getNodeById(newObj, id)
            }
        }

    }

    function generateTree(startSymbol) {
        let currentId = 1
        resultsTree.name = startSymbol
        resultsTree.children = []
        resultsTree.akzeptiert = false
        resultsTree.id = currentId
        const queue = [{ name: startSymbol, id: currentId }]
        while (queue.length) {
            const element = queue.shift()
            const currentParent = getNodeById(resultsTree, element.id)
            console.log(currentParent.name)
            if (nurTerminal(currentParent.name, terminaleSymbole)) {
                if (currentParent.name.join("") === wort.join("")) {
                    console.log(true)
                    return true
                } if (currentParent.name.length > wort.length) {
                    console.log(false)
                    return false
                }
            }

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
                        id: currentId
                    })
                }
            }
        } console.log(false)
        return false
    }

    generateTree(startSymbol)
}


// WortProblem(file, ["a", "c", "b"])